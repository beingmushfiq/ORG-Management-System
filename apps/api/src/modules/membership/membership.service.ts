import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { prisma, MemberStatus, MembershipTier } from "@org/database";
import { CreateMemberApplicationDto } from "./dto/create-member-application.dto";
import { MemberQueryDto } from "./dto/member-query.dto";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";

@Injectable()
export class MembershipService {
  /**
   * Paginated, searchable, branch-scoped member query with 3-tier privacy masking.
   */
  async listMembers(
    organizationId: string,
    query: MemberQueryDto,
    scope?: { isRootScope: boolean; allowedPaths: string[] },
    viewerRole: "PUBLIC" | "MEMBER" | "EXECUTIVE" = "MEMBER"
  ) {
    const page = Math.max(1, parseInt(query.page || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || "20", 10)));
    const skip = (page - 1) * limit;

    const where: any = {
      organizationId,
    };

    if (query.status) {
      where.status = query.status as MemberStatus;
    }

    if (query.tier) {
      where.tier = query.tier as MembershipTier;
    }

    if (query.search) {
      where.OR = [
        { membershipNumber: { contains: query.search } },
        { user: { fullName: { contains: query.search } } },
        { user: { phone: { contains: query.search } } },
        { user: { email: { contains: query.search } } },
      ];
    }

    // Branch scoping
    if (scope && !scope.isRootScope && scope.allowedPaths.length > 0) {
      where.user = {
        ...where.user,
        userPositions: {
          some: {
            branchNode: {
              OR: scope.allowedPaths.map((p) => ({
                materializedPath: { startsWith: p },
              })),
            },
          },
        },
      };
    }

    const [total, items] = await Promise.all([
      prisma.membership.count({ where }),
      prisma.membership.findMany({
        where,
        skip,
        take: limit,
        orderBy: { joinedDate: "desc" },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              fullNameBn: true,
              phone: true,
              email: true,
              bloodGroup: true,
              occupation: true,
              phonePrivacy: true,
              emailPrivacy: true,
              addressPrivacy: true,
              userPositions: {
                where: { isActive: true },
                include: {
                  position: true,
                  branchNode: true,
                },
              },
            },
          },
        },
      }),
    ]);

    // Apply 3-Tier Privacy Masking
    const maskedItems = items.map((m) => {
      const user = m.user;
      let displayPhone = user.phone;
      let displayEmail = user.email;

      if (viewerRole === "PUBLIC") {
        displayPhone = user.phone ? `${user.phone.slice(0, 6)}*****` : "";
        displayEmail = user.email ? `${user.email.slice(0, 3)}***@***` : "";
      } else if (viewerRole === "MEMBER") {
        if (user.phonePrivacy === "EXECUTIVE_ONLY") {
          displayPhone = `${user.phone.slice(0, 6)}*****`;
        }
        if (user.emailPrivacy === "EXECUTIVE_ONLY") {
          displayEmail = `${user.email.slice(0, 3)}***@***`;
        }
      }

      return {
        id: m.id,
        userId: user.id,
        membershipNumber: m.membershipNumber,
        tier: m.tier,
        status: m.status,
        joinedDate: m.joinedDate,
        eligibilityScore: m.eligibilityScore,
        fullName: user.fullName,
        fullNameBn: user.fullNameBn,
        phone: displayPhone,
        email: displayEmail,
        bloodGroup: user.bloodGroup,
        occupation: user.occupation,
        positions: user.userPositions.map((p) => ({
          title: p.position.title,
          titleBn: p.position.titleBn,
          branchName: p.branchNode.name,
        })),
      };
    });

    return {
      data: maskedItems,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Retrieves single member details with full history and positions.
   */
  async getMemberById(organizationId: string, membershipId: string) {
    const member = await prisma.membership.findFirst({
      where: { id: membershipId, organizationId },
      include: {
        user: {
          include: {
            userPositions: {
              where: { isActive: true },
              include: { position: true, branchNode: true },
            },
          },
        },
        history: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!member) {
      throw new NotFoundException("Member record not found.");
    }

    return member;
  }

  /**
   * Public or Assisted Member Application Onboarding.
   */
  async applyMembership(dto: CreateMemberApplicationDto) {
    const slug = dto.organizationSlug || "rsm-bd";
    const org = await prisma.organization.findUnique({
      where: { slug },
    });

    if (!org) {
      throw new BadRequestException("Organization not found.");
    }

    // Check if phone or email already registered in this organization
    const existing = await prisma.user.findFirst({
      where: {
        organizationId: org.id,
        OR: [{ email: dto.email.toLowerCase().trim() }, { phone: dto.phone }],
      },
    });

    if (existing) {
      throw new BadRequestException("A member with this email or mobile number already exists.");
    }

    const tempPassword = crypto.randomBytes(16).toString("hex");
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        organizationId: org.id,
        fullName: dto.fullName,
        fullNameBn: dto.fullNameBn ?? null,
        email: dto.email.toLowerCase().trim(),
        phone: dto.phone,
        passwordHash,
        occupation: dto.occupation ?? null,
        bloodGroup: dto.bloodGroup ?? null,
        nidNumber: dto.nidNumber ?? null,
      },
    });

    const tempAppNumber = `APP-${Date.now().toString().slice(-6)}`;

    const membership = await prisma.membership.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        tier: MembershipTier.ASSOCIATE,
        status: MemberStatus.PENDING_KYC,
        membershipNumber: tempAppNumber,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: org.id,
        actorId: user.id,
        action: "MEMBERSHIP:APPLICATION_SUBMITTED",
        targetEntity: "Membership",
        targetId: membership.id,
        diffJson: { applicationNumber: tempAppNumber, fullName: dto.fullName },
      },
    });

    return {
      success: true,
      applicationId: membership.id,
      applicationNumber: tempAppNumber,
      message: "Application submitted successfully for KYC review.",
    };
  }

  /**
   * Branch Officer Endorsement
   */
  async endorseBranch(organizationId: string, membershipId: string, actorId: string, notes?: string) {
    const membership = await prisma.membership.findFirst({
      where: { id: membershipId, organizationId },
    });

    if (!membership) {
      throw new NotFoundException("Membership record not found.");
    }

    const updated = await prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MemberStatus.BRANCH_ENDORSED,
      },
    });

    await prisma.membershipHistory.create({
      data: {
        organizationId,
        membershipId,
        previousTier: membership.tier,
        newTier: membership.tier,
        previousStatus: membership.status,
        newStatus: MemberStatus.BRANCH_ENDORSED,
        reason: notes || "Endorsed by Branch Secretariat committee",
        actorId,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId,
        actorId,
        action: "MEMBERSHIP:BRANCH_ENDORSED",
        targetEntity: "Membership",
        targetId: membershipId,
      },
    });

    return updated;
  }

  /**
   * Executive Council Approval & Membership Number Issuance
   */
  async approveMembership(
    organizationId: string,
    membershipId: string,
    actorId: string,
    tier: MembershipTier = MembershipTier.GENERAL
  ) {
    const membership = await prisma.membership.findFirst({
      where: { id: membershipId, organizationId },
    });

    if (!membership) {
      throw new NotFoundException("Membership record not found.");
    }

    const year = new Date().getFullYear();
    const count = await prisma.membership.count({
      where: { organizationId, status: MemberStatus.ACTIVE },
    });
    const seq = (count + 1).toString().padStart(4, "0");
    const officialNumber = `BMA-${year}-${seq}`;

    const updated = await prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MemberStatus.ACTIVE,
        tier,
        membershipNumber: officialNumber,
      },
    });

    await prisma.membershipHistory.create({
      data: {
        organizationId,
        membershipId,
        previousTier: membership.tier,
        newTier: tier,
        previousStatus: membership.status,
        newStatus: MemberStatus.ACTIVE,
        reason: "Approved by Central Executive Council",
        actorId,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId,
        actorId,
        action: "MEMBERSHIP:APPROVED",
        targetEntity: "Membership",
        targetId: membershipId,
        diffJson: { officialNumber, tier },
      },
    });

    return updated;
  }

  /**
   * Suspends a membership with formal record
   */
  async suspendMembership(organizationId: string, membershipId: string, actorId: string, reason: string) {
    const membership = await prisma.membership.findFirst({
      where: { id: membershipId, organizationId },
    });

    if (!membership) {
      throw new NotFoundException("Membership record not found.");
    }

    const updated = await prisma.membership.update({
      where: { id: membershipId },
      data: {
        status: MemberStatus.SUSPENDED,
        suspensionReason: reason,
      },
    });

    await prisma.membershipHistory.create({
      data: {
        organizationId,
        membershipId,
        previousTier: membership.tier,
        newTier: membership.tier,
        previousStatus: membership.status,
        newStatus: MemberStatus.SUSPENDED,
        reason,
        actorId,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId,
        actorId,
        action: "MEMBERSHIP:SUSPENDED",
        targetEntity: "Membership",
        targetId: membershipId,
        diffJson: { reason },
      },
    });

    return updated;
  }
}

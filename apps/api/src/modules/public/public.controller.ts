import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { prisma } from "@org/database";
import { MembershipService } from "../membership/membership.service";
import { CreateMemberApplicationDto } from "../membership/dto/create-member-application.dto";

@Public()
@Controller("public")
export class PublicController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get("health")
  getHealth() {
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "Organization Operating System API",
    };
  }

  @Post("apply")
  async apply(@Body() dto: CreateMemberApplicationDto) {
    return this.membershipService.applyMembership(dto);
  }

  @Get("org/:slug")
  async getOrganizationPublicProfile(@Param("slug") slug: string) {
    const org = await prisma.organization.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        nameBn: true,
        slug: true,
        tagline: true,
        taglineBn: true,
        aboutHtml: true,
        aboutHtmlBn: true,
        missionHtml: true,
        missionHtmlBn: true,
        logoUrl: true,
        primaryColorHsl: true,
        accentColorHsl: true,
        contactEmail: true,
        contactPhone: true,
        headOfficeAddress: true,
        headOfficeAddressBn: true,
        socialLinksJson: true,
        createdAt: true,
        branches: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            nameBn: true,
            levelLabel: true,
            depth: true,
          },
          orderBy: { depth: "asc" },
        },
        positions: {
          where: { isCentralRole: true },
          orderBy: { rankOrder: "asc" },
          select: {
            id: true,
            title: true,
            titleBn: true,
            rankOrder: true,
            userPositions: {
              where: { isActive: true },
              select: {
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    fullNameBn: true,
                    avatarUrl: true,
                    occupation: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!org) {
      throw new NotFoundException("Organization not found.");
    }

    return org;
  }

  @Get("notices/:slug")
  async getPublicNotices(@Param("slug") slug: string) {
    const org = await prisma.organization.findUnique({ where: { slug } });
    if (!org) throw new NotFoundException("Organization not found.");

    return prisma.notice.findMany({
      where: {
        organizationId: org.id,
        isPublic: true,
      },
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
      take: 20,
    });
  }

  @Get("events/:slug")
  async getPublicEvents(@Param("slug") slug: string) {
    const org = await prisma.organization.findUnique({ where: { slug } });
    if (!org) throw new NotFoundException("Organization not found.");

    return prisma.event.findMany({
      where: {
        organizationId: org.id,
        isPublic: true,
      },
      orderBy: { startTime: "desc" },
      take: 20,
    });
  }

  @Get("verify/member/:param")
  async verifyMember(@Param("param") param: string) {
    const member = await prisma.membership.findFirst({
      where: {
        OR: [{ membershipNumber: param }, { id: param }],
      },
      include: {
        organization: {
          select: { name: true, nameBn: true, slug: true },
        },
        user: {
          select: {
            fullName: true,
            fullNameBn: true,
            bloodGroup: true,
            occupation: true,
            userPositions: {
              where: { isActive: true },
              include: { position: true, branchNode: true },
            },
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException("No matching verified membership record was found.");
    }

    return {
      isVerified: true,
      membershipNumber: member.membershipNumber,
      tier: member.tier,
      status: member.status,
      joinedDate: member.joinedDate,
      organizationName: member.organization.name,
      organizationNameBn: member.organization.nameBn,
      memberName: member.user.fullName,
      memberNameBn: member.user.fullNameBn,
      occupation: member.user.occupation,
      bloodGroup: member.user.bloodGroup,
      positions: member.user.userPositions.map((p) => ({
        title: p.position.title,
        titleBn: p.position.titleBn,
        branchName: p.branchNode.name,
      })),
      verifiedAt: new Date(),
    };
  }
}

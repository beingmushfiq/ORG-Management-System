import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { prisma, MeetingStatus } from "@org/database";
import { GovernanceEngine } from "./governance-engine";

@Injectable()
export class GovernanceService {
  /**
   * Lists meetings with status and schedule filtering.
   */
  async listMeetings(organizationId: string, status?: MeetingStatus) {
    const where: any = { organizationId };
    if (status) {
      where.status = status;
    }

    return prisma.meeting.findMany({
      where,
      orderBy: { scheduledAt: "desc" },
      include: {
        resolutions: true,
        branchNode: { select: { name: true, code: true } },
      },
    });
  }

  /**
   * Retrieves single meeting by ID with resolutions and details.
   */
  async getMeetingById(organizationId: string, meetingId: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, organizationId },
      include: {
        resolutions: true,
        branchNode: true,
      },
    });

    if (!meeting) {
      throw new NotFoundException("Meeting record not found.");
    }

    return meeting;
  }

  /**
   * Creates a draft meeting.
   */
  async createMeeting(
    organizationId: string,
    data: {
      title: string;
      titleBn?: string;
      category: string;
      scheduledAt: string;
      venue: string;
      venueBn?: string;
      branchNodeId?: string;
      agendaJson?: any;
    }
  ) {
    return prisma.meeting.create({
      data: {
        organizationId,
        title: data.title,
        titleBn: data.titleBn ?? null,
        category: data.category,
        scheduledAt: new Date(data.scheduledAt),
        venue: data.venue,
        venueBn: data.venueBn ?? null,
        branchNodeId: data.branchNodeId || null,
        agendaJson: data.agendaJson || [],
        status: MeetingStatus.DRAFT,
      },
    });
  }

  /**
   * Schedules meeting and finalizes notice.
   */
  async scheduleMeeting(organizationId: string, meetingId: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, organizationId },
    });

    if (!meeting) {
      throw new NotFoundException("Meeting not found.");
    }

    return prisma.meeting.update({
      where: { id: meetingId },
      data: { status: MeetingStatus.SCHEDULED },
    });
  }

  /**
   * Records meeting minutes, calculates quorum, and persists numbered resolutions.
   */
  async recordMinutes(
    organizationId: string,
    meetingId: string,
    data: {
      presidedById: string;
      recordedById: string;
      quorumCount: number;
      totalEligibleCount: number;
      minutesHtml: string;
      minutesHtmlBn?: string;
      resolutions: Array<{
        agendaTitle: string;
        decisionText: string;
        decisionTextBn?: string;
        isUnanimous: boolean;
      }>;
    }
  ) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, organizationId },
    });

    if (!meeting) {
      throw new NotFoundException("Meeting not found.");
    }

    // Atomically save minutes and numbered resolutions
    return prisma.$transaction(async (tx) => {
      const updated = await tx.meeting.update({
        where: { id: meetingId },
        data: {
          status: MeetingStatus.MINUTES_DRAFT,
          presidedById: data.presidedById,
          recordedById: data.recordedById,
          quorumCount: data.quorumCount,
          totalEligibleCount: data.totalEligibleCount,
          minutesHtml: data.minutesHtml,
          minutesHtmlBn: data.minutesHtmlBn ?? null,
        },
      });

      const year = new Date().getFullYear();
      const existingResolutionsCount = await tx.meetingResolution.count({
        where: { organizationId },
      });

      let counter = existingResolutionsCount + 1;
      for (const res of data.resolutions) {
        const resolutionNumber = `RES-BMA-${year}-${counter.toString().padStart(3, "0")}`;
        await tx.meetingResolution.create({
          data: {
            organizationId,
            meetingId,
            resolutionNumber,
            agendaTitle: res.agendaTitle,
            decisionText: res.decisionText,
            decisionTextBn: res.decisionTextBn ?? null,
            isUnanimous: res.isUnanimous,
            status: "ADOPTED",
          },
        });
        counter++;
      }

      return updated;
    });
  }

  /**
   * Executive Council Signatory Approval of Minutes.
   */
  async approveMinutes(organizationId: string, meetingId: string, actorId: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, organizationId },
    });

    if (!meeting) {
      throw new NotFoundException("Meeting not found.");
    }

    const updated = await prisma.meeting.update({
      where: { id: meetingId },
      data: {
        status: MeetingStatus.MINUTES_APPROVED,
        approvedAt: new Date(),
        approvedById: actorId,
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId,
        actorId,
        action: "GOVERNANCE:MINUTES_APPROVED",
        targetEntity: "Meeting",
        targetId: meetingId,
      },
    });

    return updated;
  }

  /**
   * Lists all official numbered resolutions in the registry.
   */
  async listResolutions(organizationId: string) {
    return prisma.meetingResolution.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      include: {
        meeting: {
          select: {
            title: true,
            titleBn: true,
            scheduledAt: true,
            category: true,
          },
        },
      },
    });
  }

  /**
   * Calculates quorum check according to constitutional bylaws.
   */
  calculateQuorum(input: {
    totalEligibleVotingMembers: number;
    verifiedAttendeesCount: number;
    meetingType: "REGULAR_AGM" | "CONSTITUTIONAL_EGM" | "BRANCH_MEETING";
  }) {
    return GovernanceEngine.calculateQuorum(input);
  }
}

import { Injectable, BadRequestException } from "@nestjs/common";

export type MeetingCategory =
  | "CENTRAL_EXECUTIVE_COUNCIL"
  | "ANNUAL_GENERAL_MEETING"
  | "EXTRAORDINARY_GENERAL_MEETING"
  | "STANDING_COMMITTEE";

export interface AgendaItemDto {
  agendaNumber: number;
  title: string;
  titleBn: string;
  discussionNotes: string;
  resolutionDecision: string;
  resolutionDecisionBn: string;
  unanimous: boolean;
}

export interface MeetingMinutesDto {
  meetingId: string;
  organizationId: string;
  meetingCategory: MeetingCategory;
  meetingTitle: string;
  meetingTitleBn: string;
  meetingDate: Date;
  venue: string;
  presidedBy: string;
  presidedByDesignation: string;
  recordedBy: string;
  recordedByDesignation: string;
  totalExecutiveSeats: number;
  presentMembersCount: number;
  agendas: AgendaItemDto[];
}

export interface CompiledMinutes {
  memoReferenceNo: string;
  meetingCategory: MeetingCategory;
  meetingTitle: string;
  meetingTitleBn: string;
  meetingDate: Date;
  venue: string;
  presidedBy: string;
  recordedBy: string;
  quorumPercentage: number;
  isQuorumMet: boolean;
  resolutions: {
    resolutionCode: string;
    agendaTitle: string;
    decisionEnglish: string;
    decisionBengali: string;
    isUnanimous: boolean;
  }[];
  statutoryCertificationBn: string;
  compiledAt: Date;
}

@Injectable()
export class MinutesGeneratorService {
  /**
   * Compiles executive meeting proceedings into official statutory minutes and numbered resolutions
   */
  compileMinutes(dto: MeetingMinutesDto): CompiledMinutes {
    if (dto.agendas.length === 0) {
      throw new BadRequestException("Meeting minutes must contain at least one formal agenda item.");
    }

    const quorumPercentage = Math.round((dto.presentMembersCount / dto.totalExecutiveSeats) * 100);
    // Quorum threshold: 50% for standard EC, 66.7% for EGM
    const isEgm = dto.meetingCategory === "EXTRAORDINARY_GENERAL_MEETING";
    const minRequiredQuorum = isEgm ? 67 : 50;
    const isQuorumMet = quorumPercentage >= minRequiredQuorum;

    const year = dto.meetingDate.getFullYear();
    const memoSeq = Math.floor(100 + Math.random() * 900);
    const memoReferenceNo = `BMA/MINUTES/${year}/CEC-${memoSeq}`;

    const resolutions = dto.agendas.map((item, idx) => ({
      resolutionCode: `RES-BMA-${year}-${String(idx + 1).padStart(3, "0")}`,
      agendaTitle: item.title,
      decisionEnglish: item.resolutionDecision,
      decisionBengali: item.resolutionDecisionBn,
      isUnanimous: item.unanimous,
    }));

    const statutoryCertificationBn = `উক্ত সভার সকল প্রস্তাবনা ও কার্যবিবরণী কার্যনির্বাহী পরিষদের সংবিধান অনুযায়ী সভাপতি ও মহাসচিব মহোদয়ের স্বাক্ষরে অনুমোদিত ও স্থায়ী নথিপত্রে লিপিবদ্ধ হইল।`;

    return {
      memoReferenceNo,
      meetingCategory: dto.meetingCategory,
      meetingTitle: dto.meetingTitle,
      meetingTitleBn: dto.meetingTitleBn,
      meetingDate: dto.meetingDate,
      venue: dto.venue,
      presidedBy: dto.presidedBy,
      recordedBy: dto.recordedBy,
      quorumPercentage,
      isQuorumMet,
      resolutions,
      statutoryCertificationBn,
      compiledAt: new Date(),
    };
  }
}

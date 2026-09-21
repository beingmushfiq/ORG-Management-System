import { describe, it, expect, beforeEach } from 'vitest';
import { MinutesGeneratorService, MeetingMinutesDto } from '../src/modules/governance/minutes-generator.service';

describe('MinutesGeneratorService - Statutory Meeting Minutes & Resolutions', () => {
  let minutesService: MinutesGeneratorService;

  beforeEach(() => {
    minutesService = new MinutesGeneratorService();
  });

  const sampleMeeting: MeetingMinutesDto = {
    meetingId: 'mtg-cec-04',
    organizationId: 'org-bma',
    meetingCategory: 'CENTRAL_EXECUTIVE_COUNCIL',
    meetingTitle: '4th Bi-Monthly Executive Council Meeting 2026',
    meetingTitleBn: '৪র্থ দ্বি-মাসিক কার্যনির্বাহী পরিষদ সভা ২০২৬',
    meetingDate: new Date('2026-09-15T10:00:00Z'),
    venue: 'Executive Boardroom, BMA Bhaban, Dhaka',
    presidedBy: 'Prof. Dr. Mahmudul Hasan (President)',
    presidedByDesignation: 'President',
    recordedBy: 'Dr. Kazi Mostafa (Honorary General Secretary)',
    recordedByDesignation: 'Honorary General Secretary',
    totalExecutiveSeats: 25,
    presentMembersCount: 19, // 76% attendance
    agendas: [
      {
        agendaNumber: 1,
        title: 'Confirmation of Minutes of the 3rd Executive Council Meeting',
        titleBn: '৩য় কার্যনির্বাহী পরিষদ সভার কার্যবিবরণী অনুমোদন',
        discussionNotes: 'The General Secretary read out the minutes of the 3rd meeting. No objections raised.',
        resolutionDecision: 'Resolved unanimously that the minutes of the 3rd meeting be signed and ratified.',
        resolutionDecisionBn: 'সর্বসম্মতভাবে ৩য় সভার কার্যবিবরণী সভাপতি ও মহাসচিব কর্তৃক স্বাক্ষরিত হইয়া চূড়ান্ত অনুমোদিত হইল।',
        unanimous: true,
      },
      {
        agendaNumber: 2,
        title: 'Ratification of Flood Relief Field Dispensary Budget (Feni & Noakhali)',
        titleBn: 'বন্যা দুর্গত এলাকার ভ্রাম্যমাণ ক্লিনিক ও ওষুধ সহায়তার বিশেষ বাজেট অনুমোদন',
        discussionNotes: 'Treasurer presented estimated requirement of BDT 15 Lakhs for urgent medical supplies.',
        resolutionDecision: 'Approved special appropriation of BDT 15,00,000 from the Benevolent Disaster Relief Trust.',
        resolutionDecisionBn: 'কল্যাণ ও দুর্যোগ তহবিল হইতে ১৫,০০,০০০ টাকার জরুরি ত্রাণ বরাদ্দ সর্বসম্মতভাবে পাস হইল।',
        unanimous: true,
      },
    ],
  };

  it('should compile official minutes with quorum verification and numbered resolutions', () => {
    const compiled = minutesService.compileMinutes(sampleMeeting);

    expect(compiled.memoReferenceNo).toContain('BMA/MINUTES/2026/');
    expect(compiled.quorumPercentage).toBe(76);
    expect(compiled.isQuorumMet).toBe(true);
    expect(compiled.resolutions.length).toBe(2);
    expect(compiled.resolutions[0]?.resolutionCode).toBe('RES-BMA-2026-001');
    expect(compiled.resolutions[1]?.resolutionCode).toBe('RES-BMA-2026-002');
    expect(compiled.statutoryCertificationBn).toContain('স্বাক্ষরে অনুমোদিত');
  });

  it('should flag quorum unmet when attendance is below constitutional threshold', () => {
    const lowAttendanceMeeting: MeetingMinutesDto = {
      ...sampleMeeting,
      presentMembersCount: 8, // 8 / 25 = 32% (below 50%)
    };

    const compiled = minutesService.compileMinutes(lowAttendanceMeeting);
    expect(compiled.quorumPercentage).toBe(32);
    expect(compiled.isQuorumMet).toBe(false);
  });

  it('should reject compiling minutes without any agenda items', () => {
    expect(() =>
      minutesService.compileMinutes({
        ...sampleMeeting,
        agendas: [],
      })
    ).toThrow('at least one formal agenda item');
  });
});

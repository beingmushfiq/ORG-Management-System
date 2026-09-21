import { describe, it, expect, beforeEach } from 'vitest';
import { ConciergeService } from '../src/modules/concierge/concierge.service';

describe('ConciergeService - Fast-Track Member Services', () => {
  let conciergeService: ConciergeService;

  beforeEach(() => {
    conciergeService = new ConciergeService();
  });

  it('should issue a verified Certificate of Good Standing for active member with cleared dues', () => {
    const cert = conciergeService.issueGoodStandingCertificate({
      memberId: 'mem-101',
      memberName: 'Dr. Shah Alam',
      membershipNo: 'BMA-DHK-1004',
      organizationId: 'org-bma',
      bmdcRegNo: 'A-39481',
      branchName: 'Kotwali Central Hospital Unit',
      standing: 'ACTIVE',
      duesCleared: true,
      purpose: 'FOREIGN_FELLOWSHIP',
    });

    expect(cert.certificateNo).toContain('CERT-GS-');
    expect(cert.memoNo).toContain('BMA/CENTRAL/');
    expect(cert.verificationToken).toContain('CGS-');
    expect(cert.isAuthentic).toBe(true);
    expect(cert.validUntil.getFullYear()).toBe(cert.issuedAt.getFullYear() + 1);
  });

  it('should reject Good Standing certificate request if member is suspended', () => {
    expect(() =>
      conciergeService.issueGoodStandingCertificate({
        memberId: 'mem-102',
        memberName: 'Dr. Rafiqul Islam',
        membershipNo: 'BMA-RAJ-004',
        organizationId: 'org-bma',
        bmdcRegNo: 'A-12093',
        branchName: 'Rajshahi Medical Zone',
        standing: 'SUSPENDED',
        duesCleared: true,
        purpose: 'EMPLOYMENT_VERIFICATION',
      })
    ).toThrow('suspended or inactive');
  });

  it('should reject Good Standing certificate request if member has outstanding dues', () => {
    expect(() =>
      conciergeService.issueGoodStandingCertificate({
        memberId: 'mem-103',
        memberName: 'Dr. Farhana Begum',
        membershipNo: 'BMA-CTG-2010',
        organizationId: 'org-bma',
        bmdcRegNo: 'A-49210',
        branchName: 'Panchlaish Unit',
        standing: 'ACTIVE',
        duesCleared: false,
        purpose: 'REGULATORY_BMDC',
      })
    ).toThrow('subscriptions to be fully cleared');
  });

  it('should compute total NBR Section 44 tax exemption summary in integer paisa', () => {
    const subscriptionsPaisa = 500000n; // 5,000 BDT
    const donationsPaisa = 2500000n; // 25,000 BDT

    const summary = conciergeService.generateTaxExemptionSummary(
      'mem-101',
      'BMA-DHK-1004',
      'FY 2026-2027',
      subscriptionsPaisa,
      donationsPaisa
    );

    expect(summary.totalExemptPaisa).toBe(3000000n);
    expect(summary.totalExemptBDT).toBe('30000.00');
    expect(summary.taxSectionReference).toContain('Income Tax Act 2023');
  });

  it('should register and retrieve chamber practice visiting hours', () => {
    conciergeService.updateChamberDirectory({
      id: 'ch-1',
      memberId: 'mem-101',
      institutionOrHospitalName: 'Chattogram Metropolitan Hospital',
      district: 'Chattogram',
      roomOrChamberNo: 'Room 402, 4th Floor',
      visitingHours: '5:00 PM - 9:00 PM (Sat - Thu)',
      appointmentPhone: '01819-112233',
      isPubliclyVisible: true,
    });

    const chambers = conciergeService.getChambers('mem-101');
    expect(chambers.length).toBe(1);
    expect(chambers[0]?.institutionOrHospitalName).toBe('Chattogram Metropolitan Hospital');
  });
});

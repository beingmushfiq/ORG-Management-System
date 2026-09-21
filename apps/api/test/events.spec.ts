import { describe, it, expect, beforeEach } from 'vitest';
import { EventsService } from '../src/modules/events/events.service';

describe('EventsService - Conference Gate Check-in & Coupons', () => {
  let eventsService: EventsService;

  beforeEach(() => {
    eventsService = new EventsService();
  });

  it('should generate digital conference pass and unique QR token', () => {
    const pass = eventsService.registerDelegate({
      eventId: 'evt-agm-2026',
      memberId: 'mem-001',
      memberName: 'Dr. Shah Alam',
      membershipNo: 'BMA-DHK-1004',
      organizationId: 'org-bma',
      designation: 'Senior Consultant, Cardiology',
      hasDues: false,
    });

    expect(pass.ticketNumber).toContain('CONF-');
    expect(pass.qrSecurityToken).toBeDefined();
    expect(pass.qrSecurityToken.length).toBeGreaterThan(20);
    expect(pass.checkedIn).toBe(false);
    expect(pass.lunchClaimed).toBe(false);
    expect(pass.kitClaimed).toBe(false);
  });

  it('should successfully check in an attendee at the gate on first scan', () => {
    const pass = eventsService.registerDelegate({
      eventId: 'evt-agm-2026',
      memberId: 'mem-002',
      memberName: 'Advocate Farhana Begum',
      membershipNo: 'SBA-CTG-402',
      organizationId: 'org-sba',
      designation: 'Advocate, Supreme Court',
      hasDues: false,
    });

    const result = eventsService.processGateScan(pass.qrSecurityToken, 'Steward-Gate-North');

    expect(result.status).toBe('SUCCESS');
    expect(result.attendee?.ticketNumber).toBe(pass.ticketNumber);
    expect(result.attendee?.checkedIn).toBe(true);
    expect(result.couponsIssued.lunch).toBe(true);
    expect(result.couponsIssued.kit).toBe(true);
  });

  it('should flag duplicate scan when delegate scans ticket a second time', () => {
    const pass = eventsService.registerDelegate({
      eventId: 'evt-agm-2026',
      memberId: 'mem-003',
      memberName: 'Engr. Mahbubur Rahman',
      membershipNo: 'IEB-DHK-9921',
      organizationId: 'org-ieb',
      designation: 'Fellow Member',
      hasDues: false,
    });

    // First scan
    const firstScan = eventsService.processGateScan(pass.qrSecurityToken, 'Steward-Gate-North');
    expect(firstScan.status).toBe('SUCCESS');

    // Second scan (attempted reentry or duplicate pass sharing)
    const secondScan = eventsService.processGateScan(pass.qrSecurityToken, 'Steward-Gate-South');
    expect(secondScan.status).toBe('ALREADY_CHECKED_IN');
    expect(secondScan.message).toContain('already admitted');
  });

  it('should warn steward when delegate has outstanding membership dues', () => {
    const pass = eventsService.registerDelegate({
      eventId: 'evt-agm-2026',
      memberId: 'mem-004',
      memberName: 'Dr. Rafiqul Islam',
      membershipNo: 'BMA-RAJ-004',
      organizationId: 'org-bma',
      designation: 'General Member',
      hasDues: true,
      duesAmountPaisa: 250000n, // 2,500 BDT
    });

    const result = eventsService.processGateScan(pass.qrSecurityToken, 'Steward-Gate-Main');
    expect(result.status).toBe('DUES_WARNING');
    expect(result.warningDetails?.hasOutstandingDues).toBe(true);
    expect(result.warningDetails?.duesAmountBDT).toBe('2500.00');
    // Attendee still receives admittance check-in record so steward can direct them to counter
    expect(result.attendee?.checkedIn).toBe(true);
  });

  it('should reject invalid or forged QR security tokens', () => {
    const result = eventsService.processGateScan('FORGED-QR-TOKEN-XYZ-999', 'Steward-Gate-Main');
    expect(result.status).toBe('INVALID_TOKEN');
    expect(result.attendee).toBeUndefined();
  });

  it('should claim conference meal coupon and prevent double-claim', () => {
    const pass = eventsService.registerDelegate({
      eventId: 'evt-agm-2026',
      memberId: 'mem-005',
      memberName: 'Prof. Zahid Hasan',
      membershipNo: 'BCS-DHK-3301',
      organizationId: 'org-bcs',
      designation: 'Council Member',
      hasDues: false,
    });

    // Check in first
    eventsService.processGateScan(pass.qrSecurityToken, 'Gate-1');

    // Claim lunch first time
    const claim1 = eventsService.claimMealCoupon(pass.qrSecurityToken);
    expect(claim1.claimed).toBe(true);
    expect(claim1.couponType).toBe('LUNCH_BUFFET');

    // Attempt second claim
    const claim2 = eventsService.claimMealCoupon(pass.qrSecurityToken);
    expect(claim2.claimed).toBe(false);
    expect(claim2.message).toContain('already collected');
  });
});

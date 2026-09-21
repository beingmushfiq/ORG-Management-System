import { describe, it, expect, beforeEach } from 'vitest';
import { WelfareEngine, BloodDonorProfile } from '../src/modules/welfare/welfare-engine';

describe('WelfareEngine - Community Blood Network & Hardship Grants', () => {
  let welfareEngine: WelfareEngine;

  beforeEach(() => {
    welfareEngine = new WelfareEngine();
  });

  it('should filter out donors who donated less than 90 days ago', () => {
    const fixedNow = new Date('2026-09-20T12:00:00Z');

    // Donor A: Donated 100 days ago (Eligible)
    const donorA: BloodDonorProfile = {
      memberId: 'mem-1',
      name: 'Dr. Kabir Hossain',
      nameBn: 'ডাঃ কবির হোসেন',
      bloodGroup: 'O+',
      branchPath: '/1/2',
      district: 'Chattogram',
      contactNumber: '01811111111',
      lastDonatedDate: new Date('2026-06-10T12:00:00Z'), // ~102 days ago
      isAvailable: true,
      totalDonations: 12,
    };

    // Donor B: Donated 40 days ago (Too soon, Not eligible)
    const donorB: BloodDonorProfile = {
      memberId: 'mem-2',
      name: 'Dr. Tariqul Islam',
      nameBn: 'ডাঃ তরিকুল ইসলাম',
      bloodGroup: 'O+',
      branchPath: '/1/2',
      district: 'Chattogram',
      contactNumber: '01822222222',
      lastDonatedDate: new Date('2026-08-11T12:00:00Z'), // ~40 days ago
      isAvailable: true,
      totalDonations: 5,
    };

    // Donor C: Different district (Dhaka)
    const donorC: BloodDonorProfile = {
      memberId: 'mem-3',
      name: 'Dr. Anisur Rahman',
      nameBn: 'ডাঃ আনিসুর রহমান',
      bloodGroup: 'O+',
      branchPath: '/1/1',
      district: 'Dhaka',
      contactNumber: '01833333333',
      isAvailable: true,
      totalDonations: 3,
    };

    welfareEngine.registerDonor(donorA);
    welfareEngine.registerDonor(donorB);
    welfareEngine.registerDonor(donorC);

    const eligible = welfareEngine.findEligibleDonors('O+', 'Chattogram', fixedNow);

    expect(eligible.length).toBe(1);
    expect(eligible[0]?.memberId).toBe('mem-1');
  });

  it('should dispatch emergency blood appeal to verified local donors', () => {
    const fixedNow = new Date('2026-09-20T12:00:00Z');

    welfareEngine.registerDonor({
      memberId: 'mem-4',
      name: 'Dr. Farhana Begum',
      nameBn: 'ডাঃ ফারহানা বেগম',
      bloodGroup: 'B+',
      branchPath: '/1/2',
      district: 'Chattogram',
      contactNumber: '01711112222',
      isAvailable: true,
      totalDonations: 6,
    });

    const appealResult = welfareEngine.dispatchEmergencyAppeal(
      {
        requestId: 'REQ-BLD-001',
        organizationId: 'org-bma',
        patientName: 'Master Aayan (Thalassemia Major)',
        hospitalName: 'Chattogram Medical College Hospital (Ward 14)',
        hospitalDistrict: 'Chattogram',
        bloodGroup: 'B+',
        unitsNeeded: 2,
        contactPerson: 'Dr. Kazi Mostafa',
        contactPhone: '01819999999',
        neededWithinHours: 4,
        isThalassemiaPatient: true,
      },
      fixedNow
    );

    expect(appealResult.broadcastStatus).toBe('DISPATCHED');
    expect(appealResult.eligibleDonorCount).toBe(1);
    expect(appealResult.dispatchedSmsCount).toBe(1);
  });

  it('should handle emergency blood appeal with no matching donors gracefully', () => {
    const appealResult = welfareEngine.dispatchEmergencyAppeal({
      requestId: 'REQ-BLD-002',
      organizationId: 'org-bma',
      patientName: 'Mrs. Jahanara',
      hospitalName: 'Sylhet Osmani Medical College',
      hospitalDistrict: 'Sylhet',
      bloodGroup: 'AB-',
      unitsNeeded: 1,
      contactPerson: 'Dr. Ahmed',
      contactPhone: '01712345678',
      neededWithinHours: 2,
    });

    expect(appealResult.broadcastStatus).toBe('NO_ELIGIBLE_DONORS');
    expect(appealResult.eligibleDonorCount).toBe(0);
    expect(appealResult.dispatchedSmsCount).toBe(0);
  });

  it('should process hardship grant application and disbursement', () => {
    const grant = welfareEngine.applyHardshipGrant({
      grantId: 'WLF-2026-0042',
      memberId: 'mem-5',
      organizationId: 'org-bma',
      requestedAmountPaisa: 15000000n, // 1,50,000 BDT
      illnessOrDisasterDescription: 'House completely submerged in Feni flood and clinic equipment damaged.',
    });

    expect(grant.status).toBe('PENDING_SECRETARIAT');
    expect(grant.requestedAmountPaisa).toBe(15000000n);

    const approved = welfareEngine.approveHardshipGrant('WLF-2026-0042', 12000000n); // 1,20,000 BDT
    expect(approved.status).toBe('APPROVED_TREASURER');
    expect(approved.disbursedAmountPaisa).toBe(12000000n);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { ExportService, MemberRegisterRow, CashBookEntry } from '../src/modules/export/export.service';

describe('ExportService - Statutory Registers & Cash Book', () => {
  let exportService: ExportService;

  beforeEach(() => {
    exportService = new ExportService();
  });

  const sampleMembers: MemberRegisterRow[] = [
    {
      serialNo: 0,
      membershipNo: 'BMA-DHK-1001',
      name: 'Dr. Salma Begum',
      nameBn: 'ডাঃ সালমা বেগম',
      tier: 'LIFE',
      branchName: 'Dhaka Central Unit',
      admissionDate: '2015-03-12',
      nationalIdOrRegNo: 'A-45902',
      standing: 'ACTIVE',
      duesCleared: true,
    },
    {
      serialNo: 0,
      membershipNo: 'BMA-CTG-2004',
      name: 'Dr. Kabir Hossain',
      nameBn: 'ডাঃ কবির হোসেন',
      tier: 'GENERAL',
      branchName: 'Kotwali Central Hospital Unit',
      admissionDate: '2020-08-19',
      nationalIdOrRegNo: 'A-61204',
      standing: 'ACTIVE',
      duesCleared: false, // Dues not cleared
    },
    {
      serialNo: 0,
      membershipNo: 'BMA-SYL-3001',
      name: 'Dr. Tariqul Islam',
      nameBn: 'ডাঃ তরিকুল ইসলাম',
      tier: 'GENERAL',
      branchName: 'Sylhet Osmani Unit',
      admissionDate: '2022-01-10',
      nationalIdOrRegNo: 'A-88190',
      standing: 'SUSPENDED',
      duesCleared: true,
    },
  ];

  it('should format Societies Registration Act 1860 register with sequential serials', () => {
    const report = exportService.generateSocietiesActMemberRegister('org-bma', sampleMembers);

    expect(report.header.statutoryAct).toContain('Societies Registration Act XXI of 1860');
    expect(report.header.totalEnrolledMembers).toBe(3);
    expect(report.header.activeVoters).toBe(1); // Only Dr. Salma is ACTIVE and dues cleared
    expect(report.records[0]?.serialNo).toBe(1);
    expect(report.records[1]?.serialNo).toBe(2);
    expect(report.records[2]?.serialNo).toBe(3);
  });

  it('should compile AGM Voter Roll excluding suspended or un-cleared members with signature box flag', () => {
    const voterRoll = exportService.compileAgmVoterRoll('org-bma', 'evt-agm-2026', sampleMembers);

    expect(voterRoll.length).toBe(1);
    expect(voterRoll[0]?.name).toBe('Dr. Salma Begum');
    expect(voterRoll[0]?.ballotSerial).toBe(1);
    expect(voterRoll[0]?.voterId).toBe('VTR-0001');
    expect(voterRoll[0]?.signatureBoxRequired).toBe(true);
  });

  it('should compute Double-entry Cash Book with strict integer paisa accuracy', () => {
    const openingBalancePaisa = 10000000n; // 1,00,000 BDT

    const entries: CashBookEntry[] = [
      {
        date: '2026-09-01',
        voucherNo: 'VR-01',
        particulars: 'Annual Membership Dues Collection',
        accountHead: 'SUBSCRIPTION',
        receiptPaisa: 5000000n, // 50,000 BDT
        paymentPaisa: 0n,
      },
      {
        date: '2026-09-05',
        voucherNo: 'VP-01',
        particulars: 'Hall Rental Advance for AGM',
        accountHead: 'CONFERENCE',
        receiptPaisa: 0n,
        paymentPaisa: 3000000n, // 30,000 BDT
      },
      {
        date: '2026-09-10',
        voucherNo: 'VR-02',
        particulars: 'Flood Relief Benevolent Donation',
        accountHead: 'DONATION',
        receiptPaisa: 2500000n, // 25,000 BDT
        paymentPaisa: 0n,
      },
      {
        date: '2026-09-12',
        voucherNo: 'VP-02',
        particulars: 'Secretariat Emergency Medical Supply Procurement',
        accountHead: 'RELIEF_EXPENSE',
        receiptPaisa: 0n,
        paymentPaisa: 2000000n, // 20,000 BDT
      },
    ];

    const statement = exportService.generateCashBookStatement(
      'org-bma',
      'FY 2026-2027',
      openingBalancePaisa,
      entries
    );

    // Total Receipts: 50,000 + 25,000 = 75,000 BDT (7500000 paisa)
    expect(statement.totalReceiptsPaisa).toBe(7500000n);
    // Total Payments: 30,000 + 20,000 = 50,000 BDT (5000000 paisa)
    expect(statement.totalPaymentsPaisa).toBe(5000000n);
    // Closing Balance: 100,000 + 75,000 - 50,000 = 125,000 BDT (12500000 paisa)
    expect(statement.closingBalancePaisa).toBe(12500000n);
  });
});

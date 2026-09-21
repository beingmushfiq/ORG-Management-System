import { describe, it, expect, beforeEach } from "vitest";
import { FinanceService } from "../src/modules/finance/finance.service";
import { EpsPaymentProvider } from "../src/modules/finance/providers/eps.provider";
import { BkashPaymentProvider } from "../src/modules/finance/providers/bkash.provider";
import { NagadPaymentProvider } from "../src/modules/finance/providers/nagad.provider";
import { SslCommerzPaymentProvider } from "../src/modules/finance/providers/sslcommerz.provider";

describe("Phase 5: Multi-Gateway Finance & Paisa-Precision Ledger", () => {
  let service: FinanceService;
  let epsProvider: EpsPaymentProvider;
  let bkashProvider: BkashPaymentProvider;
  let nagadProvider: NagadPaymentProvider;
  let sslProvider: SslCommerzPaymentProvider;

  const ORG_ID = "org-bma-ctg";
  const USER_ID = "usr-salma-142";

  beforeEach(() => {
    epsProvider = new EpsPaymentProvider();
    bkashProvider = new BkashPaymentProvider();
    nagadProvider = new NagadPaymentProvider();
    sslProvider = new SslCommerzPaymentProvider();
    service = new FinanceService(epsProvider, bkashProvider, nagadProvider, sslProvider);
  });

  describe("1. Dues Invoicing & Integer Paisa Precision", () => {
    it("should generate exact integer paisa dues for Associate tier (৳200.00 = 20000n)", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "ASSOCIATE",
        period: "MONTHLY",
        dueDate: new Date(Date.now() + 15 * 86400000),
      });

      expect(invoice.amountPaisa).toBe(20000n);
      expect(invoice.status).toBe("UNPAID");
      expect(invoice.invoiceNumber).toMatch(/^INV-\d{4}-\d{5}$/);
    });

    it("should generate exact integer paisa dues for General tier (৳500.00 = 50000n)", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(Date.now() + 15 * 86400000),
      });

      expect(invoice.amountPaisa).toBe(50000n);
      expect(invoice.paidPaisa).toBe(0n);
    });

    it("should generate exact integer paisa dues for Life tier (৳25,000.00 = 2500000n)", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "LIFE",
        period: "ONETIME",
        dueDate: new Date(Date.now() + 30 * 86400000),
      });

      expect(invoice.amountPaisa).toBe(2500000n);
    });
  });

  describe("2. Multi-Gateway Adapters (EPS, bKash, Nagad, SSLCommerz)", () => {
    it("EPS should create payment session and format integer paisa to BDT", async () => {
      const session = await epsProvider.createPaymentSession({
        organizationId: ORG_ID,
        invoiceId: "inv-1",
        invoiceNumber: "INV-2026-0001",
        amountPaisa: 50000n,
        currency: "BDT",
        customerName: "Dr. Salma Begum",
        customerPhone: "01700000000",
        callbackUrl: "https://org.bd/callback",
        cancelUrl: "https://org.bd/cancel",
        ipnUrl: "https://org.bd/ipn",
      });

      expect(session.provider).toBe("EPS");
      expect(session.redirectUrl).toContain("checkout?session_id=");
      expect(session.redirectUrl).toContain("sig=");
    });

    it("bKash Checkout should create tokenized payment session", async () => {
      const session = await bkashProvider.createPaymentSession({
        organizationId: ORG_ID,
        invoiceId: "inv-2",
        invoiceNumber: "INV-2026-0002",
        amountPaisa: 50000n,
        currency: "BDT",
        customerName: "Dr. Salma Begum",
        customerPhone: "01700000000",
        callbackUrl: "https://org.bd/callback",
        cancelUrl: "https://org.bd/cancel",
        ipnUrl: "https://org.bd/ipn",
      });

      expect(session.provider).toBe("BKASH");
      expect(session.sessionId).toContain("BKASH-");
    });

    it("Nagad PGW should create redirect session", async () => {
      const session = await nagadProvider.createPaymentSession({
        organizationId: ORG_ID,
        invoiceId: "inv-3",
        invoiceNumber: "INV-2026-0003",
        amountPaisa: 50000n,
        currency: "BDT",
        customerName: "Dr. Salma Begum",
        customerPhone: "01700000000",
        callbackUrl: "https://org.bd/callback",
        cancelUrl: "https://org.bd/cancel",
        ipnUrl: "https://org.bd/ipn",
      });

      expect(session.provider).toBe("NAGAD");
      expect(session.sessionId).toContain("NGD-");
    });

    it("SSLCommerz should generate session key and checkout URL", async () => {
      const session = await sslProvider.createPaymentSession({
        organizationId: ORG_ID,
        invoiceId: "inv-4",
        invoiceNumber: "INV-2026-0004",
        amountPaisa: 50000n,
        currency: "BDT",
        customerName: "Dr. Salma Begum",
        customerPhone: "01700000000",
        callbackUrl: "https://org.bd/callback",
        cancelUrl: "https://org.bd/cancel",
        ipnUrl: "https://org.bd/ipn",
      });

      expect(session.provider).toBe("SSLCOMMERZ");
      expect(session.sessionId).toContain("SSLC-");
    });
  });

  describe("3. Grace Period & Delinquency Rules", () => {
    it("should identify on-time dues as non-delinquent", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(Date.now() + 5 * 86400000), // Due in 5 days
      });

      const evalResult = service.evaluateGracePeriod(invoice);
      expect(evalResult.isDelinquent).toBe(false);
      expect(evalResult.recommendedAction).toBe("NONE");
    });

    it("should issue REMINDER for 1-29 days overdue", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(Date.now() - 10 * 86400000), // 10 days overdue
      });

      const evalResult = service.evaluateGracePeriod(invoice);
      expect(evalResult.isDelinquent).toBe(true);
      expect(evalResult.recommendedAction).toBe("REMINDER");
    });

    it("should issue WARNING for 30-59 days overdue", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(Date.now() - 45 * 86400000), // 45 days overdue
      });

      const evalResult = service.evaluateGracePeriod(invoice);
      expect(evalResult.isDelinquent).toBe(true);
      expect(evalResult.recommendedAction).toBe("WARNING");
    });

    it("should recommend SUSPENSION_TRIGGER for 60+ days overdue", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(Date.now() - 65 * 86400000), // 65 days overdue
      });

      const evalResult = service.evaluateGracePeriod(invoice);
      expect(evalResult.isDelinquent).toBe(true);
      expect(evalResult.recommendedAction).toBe("SUSPENSION_TRIGGER");
    });
  });

  describe("4. Hardship Waiver & Treasurer Approval Flow", () => {
    it("should allow a member to submit a waiver and Treasurer to approve it", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(),
      });

      service.submitHardshipWaiver({
        organizationId: ORG_ID,
        invoiceId: invoice.id,
        userId: USER_ID,
        reason: "Medical leave due to health emergency",
      });

      expect(invoice.status).toBe("UNDER_VERIFICATION");

      const approvedInvoice = service.verifyManualPaymentByTreasurer({
        organizationId: ORG_ID,
        invoiceId: invoice.id,
        treasurerId: "treasurer-mujibul",
        approved: true,
        notes: "Granted 6-month medical waiver under bylaw 14.2",
      });

      expect(approvedInvoice.status).toBe("WAIVED");
    });
  });

  describe("5. Treasurer Manual Slip Verification Queue", () => {
    it("should transition bank transfer slip from UNDER_VERIFICATION to PAID", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(),
      });

      service.submitManualPaymentProof({
        organizationId: ORG_ID,
        invoiceId: invoice.id,
        userId: USER_ID,
        paymentMethod: "BANK_TRANSFER",
        transactionRef: "SONALI-DEP-99410",
        slipReceiptUrl: "https://storage.org.bd/slips/slip_99410.jpg",
        amountPaisa: 50000n,
      });

      expect(invoice.status).toBe("UNDER_VERIFICATION");

      const settled = service.verifyManualPaymentByTreasurer({
        organizationId: ORG_ID,
        invoiceId: invoice.id,
        treasurerId: "treasurer-mujibul",
        approved: true,
      });

      expect(settled.status).toBe("PAID");
      expect(settled.paidPaisa).toBe(50000n);
    });
  });

  describe("6. Idempotent Gateway Payment Settlement", () => {
    it("should settle payment on first callback and reject duplicate callback (replay attack)", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(),
      });

      const idempotencyKey = "IDEMP-EPS-9823472";

      const settled = service.settleGatewayPayment(
        ORG_ID,
        invoice.id,
        50000n,
        "EPS",
        "EPS-TXN-12345",
        idempotencyKey
      );

      expect(settled.status).toBe("PAID");
      expect(settled.transactionRef).toBe("EPS-TXN-12345");

      // Attempt duplicate callback with same idempotency key
      expect(() => {
        service.settleGatewayPayment(
          ORG_ID,
          invoice.id,
          50000n,
          "EPS",
          "EPS-TXN-12345",
          idempotencyKey
        );
      }).toThrowError(/Duplicate payment callback ignored/);
    });
  });

  describe("7. Digital Money Receipt Generation", () => {
    it("should generate cryptographically verifiable money receipt with SHA-256 seal", () => {
      const invoice = service.createDuesInvoice({
        organizationId: ORG_ID,
        userId: USER_ID,
        tier: "GENERAL",
        period: "MONTHLY",
        dueDate: new Date(),
      });

      service.settleGatewayPayment(
        ORG_ID,
        invoice.id,
        50000n,
        "EPS",
        "EPS-TXN-12345",
        "IDEMP-RCP-1"
      );

      const receipt = service.generateMoneyReceipt(invoice.id, "Dr. Salma Begum");

      expect(receipt.receiptNumber).toMatch(/^RCP-\d{4}-\d{5}$/);
      expect(receipt.amountFormattedBdt).toBe("৳ 500.00");
      expect(receipt.securityHash).toBeDefined();
      expect(receipt.securityHash.length).toBe(64); // SHA-256
      expect(receipt.verificationQrUrl).toContain("/verify/receipt/");
    });
  });
});

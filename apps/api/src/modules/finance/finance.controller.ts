import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import * as crypto from "crypto";
import { FinanceService } from "./finance.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { PermissionGuard } from "../../common/guards/permission.guard";
import { RequirePermission } from "../../common/decorators/require-permission.decorator";
import { prisma } from "@org/database";

@Controller("finance")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get("invoices")
  @RequirePermission("FINANCE", "VIEW")
  async listInvoices(
    @Req() req: any,
    @Query("status") status?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const pageNum = Math.max(1, parseInt(page || "1", 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit || "20", 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = { organizationId: req.organizationId };
    if (status) {
      where.status = status;
    }

    const [total, items] = await Promise.all([
      prisma.invoice.count({ where }),
      prisma.invoice.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              fullName: true,
              phone: true,
              memberships: {
                take: 1,
                select: { membershipNumber: true, tier: true },
              },
            },
          },
        },
      }),
    ]);

    // Format BigInt amounts for JSON serialization
    const formatted = items.map((inv) => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      description: inv.description,
      amountPaisa: inv.amountPaisa.toString(),
      amountFormattedBdt: `৳${(Number(inv.amountPaisa) / 100).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`,
      paidPaisa: inv.paidPaisa.toString(),
      status: inv.status,
      dueDate: inv.dueDate,
      paidAt: inv.paidAt,
      paymentMethod: inv.paymentMethod,
      transactionRef: inv.transactionRef,
      slipReceiptUrl: inv.slipReceiptUrl,
      memberName: inv.user.fullName,
      membershipNumber: inv.user.memberships[0]?.membershipNumber || "N/A",
      memberTier: inv.user.memberships[0]?.tier || "GENERAL",
    }));

    return {
      data: formatted,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  @Get("stats")
  @RequirePermission("FINANCE", "VIEW")
  async getStats(@Req() req: any) {
    const invoices = await prisma.invoice.findMany({
      where: { organizationId: req.organizationId },
      select: {
        amountPaisa: true,
        paidPaisa: true,
        status: true,
      },
    });

    let totalBilledPaisa = 0n;
    let totalCollectedPaisa = 0n;
    let pendingVerificationCount = 0;
    let unpaidCount = 0;

    for (const inv of invoices) {
      totalBilledPaisa += inv.amountPaisa;
      totalCollectedPaisa += inv.paidPaisa;
      if (inv.status === "UNDER_VERIFICATION") {
        pendingVerificationCount++;
      } else if (inv.status === "UNPAID") {
        unpaidCount++;
      }
    }

    return {
      totalBilledPaisa: totalBilledPaisa.toString(),
      totalBilledBdt: `৳${(Number(totalBilledPaisa) / 100).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`,
      totalCollectedPaisa: totalCollectedPaisa.toString(),
      totalCollectedBdt: `৳${(Number(totalCollectedPaisa) / 100).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`,
      pendingVerificationCount,
      unpaidCount,
      totalInvoices: invoices.length,
    };
  }

  @Post("invoices")
  @RequirePermission("FINANCE", "CREATE")
  async createInvoice(
    @Req() req: any,
    @Body()
    body: {
      userId: string;
      description: string;
      amountPaisa: string;
      dueDate: string;
    }
  ) {
    const year = new Date().getFullYear();
    const count = await prisma.invoice.count({
      where: { organizationId: req.organizationId },
    });
    const invoiceNumber = `INV-${year}-${(count + 1).toString().padStart(5, "0")}`;

    const invoice = await prisma.invoice.create({
      data: {
        organizationId: req.organizationId,
        userId: body.userId,
        invoiceNumber,
        description: body.description,
        amountPaisa: BigInt(body.amountPaisa),
        dueDate: new Date(body.dueDate),
        status: "UNPAID",
      },
    });

    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      amountPaisa: invoice.amountPaisa.toString(),
      status: invoice.status,
    };
  }

  @Post("initiate-online-payment")
  async initiateOnlinePayment(
    @Req() req: any,
    @Body()
    body: {
      invoiceId: string;
      provider: "EPS" | "BKASH" | "NAGAD" | "SSLCOMMERZ";
    }
  ) {
    const invoice = await prisma.invoice.findFirst({
      where: { id: body.invoiceId, organizationId: req.organizationId },
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    const gateway = this.financeService.getProvider(body.provider);
    return gateway.createPaymentSession({
      organizationId: req.organizationId,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      amountPaisa: invoice.amountPaisa,
      currency: "BDT",
      customerName: req.user?.fullName || "Member",
      customerEmail: req.user?.email,
      customerPhone: req.user?.phone || "01700000000",
      callbackUrl: "https://org.app/portal/finance",
      cancelUrl: "https://org.app/portal/finance",
      ipnUrl: "https://api.org.app/api/finance/webhook",
    });
  }

  @Post("submit-slip")
  async submitSlip(
    @Req() req: any,
    @Body()
    body: {
      invoiceId: string;
      paymentMethod: any;
      transactionRef: string;
      slipReceiptUrl?: string;
    }
  ) {
    const invoice = await prisma.invoice.findFirst({
      where: { id: body.invoiceId, organizationId: req.organizationId },
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }

    return prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        status: "UNDER_VERIFICATION",
        paymentMethod: body.paymentMethod,
        transactionRef: body.transactionRef,
        slipReceiptUrl: body.slipReceiptUrl ?? null,
      },
    });
  }

  @Post("verify-slip")
  @RequirePermission("FINANCE", "VERIFY")
  async verifySlip(
    @Req() req: any,
    @Body()
    body: {
      invoiceId: string;
      approved: boolean;
      notes?: string;
    }
  ) {
    const invoice = await prisma.invoice.findFirst({
      where: { id: body.invoiceId, organizationId: req.organizationId },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (body.approved) {
      const updated = await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "PAID",
          paidPaisa: invoice.amountPaisa,
          paidAt: new Date(),
          verifiedById: req.user.id,
        },
      });

      // Create immutable payment record
      await prisma.paymentRecord.create({
        data: {
          organizationId: req.organizationId,
          invoiceId: invoice.id,
          amountPaisa: invoice.amountPaisa,
          paymentMethod: invoice.paymentMethod || "BANK_TRANSFER",
          transactionRef: invoice.transactionRef || `REF-${Date.now()}`,
          idempotencyKey: `VERIFY-${invoice.id}-${Date.now()}`,
        },
      });

      await prisma.auditLog.create({
        data: {
          organizationId: req.organizationId,
          actorId: req.user.id,
          action: "FINANCE:PAYMENT_VERIFIED",
          targetEntity: "Invoice",
          targetId: invoice.id,
          diffJson: { amountPaisa: invoice.amountPaisa.toString(), notes: body.notes },
        },
      });

      return updated;
    } else {
      return prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          status: "UNPAID",
          verifiedById: req.user.id,
        },
      });
    }
  }

  @Get("receipt/:invoiceId")
  @RequirePermission("FINANCE", "VIEW")
  async getReceipt(@Req() req: any, @Param("invoiceId") invoiceId: string) {
    const invoice = await prisma.invoice.findFirst({
      where: { id: invoiceId, organizationId: req.organizationId, status: "PAID" },
      include: { user: true },
    });

    if (!invoice) {
      throw new NotFoundException("Paid invoice not found for receipt issuance");
    }

    const taka = invoice.paidPaisa / 100n;
    const remainder = invoice.paidPaisa % 100n;
    const formattedBdt = `৳ ${taka}.${remainder < 10n ? `0${remainder}` : remainder}`;
    const receiptNumber = `RCP-${invoice.invoiceNumber.replace("INV-", "")}`;
    const securityPayload = `${receiptNumber}|${invoice.id}|${invoice.paidPaisa}|${invoice.transactionRef || ""}`;
    const securityHash = crypto.createHash("sha256").update(securityPayload).digest("hex");

    return {
      receiptNumber,
      invoiceNumber: invoice.invoiceNumber,
      organizationId: invoice.organizationId,
      recipientName: invoice.user.fullName,
      amountPaisa: invoice.paidPaisa.toString(),
      amountFormattedBdt: formattedBdt,
      paymentMethod: invoice.paymentMethod,
      transactionRef: invoice.transactionRef,
      paidAt: invoice.paidAt,
      verificationQrUrl: `https://app.orgos.bd/verify/receipt/${receiptNumber}?hash=${securityHash.substring(0, 16)}`,
      securityHash,
    };
  }
}

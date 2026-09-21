import { BadRequestException } from "@nestjs/common";

export interface SupportTicket {
  id: string;
  organizationId: string;
  memberId: string;
  subject: string;
  category: "MEMBERSHIP_INQUIRY" | "DUES_AND_PAYMENTS" | "CERTIFICATE_VERIFICATION" | "GENERAL_QUERY";
  priority: "LOW" | "NORMAL" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  assignedToRole?: string | undefined;
  messages: Array<{
    senderId: string;
    senderRole: "MEMBER" | "OFFICER";
    message: string;
    sentAt: Date;
  }>;
  createdAt: Date;
  resolvedAt?: Date | undefined;
}

export class SupportEngine {
  static createTicket(
    organizationId: string,
    memberId: string,
    subject: string,
    category: SupportTicket["category"],
    initialMessage: string,
    priority: SupportTicket["priority"] = "NORMAL"
  ): SupportTicket {
    if (!subject.trim()) {
      throw new BadRequestException("Ticket subject cannot be empty");
    }

    return {
      id: `TCK-${Date.now()}`,
      organizationId,
      memberId,
      subject,
      category,
      priority,
      status: "OPEN",
      assignedToRole: category === "DUES_AND_PAYMENTS" ? "TREASURER" : "SECRETARY",
      messages: [
        {
          senderId: memberId,
          senderRole: "MEMBER",
          message: initialMessage,
          sentAt: new Date(),
        },
      ],
      createdAt: new Date(),
    };
  }

  static resolveTicket(ticket: SupportTicket, officerId: string, resolutionNote: string): SupportTicket {
    ticket.status = "RESOLVED";
    ticket.resolvedAt = new Date();
    ticket.messages.push({
      senderId: officerId,
      senderRole: "OFFICER",
      message: `[RESOLVED] ${resolutionNote}`,
      sentAt: new Date(),
    });
    return ticket;
  }
}

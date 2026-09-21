/**
 * Production Institutional API Client
 * Sends requests with credentials: "include" to transmit HttpOnly JWT cookies.
 * Proxied seamlessly to the NestJS backend via Next.js rewrites at /api/*.
 */

export class ApiError extends Error {
  override message: string;
  constructor(
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
    this.message = message;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string>),
    },
  });

  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(response.status, errorMsg, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit | undefined) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit | undefined) => {
    const opts: RequestInit = { ...options, method: "POST" };
    if (body !== undefined) {
      opts.body = JSON.stringify(body);
    }
    return request<T>(endpoint, opts);
  },

  patch: <T>(endpoint: string, body?: any, options?: RequestInit | undefined) => {
    const opts: RequestInit = { ...options, method: "PATCH" };
    if (body !== undefined) {
      opts.body = JSON.stringify(body);
    }
    return request<T>(endpoint, opts);
  },

  delete: <T>(endpoint: string, options?: RequestInit | undefined) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  // ================= AUTHENTICATION APIS =================
  auth: {
    sendOtp: (phoneOrEmail: string, organizationSlug = "rsm-bd") =>
      request<{ success: boolean; message: string; challengeExpiresAt: string }>(
        "/auth/send-otp",
        {
          method: "POST",
          body: JSON.stringify({ phoneOrEmail, phone: phoneOrEmail, organizationSlug }),
        }
      ),

    verifyOtp: (phoneOrEmail: string, code: string, organizationSlug = "rsm-bd") =>
      request<{
        success: boolean;
        accessToken: string;
        user: any;
        activePosition: any;
      }>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phoneOrEmail, phone: phoneOrEmail, code, organizationSlug }),
      }),

    login: (phoneOrEmail: string, password: string, organizationSlug = "rsm-bd") =>
      request<{
        success: boolean;
        accessToken: string;
        user: any;
        activePosition: any;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ phoneOrEmail, email: phoneOrEmail, password, organizationSlug }),
      }),

    getMe: () =>
      request<{ user: any; activePosition: any; positions: any[] }>("/auth/me", {
        method: "GET",
      }),

    switchPosition: (userPositionId: string) =>
      request<{ success: boolean; activePosition: any }>("/auth/switch-position", {
        method: "POST",
        body: JSON.stringify({ userPositionId, targetPositionId: userPositionId }),
      }),

    logout: async () => {
      try {
        return await request<{ success: boolean; message: string }>("/auth/logout", {
          method: "POST",
        });
      } catch {
        return { success: true, message: "Logged out locally." };
      }
    },
  },

  // ================= MEMBERSHIP APIS =================
  membership: {
    list: async (params?: { page?: number | undefined; limit?: number | undefined; status?: string | undefined; tier?: string | undefined; search?: string | undefined } | undefined) => {
      const query = new URLSearchParams();
      if (params?.page) query.set("page", params.page.toString());
      if (params?.limit) query.set("limit", params.limit.toString());
      if (params?.status) query.set("status", params.status);
      if (params?.tier) query.set("tier", params.tier);
      if (params?.search) query.set("search", params.search);
      const res = await request<any>(`/members?${query.toString()}`);
      const items = res?.data || res?.items || (Array.isArray(res) ? res : []);
      const total = res?.meta?.total ?? res?.total ?? items.length;
      return {
        total,
        page: res?.meta?.page ?? res?.page ?? 1,
        limit: res?.meta?.limit ?? res?.limit ?? 20,
        items,
        data: items,
      };
    },

    getById: (id: string) => request<any>(`/members/${id}`),

    endorse: (id: string, notes?: string | undefined) => {
      const body: Record<string, any> = {};
      if (notes !== undefined) body.notes = notes;
      return request<any>(`/members/${id}/endorse`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    approve: (id: string, tier?: string | undefined) => {
      const body: Record<string, any> = {};
      if (tier !== undefined) body.tier = tier;
      return request<any>(`/members/${id}/approve`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    apply: (data: any) =>
      request<any>("/public/apply", {
        method: "POST",
        body: JSON.stringify({ organizationSlug: "rsm-bd", ...data }),
      }),
  },

  // ================= HIERARCHY & BRANCHES APIS =================
  hierarchy: {
    getTree: () => request<any>("/branches/tree"),
    list: () => request<any[]>("/branches"),
    create: (data: {
      parentId?: string | undefined;
      name: string;
      nameBn?: string | undefined;
      code?: string | undefined;
      levelLabel?: string | undefined;
      address?: string | undefined;
      contactPhone?: string | undefined;
    }) =>
      request<any>("/branches", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // ================= GOVERNANCE & MEETINGS APIS =================
  governance: {
    listMeetings: (status?: string | undefined) => {
      const q = status ? `?status=${status}` : "";
      return request<any[]>(`/governance/meetings${q}`);
    },

    getMeetingById: (id: string) => request<any>(`/governance/meetings/${id}`),

    createMeeting: (data: {
      title: string;
      titleBn?: string | undefined;
      category: string;
      scheduledAt: string;
      venue: string;
      venueBn?: string | undefined;
      branchNodeId?: string | undefined;
      agendaJson?: any[] | undefined;
    }) =>
      request<any>("/governance/meetings", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    schedule: (id: string) =>
      request<any>(`/governance/meetings/${id}/schedule`, { method: "POST" }),

    recordMinutes: (
      id: string,
      data: {
        presidedById: string;
        recordedById: string;
        quorumCount: number;
        totalEligibleCount: number;
        minutesHtml: string;
        minutesHtmlBn?: string | undefined;
        resolutions: Array<{
          agendaTitle: string;
          decisionText: string;
          decisionTextBn?: string | undefined;
          isUnanimous: boolean;
        }>;
      }
    ) =>
      request<any>(`/governance/meetings/${id}/minutes`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    listResolutions: () => request<any[]>("/governance/resolutions"),
  },

  // ================= FINANCE & TREASURY APIS =================
  finance: {
    listInvoices: async (params?: { status?: string | undefined; page?: number | undefined; limit?: number | undefined } | undefined) => {
      const q = new URLSearchParams();
      if (params?.status) q.set("status", params.status);
      if (params?.page) q.set("page", params.page.toString());
      if (params?.limit) q.set("limit", params.limit.toString());
      const res = await request<any>(`/finance/invoices?${q.toString()}`);
      const items = res?.data || res?.items || (Array.isArray(res) ? res : []);
      const total = res?.meta?.total ?? res?.total ?? items.length;
      return {
        total,
        page: res?.meta?.page ?? res?.page ?? 1,
        limit: res?.meta?.limit ?? res?.limit ?? 20,
        items,
        data: items,
      };
    },

    getStats: () => request<any>("/finance/stats"),

    createInvoice: (data: {
      userId: string;
      description: string;
      amountPaisa: string;
      dueDate: string;
    }) =>
      request<any>("/finance/invoices", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    submitSlip: (data: {
      invoiceId: string;
      paymentMethod: string;
      transactionRef: string;
      slipReceiptUrl?: string | undefined;
    }) =>
      request<any>("/finance/submit-slip", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    verifySlip: (data: { invoiceId: string; approved: boolean; notes?: string | undefined }) =>
      request<any>("/finance/verify-slip", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getReceipt: (invoiceId: string) =>
      request<any>(`/finance/receipt/${invoiceId}`),
  },

  // ================= COMMUNICATIONS APIS =================
  communications: {
    listNotices: () => request<any[]>("/communications/notices"),

    createNotice: (data: {
      title: string;
      titleBn?: string | undefined;
      contentHtml: string;
      contentHtmlBn?: string | undefined;
      isPublic?: boolean | undefined;
      isPinned?: boolean | undefined;
    }) =>
      request<any>("/communications/notices", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    broadcast: (data: {
      messageBn: string;
      messageEn?: string | undefined;
      targetBranchPath?: string | undefined;
    }) =>
      request<any>("/communications/broadcast", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // ================= SUPERADMIN APIS =================
  superadmin: {
    getOverview: () => request<any>("/superadmin/overview"),
    listTenants: () => request<any[]>("/superadmin/tenants"),
    createTenant: (data: {
      name: string;
      nameBn?: string | undefined;
      slug: string;
      planId?: string | undefined;
      contactEmail?: string | undefined;
      contactPhone?: string | undefined;
    }) =>
      request<any>("/superadmin/tenants", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    impersonate: (data: {
      targetUserId: string;
      justification?: string | undefined;
      reason?: string | undefined;
      targetOrganizationId?: string | undefined;
    }) =>
      request<any>("/superadmin/impersonate", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          reason: data.reason || data.justification,
          justification: data.justification || data.reason,
        }),
      }),
    exitImpersonate: (impersonationLogId?: string | undefined) =>
      request<any>("/superadmin/exit-impersonate", {
        method: "POST",
        body: JSON.stringify({ impersonationLogId }),
      }),
  },
};

/**
 * StayConnect Unified API Client
 * Provides type-safe connectivity to the NestJS backend with local fallback.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface ApiResponseEnvelope<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

class ApiClient {
  private token: string | null = null;

  setAuthToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponseEnvelope<T>> {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
      });

      const json = await res.json();
      return json;
    } catch (err) {
      // In development or when API is offline, gracefully return failure envelope
      return {
        success: false,
        data: null as any,
        error: {
          code: 'NETWORK_ERROR',
          message: err instanceof Error ? err.message : 'Unable to connect to StayConnect API',
        },
      };
    }
  }

  // --- Auth Endpoints ---
  async requestOtp(phone: string, role: string) {
    return this.request<{ phone: string; message: string; devHint?: string }>('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, role }),
    });
  }

  async verifyOtp(phone: string, otp: string, role?: string) {
    return this.request<{
      user: { id: string; phone: string; role: string };
      tokens: { accessToken: string };
    }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, role }),
    });
  }

  // --- Properties Endpoints ---
  async searchProperties(params: Record<string, any> = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.set(k, String(v));
      }
    });
    return this.request<any[]>(`/properties?${query.toString()}`);
  }

  async getProperty(slugOrId: string) {
    return this.request<any>(`/properties/${slugOrId}`);
  }

  async getTrueCostCalculator(slugOrId: string) {
    return this.request<any>(`/properties/${slugOrId}/cost-calculator`);
  }

  async createProperty(payload: any) {
    return this.request<any>('/properties', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // --- Roommates Endpoints ---
  async searchRoommates(params: Record<string, any> = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.set(k, String(v));
      }
    });
    return this.request<any[]>(`/roommates?${query.toString()}`);
  }

  async connectWithRoommate(targetRoommateId: string, message: string) {
    return this.request<any>(`/roommates/${targetRoommateId}/connect`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getRoommateDashboard() {
    return this.request<any>('/roommates/dashboard');
  }

  async respondToRoommateRequest(requestId: string, action: 'accept' | 'reject') {
    return this.request<any>(`/roommates/requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  }

  async getRoommateMessages(conversationId: string) {
    return this.request<any[]>(`/roommates/conversations/${conversationId}/messages`);
  }

  async sendRoommateMessage(conversationId: string, content: string) {
    return this.request<any>(`/roommates/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async reportUser(reportedUserId: string, reason: string) {
    return this.request<any>('/roommates/report', {
      method: 'POST',
      body: JSON.stringify({ reportedUserId, reason }),
    });
  }

  // --- Reviews & Ratings ---
  async getReviews() {
    return this.request<any[]>('/reviews');
  }

  async submitReview(payload: any) {
    return this.request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // --- Admin Moderation & Verification ---
  async getAdminVerifications() {
    return this.request<any[]>('/admin/verifications');
  }

  async processVerification(id: string, decision: 'approved' | 'rejected', notes?: string) {
    return this.request<any>(`/admin/verifications/${id}/decision`, {
      method: 'PATCH',
      body: JSON.stringify({ decision, notes }),
    });
  }

  async getAdminReports() {
    return this.request<any[]>('/admin/reports');
  }

  async resolveAdminReport(id: string, resolution: 'resolved' | 'dismissed', notes?: string) {
    return this.request<any>(`/admin/reports/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ resolution, notes }),
    });
  }

  async getAdminAnalytics() {
    return this.request<any>('/admin/analytics');
  }

  // --- Enquiries & Visits ---
  async sendEnquiry(propertyId: string, message: string) {
    return this.request<any>('/enquiries', {
      method: 'POST',
      body: JSON.stringify({ propertyId, message }),
    });
  }

  async scheduleVisit(propertyId: string, preferredDate: string, preferredTimeSlot: string) {
    return this.request<any>('/visits', {
      method: 'POST',
      body: JSON.stringify({ propertyId, preferredDate, preferredTimeSlot }),
    });
  }
}

export const apiClient = new ApiClient();

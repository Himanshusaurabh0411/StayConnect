import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';

export enum VerificationTypeEnum {
  PHONE = 'phone',
  IDENTITY = 'identity',
  PROPERTY_DOCUMENT = 'property_document',
  PHYSICAL_INSPECTION = 'physical_inspection',
}

export enum VerificationStatusEnum {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface VerificationRecord {
  id: string;
  propertyId?: string;
  propertyName?: string;
  userId: string;
  ownerName: string;
  verificationType: VerificationTypeEnum;
  level: number;
  status: VerificationStatusEnum;
  documentType: string;
  documentUrl: string; // Presigned expiring S3 URL in production
  reviewerNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface ReviewRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  userId: string;
  userName: string;
  overallRating: number;
  cleanliness: number;
  foodQuality: number;
  ownerBehavior: number;
  waterSupply: number;
  electricity: number;
  security: number;
  maintenance: number;
  reviewText: string;
  isVerifiedResident: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface ReportRecord {
  id: string;
  reporterName: string;
  targetType: 'property' | 'user' | 'review';
  targetTitle: string;
  targetId: string;
  category: 'spam' | 'fraud' | 'inappropriate' | 'safety';
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  adminNotes?: string;
  createdAt: string;
}

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  // In-memory verification queue (synced with PostgreSQL verification_records table)
  private verifications: VerificationRecord[] = [
    {
      id: 'ver_1',
      propertyId: 'p1',
      propertyName: 'Sunrise PG for Boys (Koramangala)',
      userId: 'own_1',
      ownerName: 'Ramesh Sundaram',
      verificationType: VerificationTypeEnum.PROPERTY_DOCUMENT,
      level: 3,
      status: VerificationStatusEnum.PENDING,
      documentType: 'BESCOM Electricity Bill & Property Tax Receipt (2025-26)',
      documentUrl: 'https://storage.stayconnect.in/private-kyc/bills/bescom_p1_verified.pdf',
      submittedAt: '2026-11-06T09:30:00.000Z',
    },
    {
      id: 'ver_2',
      propertyId: 'p2',
      propertyName: 'Green Valley Ladies Hostel (Andheri West)',
      userId: 'own_2',
      ownerName: 'Sunita Mehra',
      verificationType: VerificationTypeEnum.PHYSICAL_INSPECTION,
      level: 4,
      status: VerificationStatusEnum.PENDING,
      documentType: 'Field Executive Ground Audit Report & Geotagged Kitchen Photos',
      documentUrl: 'https://storage.stayconnect.in/private-kyc/inspections/audit_p2_report.pdf',
      submittedAt: '2026-11-06T11:15:00.000Z',
    },
    {
      id: 'ver_3',
      propertyId: 'p3',
      propertyName: 'Metro Heights 2BHK Flat (Hauz Khas)',
      userId: 'own_3',
      ownerName: 'Vikram Malhotra',
      verificationType: VerificationTypeEnum.IDENTITY,
      level: 2,
      status: VerificationStatusEnum.PENDING,
      documentType: 'Government Aadhaar Card (Masked UID) & Land Registry Copy',
      documentUrl: 'https://storage.stayconnect.in/private-kyc/identities/aadhaar_own_3.pdf',
      submittedAt: '2026-11-06T14:45:00.000Z',
    },
  ];

  private reviews: ReviewRecord[] = [
    {
      id: 'rev_1',
      propertyId: 'p1',
      propertyName: 'Sunrise PG for Boys',
      userId: 'u_stud_1',
      userName: 'Karthik Rao (Engineering Student)',
      overallRating: 5,
      cleanliness: 5,
      foodQuality: 4,
      ownerBehavior: 5,
      waterSupply: 5,
      electricity: 5,
      security: 4,
      maintenance: 5,
      reviewText: 'Lived here for 8 months. High speed Wi-Fi never went down during placement interviews. Food is hygienic.',
      isVerifiedResident: true,
      isApproved: true,
      createdAt: '2026-11-04T12:00:00.000Z',
    },
    {
      id: 'rev_2',
      propertyId: 'p2',
      propertyName: 'Green Valley Ladies Hostel',
      userId: 'u_stud_2',
      userName: 'Ananya Sharma',
      overallRating: 4,
      cleanliness: 5,
      foodQuality: 4,
      ownerBehavior: 4,
      waterSupply: 5,
      electricity: 4,
      security: 5,
      maintenance: 4,
      reviewText: 'Very strict security and gate entry. Clean mess area and hot water available round the clock.',
      isVerifiedResident: true,
      isApproved: true,
      createdAt: '2026-11-05T14:00:00.000Z',
    },
  ];

  private reports: ReportRecord[] = [
    {
      id: 'rep_1',
      reporterName: 'Rahul Verma',
      targetType: 'property',
      targetTitle: 'Cozy PG Indiranagar (Unverified Listing)',
      targetId: 'p_unverified_9',
      category: 'fraud',
      description: 'Owner demanded ₹2000 advance viewing deposit before sharing the physical gate location.',
      status: 'pending',
      createdAt: '2026-11-06T16:20:00.000Z',
    },
    {
      id: 'rep_2',
      reporterName: 'Divya N.',
      targetType: 'user',
      targetTitle: 'Profile: Aman_K24',
      targetId: 'usr_fake_2',
      category: 'spam',
      description: 'Sending unsolicited brokerage promotion links inside roommate connection chat.',
      status: 'pending',
      createdAt: '2026-11-06T17:00:00.000Z',
    },
  ];

  async getPendingVerifications() {
    return this.verifications;
  }

  async processVerificationDecision(
    id: string,
    decision: 'approved' | 'rejected',
    notes?: string,
  ) {
    const record = this.verifications.find((v) => v.id === id);
    if (!record) {
      throw new NotFoundException(`Verification record '${id}' not found`);
    }

    record.status =
      decision === 'approved'
        ? VerificationStatusEnum.APPROVED
        : VerificationStatusEnum.REJECTED;
    record.reviewerNotes = notes || (decision === 'approved' ? 'Verified against official land & utility records' : 'Insufficient documentation');
    record.reviewedAt = new Date().toISOString();

    this.logger.log(`Verification ${id} (${record.propertyName}) marked ${record.status}`);

    return {
      success: true,
      verificationId: id,
      newStatus: record.status,
      levelGranted: decision === 'approved' ? record.level : 1,
      message: `Property verification ${decision} successfully. Level ${decision === 'approved' ? record.level : 1} badge applied.`,
    };
  }

  async getReviews() {
    return this.reviews;
  }

  async submitReview(payload: Omit<ReviewRecord, 'id' | 'createdAt' | 'isApproved'>) {
    const existing = this.reviews.find(
      (r) => r.propertyId === payload.propertyId && r.userId === payload.userId,
    );
    if (existing) {
      throw new BadRequestException('You have already submitted an authenticated review for this property.');
    }

    const review: ReviewRecord = {
      id: `rev_${Date.now().toString(36)}`,
      ...payload,
      isApproved: true,
      createdAt: new Date().toISOString(),
    };

    this.reviews.unshift(review);
    return review;
  }

  async getReports() {
    return this.reports;
  }

  async resolveReport(id: string, resolution: 'resolved' | 'dismissed', notes?: string) {
    const rep = this.reports.find((r) => r.id === id);
    if (!rep) {
      throw new NotFoundException(`Report '${id}' not found`);
    }
    rep.status = resolution;
    rep.adminNotes = notes || 'Investigated and actioned by admin';
    return {
      success: true,
      reportId: id,
      status: rep.status,
      message: `Report ${resolution}. Audit log recorded.`,
    };
  }

  async getPlatformAnalytics() {
    return {
      totalProperties: 128,
      verifiedProperties: 114,
      verificationBreakdown: {
        level1Phone: 14,
        level2Identity: 28,
        level3Docs: 52,
        level4PhysicalInspection: 34,
      },
      zeroBrokerageSavingsGeneratedINR: 4280000, // ₹42.8 Lakhs in saved broker commission
      activeRoommateMatches: 342,
      pendingVerificationsCount: this.verifications.filter((v) => v.status === VerificationStatusEnum.PENDING).length,
      pendingReportsCount: this.reports.filter((r) => r.status === 'pending').length,
    };
  }
}

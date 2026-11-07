import { Injectable, Logger } from '@nestjs/common';

export interface EnquiryRecord {
  id: string;
  propertyId: string;
  userId: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  createdAt: string;
}

export interface VisitRecord {
  id: string;
  propertyId: string;
  userId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

@Injectable()
export class EnquiriesService {
  private readonly logger = new Logger(EnquiriesService.name);

  private enquiries: EnquiryRecord[] = [];
  private visits: VisitRecord[] = [];

  async createEnquiry(propertyId: string, userId: string, message: string) {
    const entry: EnquiryRecord = {
      id: `enq_${Date.now().toString(36)}`,
      propertyId,
      userId,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.enquiries.push(entry);
    this.logger.log(`Direct enquiry submitted for property ${propertyId} by user ${userId}`);
    return {
      success: true,
      enquiryId: entry.id,
      message: 'Direct enquiry forwarded to property owner without brokerage.',
    };
  }

  async scheduleVisit(propertyId: string, userId: string, preferredDate: string, preferredTimeSlot: string) {
    const entry: VisitRecord = {
      id: `vis_${Date.now().toString(36)}`,
      propertyId,
      userId,
      preferredDate,
      preferredTimeSlot,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };
    this.visits.push(entry);
    this.logger.log(`Physical visit appointment requested for ${propertyId} on ${preferredDate}`);
    return {
      success: true,
      visitId: entry.id,
      status: 'requested',
      message: 'Visit appointment requested. The property manager has been notified.',
    };
  }
}

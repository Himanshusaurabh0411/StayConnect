import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import {
  SearchRoommatesDto,
  CreateRoommateProfileDto,
  SendConnectionRequestDto,
} from './dto/roommates.dto';

export interface RoommateRecord {
  id: string;
  userId: string;
  displayName: string;
  age: number;
  gender: string;
  occupation: 'student' | 'professional' | 'other';
  occupationDetail: string;
  city: string;
  preferredLocalities: string[];
  monthlyBudgetMin: number;
  monthlyBudgetMax: number;
  moveInDate: string;
  preferredFlatType: '1bhk' | '2bhk' | '3bhk' | 'any';
  sharingPreference: 'single' | 'double' | 'triple' | 'any';
  foodPreference: 'veg' | 'nonveg' | 'both';
  smokingPreference: 'no_smoking' | 'smoking_ok' | 'outdoors_only';
  lookingFor?: string;
  lifestyle: {
    earlyRiser: boolean;
    petsFriendly: boolean;
    visitors: 'rarely' | 'occasional' | 'weekends';
  };
  introduction: string;
  isIdVerified: boolean;
  phone: string;
  createdAt: string;
}

export interface ConnectionRequestRecord {
  id: string;
  senderId: string;
  receiverId: string;
  senderProfile: Partial<RoommateRecord>;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

@Injectable()
export class RoommatesService {
  private readonly logger = new Logger(RoommatesService.name);

  private profiles: RoommateRecord[] = [
    {
      id: 'r1',
      userId: 'u1',
      displayName: 'Arjun M.',
      age: 24,
      gender: 'male',
      occupation: 'professional',
      occupationDetail: 'Software Engineer at Fintech Startup',
      city: 'Bangalore',
      preferredLocalities: ['Koramangala', 'HSR Layout', 'Indiranagar'],
      monthlyBudgetMin: 8000,
      monthlyBudgetMax: 15000,
      moveInDate: '2026-11-20T10:00:00.000Z',
      preferredFlatType: '2bhk',
      sharingPreference: 'double',
      foodPreference: 'both',
      smokingPreference: 'no_smoking',
      lookingFor: 'flatmates_to_rent',
      lifestyle: {
        earlyRiser: true,
        petsFriendly: false,
        visitors: 'occasional',
      },
      introduction: 'Looking for a clean and quiet flatmate. I work regular tech hours, keep common spaces tidy, and enjoy weekend road trips.',
      isIdVerified: true,
      phone: '+91 98450 12345',
      createdAt: '2026-11-01T10:00:00.000Z',
    },
    {
      id: 'r2',
      userId: 'u2',
      displayName: 'Priya S.',
      age: 22,
      gender: 'female',
      occupation: 'student',
      occupationDetail: 'MBA Candidate at SJMSOM',
      city: 'Mumbai',
      preferredLocalities: ['Powai', 'Andheri East', 'Bandra'],
      monthlyBudgetMin: 7000,
      monthlyBudgetMax: 12000,
      moveInDate: '2026-12-01T10:00:00.000Z',
      preferredFlatType: '2bhk',
      sharingPreference: 'single',
      foodPreference: 'veg',
      smokingPreference: 'no_smoking',
      lookingFor: 'flatmates_to_rent',
      lifestyle: {
        earlyRiser: false,
        petsFriendly: false,
        visitors: 'rarely',
      },
      introduction: 'Postgrad student looking for a peaceful environment to study. Prefer pure vegetarian kitchen or separate utensils.',
      isIdVerified: true,
      phone: '+91 98200 67890',
      createdAt: '2026-11-03T10:00:00.000Z',
    },
    {
      id: 'r3',
      userId: 'u3',
      displayName: 'Rahul K.',
      age: 26,
      gender: 'male',
      occupation: 'professional',
      occupationDetail: 'Data Analyst at MNC',
      city: 'Hyderabad',
      preferredLocalities: ['Madhapur', 'Gachibowli', 'Kondapur'],
      monthlyBudgetMin: 6000,
      monthlyBudgetMax: 10000,
      moveInDate: '2026-11-15T10:00:00.000Z',
      preferredFlatType: '3bhk',
      sharingPreference: 'single',
      foodPreference: 'nonveg',
      smokingPreference: 'outdoors_only',
      lookingFor: 'roommate_for_my_flat',
      lifestyle: {
        earlyRiser: true,
        petsFriendly: true,
        visitors: 'weekends',
      },
      introduction: 'I have a 3BHK lease in Madhapur with one vacant master bedroom. Fully loaded modular kitchen, high-speed fiber internet.',
      isIdVerified: true,
      phone: '+91 94400 54321',
      createdAt: '2026-11-04T10:00:00.000Z',
    },
    {
      id: 'r4',
      userId: 'u4',
      displayName: 'Sneha R.',
      age: 23,
      gender: 'female',
      occupation: 'professional',
      occupationDetail: 'UI/UX Designer',
      city: 'Bangalore',
      preferredLocalities: ['Indiranagar', 'Domlur', 'Whitefield'],
      monthlyBudgetMin: 10000,
      monthlyBudgetMax: 16000,
      moveInDate: '2026-11-25T10:00:00.000Z',
      preferredFlatType: '2bhk',
      sharingPreference: 'single',
      foodPreference: 'veg',
      smokingPreference: 'no_smoking',
      lookingFor: 'flatmates_to_rent',
      lifestyle: {
        earlyRiser: false,
        petsFriendly: true,
        visitors: 'occasional',
      },
      introduction: 'Design consultant working hybrid. Love interior decor and keeping plants. Looking for like-minded working girls.',
      isIdVerified: true,
      phone: '+91 97400 88990',
      createdAt: '2026-11-05T10:00:00.000Z',
    },
  ];

  private connectionRequests: ConnectionRequestRecord[] = [
    {
      id: 'req_demo_1',
      senderId: 'u4',
      receiverId: 'usr_current',
      senderProfile: {
        id: 'r4',
        displayName: 'Sneha R.',
        city: 'Bangalore',
        occupationDetail: 'UI/UX Designer',
        monthlyBudgetMin: 10000,
        monthlyBudgetMax: 16000,
        foodPreference: 'veg',
      },
      message: 'Hi! Saw that you are looking for a flatmate in Bangalore. My office is in Domlur, would love to connect!',
      status: 'pending',
      createdAt: '2026-11-06T14:30:00.000Z',
    },
  ];

  private mutualConnections: Array<{
    user1Id: string;
    user2Id: string;
    connectedAt: string;
  }> = [];

  private messages: MessageRecord[] = [
    {
      id: 'msg_1',
      conversationId: 'conv_u1_usr_current',
      senderId: 'u1',
      content: 'Hey! Are you still looking to rent a 2BHK around Koramangala?',
      createdAt: '2026-11-06T18:00:00.000Z',
    },
  ];

  /**
   * Roommate Compatibility Algorithm:
   * Location Overlap (30%) + Budget Match (25%) + Habits/Lifestyle (25%) + Move-in Proximity (20%)
   */
  calculateCompatibility(userProfile: Partial<RoommateRecord>, candidate: RoommateRecord) {
    let score = 50; // Baseline compatibility
    const reasons: string[] = [];

    // 1. City / Locality match (30 points)
    if (userProfile.city && userProfile.city.toLowerCase() === candidate.city.toLowerCase()) {
      score += 15;
      reasons.push(`Same target city: ${candidate.city}`);
      const sharedLocality = userProfile.preferredLocalities?.some((loc) =>
        candidate.preferredLocalities.includes(loc),
      );
      if (sharedLocality) {
        score += 15;
        reasons.push('Overlapping locality preferences');
      }
    }

    // 2. Budget compatibility (25 points)
    if (userProfile.monthlyBudgetMax && candidate.monthlyBudgetMin) {
      const budgetOverlap =
        userProfile.monthlyBudgetMax >= candidate.monthlyBudgetMin &&
        (userProfile.monthlyBudgetMin || 0) <= candidate.monthlyBudgetMax;
      if (budgetOverlap) {
        score += 20;
        reasons.push('Compatible monthly budget range');
      }
    }

    // 3. Food & Smoking compatibility (25 points)
    if (userProfile.smokingPreference === candidate.smokingPreference) {
      score += 10;
      reasons.push(`Matching smoking preference (${candidate.smokingPreference.replace('_', ' ')})`);
    }
    if (userProfile.foodPreference === candidate.foodPreference || candidate.foodPreference === 'both') {
      score += 10;
      reasons.push(`Compatible food preference (${candidate.foodPreference})`);
    }

    const finalScore = Math.min(Math.max(score, 45), 98);
    return {
      score: finalScore,
      reasons: reasons.length > 0 ? reasons : ['General demographic & schedule match'],
      disclaimer: 'Compatibility score is calculated algorithmically from declared preferences and does not guarantee personal safety or compatibility.',
    };
  }

  async search(dto: SearchRoommatesDto, currentUserId?: string) {
    const { city, lookingFor, maxBudget, foodPreference } = dto;

    const list = this.profiles
      .filter((rm) => {
        if (currentUserId && rm.userId === currentUserId) return false;
        if (city && city.toLowerCase() !== 'all' && rm.city.toLowerCase() !== city.toLowerCase()) {
          return false;
        }
        if (lookingFor && rm.lookingFor !== lookingFor) {
          return false;
        }
        if (maxBudget && rm.monthlyBudgetMin > maxBudget) {
          return false;
        }
        if (foodPreference && rm.foodPreference !== foodPreference && rm.foodPreference !== 'both') {
          return false;
        }
        return true;
      })
      .map((candidate) => {
        const isConnected = this.isMutuallyConnected(currentUserId || '', candidate.userId);
        const matchInfo = this.calculateCompatibility(
          { city: city || 'Bangalore', monthlyBudgetMin: 8000, monthlyBudgetMax: 15000, foodPreference: 'both' },
          candidate,
        );

        return {
          id: candidate.id,
          userId: candidate.userId,
          displayName: candidate.displayName,
          age: candidate.age,
          gender: candidate.gender,
          occupation: candidate.occupation,
          occupationDetail: candidate.occupationDetail,
          city: candidate.city,
          preferredLocalities: candidate.preferredLocalities,
          monthlyBudgetMin: candidate.monthlyBudgetMin,
          monthlyBudgetMax: candidate.monthlyBudgetMax,
          moveInDate: candidate.moveInDate,
          preferredFlatType: candidate.preferredFlatType,
          sharingPreference: candidate.sharingPreference,
          foodPreference: candidate.foodPreference,
          smokingPreference: candidate.smokingPreference,
          lifestyle: candidate.lifestyle,
          introduction: candidate.introduction,
          isIdVerified: candidate.isIdVerified,
          // Privacy Protection: Phone hidden unless mutually connected
          phone: isConnected ? candidate.phone : null,
          isPhoneMasked: !isConnected,
          compatibility: matchInfo,
        };
      });

    return {
      data: list,
      meta: {
        total: list.length,
      },
    };
  }

  async findById(id: string, currentUserId?: string) {
    const candidate = this.profiles.find((p) => p.id === id);
    if (!candidate) {
      throw new NotFoundException(`Roommate profile '${id}' not found`);
    }

    const isConnected = this.isMutuallyConnected(currentUserId || '', candidate.userId);
    const matchInfo = this.calculateCompatibility(
      { city: candidate.city, monthlyBudgetMin: candidate.monthlyBudgetMin, monthlyBudgetMax: candidate.monthlyBudgetMax },
      candidate,
    );

    return {
      ...candidate,
      phone: isConnected ? candidate.phone : null,
      isPhoneMasked: !isConnected,
      compatibility: matchInfo,
    };
  }

  async sendConnectionRequest(targetRoommateId: string, senderId: string, dto: SendConnectionRequestDto) {
    const target = this.profiles.find((p) => p.id === targetRoommateId);
    if (!target) {
      throw new NotFoundException('Target roommate profile not found');
    }
    if (target.userId === senderId) {
      throw new BadRequestException('You cannot send a connection request to yourself.');
    }

    const existing = this.connectionRequests.find(
      (r) => r.senderId === senderId && r.receiverId === target.userId,
    );
    if (existing) {
      return {
        success: true,
        requestId: existing.id,
        status: existing.status,
        message: 'Connection request is already pending.',
      };
    }

    const senderProfile = this.profiles.find((p) => p.userId === senderId) || {
      id: 'r_sender',
      displayName: 'Prospective Flatmate',
      city: target.city,
      occupationDetail: 'Verified Tenant',
    };

    const req: ConnectionRequestRecord = {
      id: `req_${Date.now().toString(36)}`,
      senderId,
      receiverId: target.userId,
      senderProfile,
      message: dto.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.connectionRequests.push(req);
    this.logger.log(`Connection request sent from ${senderId} to ${target.userId}`);

    return {
      success: true,
      requestId: req.id,
      status: 'pending',
      message: 'Connection request sent successfully. Phone numbers unlock upon mutual acceptance.',
    };
  }

  async respondToRequest(requestId: string, currentUserId: string, action: 'accept' | 'reject') {
    const req = this.connectionRequests.find((r) => r.id === requestId);
    if (!req) {
      throw new NotFoundException('Connection request not found.');
    }

    req.status = action === 'accept' ? 'accepted' : 'rejected';

    if (action === 'accept') {
      const [u1, u2] = [req.senderId, currentUserId].sort();
      this.mutualConnections.push({
        user1Id: u1,
        user2Id: u2,
        connectedAt: new Date().toISOString(),
      });
      this.logger.log(`Mutual connection established between ${u1} and ${u2}`);

      // Lookup target phone
      const senderRecord = this.profiles.find((p) => p.userId === req.senderId);

      return {
        success: true,
        status: 'accepted',
        message: 'Request accepted! Mutual connection established. You can now chat and call.',
        unlockedPhone: senderRecord?.phone || '+91 98450 12345',
      };
    }

    return {
      success: true,
      status: 'rejected',
      message: 'Connection request declined.',
    };
  }

  async getDashboard(currentUserId: string) {
    const myProfile = this.profiles.find((p) => p.userId === currentUserId) || this.profiles[0];

    const incoming = this.connectionRequests.filter(
      (r) => r.receiverId === currentUserId || r.receiverId === 'usr_current',
    );

    const sent = this.connectionRequests.filter(
      (r) => r.senderId === currentUserId,
    );

    const connectedUsers = this.mutualConnections
      .filter((c) => c.user1Id === currentUserId || c.user2Id === currentUserId)
      .map((c) => {
        const partnerId = c.user1Id === currentUserId ? c.user2Id : c.user1Id;
        return this.profiles.find((p) => p.userId === partnerId);
      })
      .filter(Boolean);

    return {
      myProfile,
      incomingRequests: incoming,
      sentRequests: sent,
      connectedRoommates: connectedUsers,
      totalConnected: connectedUsers.length,
    };
  }

  async getMessages(conversationId: string) {
    return this.messages.filter((m) => m.conversationId === conversationId || conversationId.includes('conv_'));
  }

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const msg: MessageRecord = {
      id: `msg_${Date.now().toString(36)}`,
      conversationId,
      senderId,
      content,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(msg);
    return msg;
  }

  async reportUser(reportedUserId: string, reporterId: string, reason: string) {
    this.logger.warn(`User report logged: ${reporterId} reported ${reportedUserId} for: ${reason}`);
    return {
      success: true,
      message: 'Report submitted to StayConnect Safety Moderation Team. Thank you for keeping the community safe.',
    };
  }

  private isMutuallyConnected(userA: string, userB: string): boolean {
    if (!userA || !userB) return false;
    const [u1, u2] = [userA, userB].sort();
    return this.mutualConnections.some((c) => c.user1Id === u1 && c.user2Id === u2);
  }
}

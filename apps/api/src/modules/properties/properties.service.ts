import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { SearchPropertiesDto, CreatePropertyDto } from './dto/properties.dto';

export interface PropertyRecord {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  monthlyRentMin: number;
  monthlyRentMax: number;
  securityDeposit: number;
  securityDepositRefundable: boolean;
  electricityEstimate: number;
  waterCharges: number;
  maintenanceCharges: number;
  genderPreference: string;
  furnishingStatus: string;
  isVerified: boolean;
  verificationLevel: number;
  averageRating: number;
  reviewCount: number;
  totalBeds: number;
  availableBeds: number;
  amenities: string[];
  hasFood: boolean;
  foodPlan?: {
    isAvailable: boolean;
    type: 'veg' | 'both';
    monthlyCost: number;
    breakfastTiming: string;
    lunchTiming: string;
    dinnerTiming: string;
    menu: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
    };
  };
  createdAt: string;
}

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);

  // In-memory catalog seeded with initial data (backed by PostgreSQL in full environment)
  private properties: PropertyRecord[] = [
    {
      id: 'p1',
      ownerId: 'own_1',
      name: 'Sunrise PG for Boys',
      slug: 'sunrise-pg-boys-koramangala',
      type: 'pg',
      description: 'Well-maintained PG with spacious double rooms, study tables, and 3-time hot meals. 10 mins walk to Sony World Junction.',
      locality: 'Koramangala 4th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      monthlyRentMin: 7000,
      monthlyRentMax: 12000,
      securityDeposit: 15000,
      securityDepositRefundable: true,
      electricityEstimate: 600,
      waterCharges: 0,
      maintenanceCharges: 350,
      genderPreference: 'male',
      furnishingStatus: 'furnished',
      isVerified: true,
      verificationLevel: 3,
      averageRating: 4.2,
      reviewCount: 18,
      totalBeds: 30,
      availableBeds: 8,
      amenities: ['Wi-Fi', 'AC', 'Food', 'Laundry', 'Power Backup', 'RO Water'],
      hasFood: true,
      foodPlan: {
        isAvailable: true,
        type: 'both',
        monthlyCost: 2200,
        breakfastTiming: '7:30 AM – 10:00 AM',
        lunchTiming: '12:30 PM – 2:30 PM',
        dinnerTiming: '7:45 PM – 10:15 PM',
        menu: {
          breakfast: ['Poha', 'Idli-Vada', 'Aloo Paratha', 'Chai/Coffee'],
          lunch: ['Dal Makhani', 'Rice', 'Phulka', 'Salad', 'Curd'],
          dinner: ['Paneer Butter Masala', 'Jeera Rice', 'Roti', 'Kheer (Sundays)'],
        },
      },
      createdAt: '2026-11-02T10:00:00.000Z',
    },
    {
      id: 'p2',
      ownerId: 'own_2',
      name: 'Green Valley Ladies Hostel',
      slug: 'green-valley-ladies-hostel-andheri',
      type: 'hostel',
      description: 'Safe and secure ladies hostel with biometric entry, 24/7 CCTV, and in-house warden. Close to Andheri Metro.',
      locality: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      monthlyRentMin: 8500,
      monthlyRentMax: 15000,
      securityDeposit: 20000,
      securityDepositRefundable: true,
      electricityEstimate: 500,
      waterCharges: 0,
      maintenanceCharges: 400,
      genderPreference: 'female',
      furnishingStatus: 'furnished',
      isVerified: true,
      verificationLevel: 4,
      averageRating: 4.5,
      reviewCount: 32,
      totalBeds: 40,
      availableBeds: 5,
      amenities: ['Wi-Fi', 'AC', 'Food', 'Laundry', 'CCTV', 'Power Backup', 'Study Hall'],
      hasFood: true,
      foodPlan: {
        isAvailable: true,
        type: 'veg',
        monthlyCost: 2500,
        breakfastTiming: '7:00 AM – 9:30 AM',
        lunchTiming: '12:00 PM – 2:00 PM',
        dinnerTiming: '7:30 PM – 10:00 PM',
        menu: {
          breakfast: ['Upma', 'Dosa', 'Methi Thepla', 'Milk/Tea'],
          lunch: ['Gujarati/North Indian Thali', 'Rice', 'Kadhi', 'Sabzi'],
          dinner: ['Khichdi-Kadhi', 'Veg Biryani', 'Raita', 'Gulab Jamun'],
        },
      },
      createdAt: '2026-11-05T10:00:00.000Z',
    },
    {
      id: 'p3',
      ownerId: 'own_3',
      name: 'Metro Heights 2BHK Flat',
      slug: 'metro-heights-2bhk-hauz-khas',
      type: 'flat',
      description: 'Sunlit 2BHK flat available directly from landlord. Modular kitchen, dedicated parking slot, gated society.',
      locality: 'Hauz Khas',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110016',
      monthlyRentMin: 22000,
      monthlyRentMax: 22000,
      securityDeposit: 50000,
      securityDepositRefundable: true,
      electricityEstimate: 1200,
      waterCharges: 200,
      maintenanceCharges: 800,
      genderPreference: 'any',
      furnishingStatus: 'semi_furnished',
      isVerified: true,
      verificationLevel: 2,
      averageRating: 4.0,
      reviewCount: 7,
      totalBeds: 2,
      availableBeds: 2,
      amenities: ['Wi-Fi', 'Parking', 'Power Backup', 'Lift', 'Balcony'],
      hasFood: false,
      createdAt: '2026-11-06T10:00:00.000Z',
    },
  ];

  async search(dto: SearchPropertiesDto) {
    const {
      city,
      locality,
      type,
      gender,
      minRent,
      maxRent,
      verifiedOnly,
      foodIncluded,
      sortBy = 'rent_low',
      page = 1,
      limit = 20,
    } = dto;

    let results = this.properties.filter((prop) => {
      if (city && city.toLowerCase() !== 'all' && prop.city.toLowerCase() !== city.toLowerCase()) {
        return false;
      }
      if (locality && !prop.locality.toLowerCase().includes(locality.toLowerCase())) {
        return false;
      }
      if (type && prop.type !== type) {
        return false;
      }
      if (gender && gender !== 'any' && prop.genderPreference !== gender && prop.genderPreference !== 'any') {
        return false;
      }
      if (minRent && prop.monthlyRentMin < minRent) {
        return false;
      }
      if (maxRent && prop.monthlyRentMin > maxRent) {
        return false;
      }
      if (verifiedOnly && !prop.isVerified) {
        return false;
      }
      if (foodIncluded && !prop.hasFood) {
        return false;
      }
      return true;
    });

    // Sorting
    results = results.sort((a, b) => {
      if (sortBy === 'rent_low') return a.monthlyRentMin - b.monthlyRentMin;
      if (sortBy === 'rent_high') return b.monthlyRentMin - a.monthlyRentMin;
      if (sortBy === 'best_rated') return b.averageRating - a.averageRating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginatedData = results.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      meta: {
        total,
        page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findBySlugOrId(slugOrId: string) {
    const prop = this.properties.find(
      (p) => p.slug === slugOrId || p.id === slugOrId,
    );
    if (!prop) {
      throw new NotFoundException(`Property with identifier '${slugOrId}' not found.`);
    }
    return prop;
  }

  async create(dto: CreatePropertyDto, ownerId: string) {
    const slug = dto.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-') + '-' + Date.now().toString(36);

    const newProperty: PropertyRecord = {
      id: `prop_${Date.now().toString(36)}`,
      ownerId,
      name: dto.name,
      slug,
      type: dto.type,
      description: dto.description,
      locality: dto.locality,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
      monthlyRentMin: dto.monthlyRentMin,
      monthlyRentMax: dto.monthlyRentMax,
      securityDeposit: dto.securityDeposit,
      securityDepositRefundable: true,
      electricityEstimate: 600,
      waterCharges: 0,
      maintenanceCharges: 300,
      genderPreference: dto.genderPreference,
      furnishingStatus: dto.furnishingStatus,
      isVerified: false, // Verification pipeline begins at Level 1 (Phone)
      verificationLevel: 1,
      averageRating: 0,
      reviewCount: 0,
      totalBeds: dto.totalBeds,
      availableBeds: dto.availableBeds,
      amenities: dto.amenities,
      hasFood: dto.hasFood,
      createdAt: new Date().toISOString(),
    };

    this.properties.unshift(newProperty);
    this.logger.log(`New property published: ${newProperty.name} (${newProperty.id}) by owner ${ownerId}`);

    return newProperty;
  }

  async getTrueCostCalculation(id: string) {
    const prop = await this.findBySlugOrId(id);

    const electricity = prop.electricityEstimate;
    const food = prop.hasFood && prop.foodPlan ? prop.foodPlan.monthlyCost : 0;
    const maintenance = prop.maintenanceCharges;
    const water = prop.waterCharges;

    const totalEstimatedMonthly =
      prop.monthlyRentMin + electricity + food + maintenance + water;

    return {
      propertyId: prop.id,
      propertyName: prop.name,
      monthlyRecurring: {
        rent: prop.monthlyRentMin,
        electricityEstimate: electricity,
        foodCharges: food,
        maintenanceCharges: maintenance,
        waterCharges: water,
        totalRecurring: totalEstimatedMonthly,
      },
      oneTimeOutflow: {
        securityDeposit: prop.securityDeposit,
        isDepositRefundable: prop.securityDepositRefundable,
        mandatoryBrokerage: 0, // StayConnect principle: ZERO BROKERAGE
        registrationCharges: 0,
      },
      transparencyNote:
        'All recurring expenses are itemized upfront. StayConnect does not charge any tenant commission or brokerage.',
    };
  }
}

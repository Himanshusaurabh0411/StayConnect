/**
 * Frontend-specific type definitions
 * 
 * Re-exports shared types and adds frontend-only types.
 * In production, shared types will come from @stayconnect/shared package.
 * For now, we define them locally for the frontend.
 */

// Re-export everything from shared types
// In production: export * from "@stayconnect/shared/types";

export type UserRole = "student" | "owner" | "manager" | "admin";

export type PropertyType =
  | "pg"
  | "hostel"
  | "shared_room"
  | "single_room"
  | "flat"
  | "apartment"
  | "independent_house"
  | "coliving"
  | "private_rental";

export type GenderPreference = "male" | "female" | "any";
export type RoomType = "single" | "double" | "triple" | "dormitory";
export type FurnishingStatus = "furnished" | "semi_furnished" | "unfurnished";
export type FoodType = "veg" | "nonveg" | "both";
export type ChargeType = "included" | "metered" | "fixed";
export type Occupation = "student" | "professional" | "other";
export type RoommateLookingFor = "flatmates_to_rent" | "roommate_for_my_flat" | "room_in_shared_flat";
export type FlatType = "1bhk" | "2bhk" | "3bhk" | "any";
export type SharingPreference = "single" | "double" | "triple" | "any";
export type SmokingPreference = "no_smoking" | "smoking_ok" | "outdoors_only";
export type ProfileVisibility = "public" | "connections_only" | "hidden";
export type VerificationLevel = 1 | 2 | 3 | 4;

export interface PropertyCardData {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  locality: string;
  city: string;
  monthlyRentMin: number;
  monthlyRentMax: number;
  securityDeposit: number;
  genderPreference: GenderPreference;
  furnishingStatus: FurnishingStatus;
  roomTypes: RoomType[];
  availableBeds: number;
  totalBeds: number;
  isVerified: boolean;
  verificationLevel: VerificationLevel;
  averageRating: number | null;
  reviewCount: number;
  primaryImageUrl: string | null;
  amenities: string[];
  hasFood: boolean;
  distance?: number;
  isFavourited?: boolean;
  createdAt: string;
}

export interface RoommateProfile {
  id: string;
  userId: string;
  isActive: boolean;
  lookingFor: RoommateLookingFor;
  displayName: string;
  age: number | null;
  gender: string | null;
  occupation: Occupation;
  occupationDetail: string | null;
  city: string;
  preferredLocalities: string[];
  monthlyBudgetMin: number;
  monthlyBudgetMax: number;
  moveInDate: string | null;
  preferredFlatType: FlatType;
  sharingPreference: SharingPreference;
  foodPreference: FoodType;
  smokingPreference: SmokingPreference;
  lifestyle: Record<string, unknown> | null;
  introduction: string | null;
  profileVisibility: ProfileVisibility;
  avatarUrl?: string | null;
}

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
}

export interface TrueCostBreakdown {
  monthlyRecurring: {
    rent: number;
    electricity: number | null;
    water: number | null;
    maintenance: number | null;
    food: number | null;
    other: number | null;
    total: number;
  };
  oneTime: {
    securityDeposit: number;
    isSecurityDepositRefundable: boolean;
    otherOneTimeCharges: number | null;
    total: number;
  };
  optional: {
    items: Array<{ name: string; amount: number }>;
    total: number;
  };
  totalEstimatedMonthly: number;
  disclaimer: string;
}

/**
 * StayConnect Shared Types
 * Used across frontend, backend, and mobile applications.
 * 
 * NOTE: This file defines the core domain types for the StayConnect platform.
 */

// ============================================================
// Enums
// ============================================================

export enum UserRole {
  STUDENT = 'student',
  OWNER = 'owner',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export enum PropertyType {
  PG = 'pg',
  HOSTEL = 'hostel',
  SHARED_ROOM = 'shared_room',
  SINGLE_ROOM = 'single_room',
  FLAT = 'flat',
  APARTMENT = 'apartment',
  INDEPENDENT_HOUSE = 'independent_house',
  COLIVING = 'coliving',
  PRIVATE_RENTAL = 'private_rental',
}

export enum GenderPreference {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any',
}

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  DORMITORY = 'dormitory',
}

export enum FurnishingStatus {
  FURNISHED = 'furnished',
  SEMI_FURNISHED = 'semi_furnished',
  UNFURNISHED = 'unfurnished',
}

export enum FoodType {
  VEG = 'veg',
  NONVEG = 'nonveg',
  BOTH = 'both',
}

export enum ChargeType {
  INCLUDED = 'included',
  METERED = 'metered',
  FIXED = 'fixed',
}

export enum VerificationLevel {
  PHONE = 1,
  IDENTITY = 2,
  PROPERTY_DOCS = 3,
  PHYSICAL_INSPECTION = 4,
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum EnquiryType {
  GENERAL = 'general',
  VISIT_REQUEST = 'visit_request',
  AVAILABILITY = 'availability',
  PRICING = 'pricing',
}

export enum EnquiryStatus {
  NEW = 'new',
  RESPONDED = 'responded',
  CLOSED = 'closed',
}

export enum VisitStatus {
  REQUESTED = 'requested',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum RoommateLookingFor {
  FLATMATES_TO_RENT = 'flatmates_to_rent',
  ROOMMATE_FOR_MY_FLAT = 'roommate_for_my_flat',
  ROOM_IN_SHARED_FLAT = 'room_in_shared_flat',
}

export enum FlatType {
  ONE_BHK = '1bhk',
  TWO_BHK = '2bhk',
  THREE_BHK = '3bhk',
  ANY = 'any',
}

export enum SharingPreference {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  ANY = 'any',
}

export enum SmokingPreference {
  NO_SMOKING = 'no_smoking',
  SMOKING_OK = 'smoking_ok',
  OUTDOORS_ONLY = 'outdoors_only',
}

export enum Occupation {
  STUDENT = 'student',
  PROFESSIONAL = 'professional',
  OTHER = 'other',
}

export enum ProfileVisibility {
  PUBLIC = 'public',
  CONNECTIONS_ONLY = 'connections_only',
  HIDDEN = 'hidden',
}

export enum RoommateRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum AmenityCategory {
  BASIC = 'basic',
  SAFETY = 'safety',
  COMFORT = 'comfort',
  ENTERTAINMENT = 'entertainment',
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
}

export enum MediaType {
  PHOTO = 'photo',
  VIDEO = 'video',
  VIRTUAL_TOUR = 'virtual_tour',
}

export enum ReportType {
  SPAM = 'spam',
  INAPPROPRIATE = 'inappropriate',
  FRAUD = 'fraud',
  SAFETY = 'safety',
  OTHER = 'other',
}

export enum ReportStatus {
  PENDING = 'pending',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

// ============================================================
// Core Interfaces
// ============================================================

export interface User {
  id: string;
  email: string | null;
  phone: string;
  role: UserRole;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  occupation: Occupation;
  collegeName: string | null;
  workplaceName: string | null;
  city: string | null;
  state: string | null;
  bio: string | null;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  type: PropertyType;
  description: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  locality: string;
  latitude: number;
  longitude: number;
  genderPreference: GenderPreference;
  furnishingStatus: FurnishingStatus;
  isVerified: boolean;
  verificationLevel: VerificationLevel;
  isActive: boolean;
  isOccupied: boolean;
  isPaused: boolean;
  totalBeds: number;
  availableBeds: number;
  createdAt: string;
  updatedAt: string;
}

export interface PricingDetails {
  id: string;
  propertyId: string;
  monthlyRentMin: number;
  monthlyRentMax: number;
  securityDeposit: number;
  securityDepositRefundable: boolean;
  electricityChargesType: ChargeType;
  electricityChargesAmount: number | null;
  waterChargesType: ChargeType;
  waterChargesAmount: number | null;
  maintenanceCharges: number | null;
  foodCharges: number | null;
  otherCharges: number | null;
  otherChargesDescription: string | null;
  isNegotiable: boolean;
}

export interface FoodPlan {
  id: string;
  propertyId: string;
  isFoodAvailable: boolean;
  foodType: FoodType;
  breakfastIncluded: boolean;
  lunchIncluded: boolean;
  dinnerIncluded: boolean;
  breakfastTiming: string | null;
  lunchTiming: string | null;
  dinnerTiming: string | null;
  monthlyFoodCharge: number | null;
  weeklyMenu: Record<string, string[]> | null;
  messRating: number | null;
}

export interface Room {
  id: string;
  propertyId: string;
  unitId: string | null;
  roomName: string;
  roomType: RoomType;
  totalBeds: number;
  availableBeds: number;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  overallRating: number;
  cleanlinessRating: number | null;
  foodRating: number | null;
  ownerRating: number | null;
  waterRating: number | null;
  electricityRating: number | null;
  securityRating: number | null;
  maintenanceRating: number | null;
  reviewText: string | null;
  isVerifiedResident: boolean;
  isApproved: boolean;
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

// ============================================================
// API Response Types
// ============================================================

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// ============================================================
// Search & Filter Types
// ============================================================

export interface PropertySearchFilters {
  city?: string;
  state?: string;
  locality?: string;
  pincode?: string;
  type?: PropertyType[];
  genderPreference?: GenderPreference;
  furnishingStatus?: FurnishingStatus[];
  roomType?: RoomType[];
  budgetMin?: number;
  budgetMax?: number;
  depositMax?: number;
  hasFood?: boolean;
  foodType?: FoodType;
  hasWifi?: boolean;
  hasAC?: boolean;
  hasAttachedBathroom?: boolean;
  hasLaundry?: boolean;
  hasParking?: boolean;
  hasPowerBackup?: boolean;
  isVerified?: boolean;
  isAvailable?: boolean;
  moveInDate?: string;
  distanceKm?: number;
  latitude?: number;
  longitude?: number;
  nearCollege?: string;
  nearWorkplace?: string;
}

export interface PropertySortOption {
  field: 'rent_low' | 'rent_high' | 'recently_added' | 'nearest' | 'best_rated';
  label: string;
}

export interface RoommateSearchFilters {
  city?: string;
  locality?: string[];
  lookingFor?: RoommateLookingFor;
  budgetMin?: number;
  budgetMax?: number;
  gender?: string;
  occupation?: Occupation;
  foodPreference?: FoodType;
  smokingPreference?: SmokingPreference;
  sharingPreference?: SharingPreference;
  moveInBefore?: string;
}

// ============================================================
// Property Card (Frontend Display)
// ============================================================

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

// ============================================================
// True Cost Calculator
// ============================================================

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

-- ============================================================
-- StayConnect Database Migration: 001_initial_schema.sql
-- PostgreSQL 16+ with PostGIS Spatial Extension
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'student',
    is_phone_verified BOOLEAN DEFAULT false,
    is_email_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT NULL,
    gender VARCHAR(20) NULL,
    date_of_birth DATE NULL,
    occupation VARCHAR(50) NOT NULL DEFAULT 'student',
    college_name VARCHAR(200) NULL,
    workplace_name VARCHAR(200) NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    bio TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. OWNER PROFILES
CREATE TABLE IF NOT EXISTS owner_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(150) NULL,
    owner_type VARCHAR(32) NOT NULL DEFAULT 'owner',
    id_verification_status VARCHAR(32) DEFAULT 'pending',
    num_properties INT DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CITIES
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    image_url TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. LOCALITIES
CREATE TABLE IF NOT EXISTS localities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(9,6) NULL,
    longitude DECIMAL(9,6) NULL,
    location GEOGRAPHY(Point, 4326) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. PROPERTIES
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    locality VARCHAR(150) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    gender_preference VARCHAR(20) NOT NULL DEFAULT 'any',
    furnishing_status VARCHAR(30) NOT NULL DEFAULT 'furnished',
    is_verified BOOLEAN DEFAULT false,
    verification_level SMALLINT DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    is_occupied BOOLEAN DEFAULT false,
    is_paused BOOLEAN DEFAULT false,
    total_beds INT DEFAULT 0,
    available_beds INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. PROPERTY UNITS
CREATE TABLE IF NOT EXISTS property_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    unit_name VARCHAR(100) NOT NULL,
    floor INT DEFAULT 0,
    unit_type VARCHAR(50) NULL,
    total_rooms INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. ROOMS
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    unit_id UUID NULL REFERENCES property_units(id) ON DELETE SET NULL,
    room_name VARCHAR(100) NOT NULL,
    room_type VARCHAR(30) NOT NULL,
    total_beds INT NOT NULL DEFAULT 1,
    available_beds INT NOT NULL DEFAULT 1,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. BEDS
CREATE TABLE IF NOT EXISTS beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    bed_identifier VARCHAR(50) NOT NULL,
    is_occupied BOOLEAN DEFAULT false,
    occupant_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    is_available BOOLEAN DEFAULT true,
    monthly_rent DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. PROPERTY MEDIA
CREATE TABLE IF NOT EXISTS property_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT NULL,
    caption VARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. AMENITIES
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. PROPERTY AMENITIES
CREATE TABLE IF NOT EXISTS property_amenities (
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    notes VARCHAR(200) NULL,
    PRIMARY KEY (property_id, amenity_id)
);

-- 13. PRICING DETAILS
CREATE TABLE IF NOT EXISTS pricing_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID UNIQUE NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    monthly_rent_min DECIMAL(12,2) NOT NULL,
    monthly_rent_max DECIMAL(12,2) NOT NULL,
    security_deposit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    security_deposit_refundable BOOLEAN NOT NULL DEFAULT true,
    electricity_charges_type VARCHAR(30) NOT NULL DEFAULT 'metered',
    electricity_charges_amount DECIMAL(12,2) NULL,
    water_charges_type VARCHAR(30) NOT NULL DEFAULT 'included',
    water_charges_amount DECIMAL(12,2) NULL,
    maintenance_charges DECIMAL(12,2) DEFAULT 0.00,
    food_charges DECIMAL(12,2) DEFAULT 0.00,
    other_charges DECIMAL(12,2) DEFAULT 0.00,
    other_charges_description TEXT NULL,
    is_negotiable BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. FOOD PLANS
CREATE TABLE IF NOT EXISTS food_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID UNIQUE NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    is_food_available BOOLEAN DEFAULT false,
    food_type VARCHAR(20) NOT NULL DEFAULT 'veg',
    breakfast_included BOOLEAN DEFAULT false,
    lunch_included BOOLEAN DEFAULT false,
    dinner_included BOOLEAN DEFAULT false,
    breakfast_timing VARCHAR(50) NULL,
    lunch_timing VARCHAR(50) NULL,
    dinner_timing VARCHAR(50) NULL,
    monthly_food_charge DECIMAL(12,2) DEFAULT 0.00,
    weekly_menu JSONB NULL,
    food_photos TEXT[] NULL,
    mess_rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. AVAILABILITY
CREATE TABLE IF NOT EXISTS availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    room_id UUID NULL REFERENCES rooms(id) ON DELETE CASCADE,
    available_from DATE NOT NULL,
    minimum_stay_months INT DEFAULT 1,
    maximum_stay_months INT NULL,
    instant_booking BOOLEAN DEFAULT false,
    notice_period_days INT DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. ROOMMATE PROFILES
CREATE TABLE IF NOT EXISTS roommate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    looking_for VARCHAR(50) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    age INT NULL,
    gender VARCHAR(20) NULL,
    occupation VARCHAR(50) NOT NULL,
    occupation_detail VARCHAR(150) NULL,
    city VARCHAR(100) NOT NULL,
    preferred_localities TEXT[] NOT NULL DEFAULT '{}',
    monthly_budget_min DECIMAL(12,2) NOT NULL,
    monthly_budget_max DECIMAL(12,2) NOT NULL,
    move_in_date DATE NULL,
    preferred_flat_type VARCHAR(30) DEFAULT 'any',
    sharing_preference VARCHAR(30) DEFAULT 'single',
    food_preference VARCHAR(20) DEFAULT 'veg',
    smoking_preference VARCHAR(30) DEFAULT 'no_smoking',
    lifestyle JSONB NULL,
    introduction TEXT NULL,
    profile_visibility VARCHAR(30) DEFAULT 'public',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. ROOMMATE REQUESTS
CREATE TABLE IF NOT EXISTS roommate_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',
    message TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. ROOMMATE CONNECTIONS
CREATE TABLE IF NOT EXISTS roommate_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    connected_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT chk_ordered_pair CHECK (user1_id < user2_id),
    UNIQUE (user1_id, user2_id)
);

-- 19. CONVERSATIONS
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(30) NOT NULL,
    participant1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    participant2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NULL REFERENCES properties(id) ON DELETE SET NULL,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 21. ENQUIRIES
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    enquiry_type VARCHAR(30) DEFAULT 'general',
    status VARCHAR(20) DEFAULT 'new',
    response TEXT NULL,
    responded_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 22. PROPERTY VISITS
CREATE TABLE IF NOT EXISTS property_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'requested',
    owner_notes TEXT NULL,
    user_notes TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 23. FAVOURITES
CREATE TABLE IF NOT EXISTS favourites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, property_id)
);

-- 24. REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_rating SMALLINT NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    cleanliness_rating SMALLINT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
    food_rating SMALLINT NULL CHECK (food_rating BETWEEN 1 AND 5),
    owner_rating SMALLINT NULL CHECK (owner_rating BETWEEN 1 AND 5),
    water_rating SMALLINT NULL CHECK (water_rating BETWEEN 1 AND 5),
    electricity_rating SMALLINT NULL CHECK (electricity_rating BETWEEN 1 AND 5),
    security_rating SMALLINT NULL CHECK (security_rating BETWEEN 1 AND 5),
    maintenance_rating SMALLINT NULL CHECK (maintenance_rating BETWEEN 1 AND 5),
    review_text TEXT NULL,
    is_verified_resident BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    reported_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(property_id, user_id)
);

-- 25. VERIFICATION RECORDS
CREATE TABLE IF NOT EXISTS verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_type VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    submitted_documents JSONB NULL,
    reviewer_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    review_notes TEXT NULL,
    verified_at TIMESTAMPTZ NULL,
    expires_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 26. REPORTS
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reported_user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    reported_property_id UUID NULL REFERENCES properties(id) ON DELETE SET NULL,
    reported_review_id UUID NULL REFERENCES reviews(id) ON DELETE SET NULL,
    report_type VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    admin_notes TEXT NULL,
    resolved_by UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 27. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    data JSONB NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 28. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    old_values JSONB NULL,
    new_values JSONB NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SPATIAL GIST & COMPOSITE QUERY INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_properties_spatial_location ON properties USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_localities_spatial_location ON localities USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_properties_city_active ON properties (city, is_active, is_paused);
CREATE INDEX IF NOT EXISTS idx_properties_type_city ON properties (type, city);
CREATE INDEX IF NOT EXISTS idx_pricing_rent_range ON pricing_details (monthly_rent_min, monthly_rent_max);
CREATE INDEX IF NOT EXISTS idx_roommate_city_budget ON roommate_profiles (city, monthly_budget_min, monthly_budget_max) WHERE is_active = true;

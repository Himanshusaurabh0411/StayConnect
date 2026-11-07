class PropertyModel {
  final String id;
  final String name;
  final String slug;
  final String type;
  final String locality;
  final String city;
  final double monthlyRentMin;
  final double monthlyRentMax;
  final double securityDeposit;
  final String genderPreference;
  final bool isVerified;
  final int verificationLevel;
  final double averageRating;
  final int reviewCount;
  final int availableBeds;
  final int totalBeds;
  final bool hasFood;
  final List<String> amenities;

  PropertyModel({
    required this.id,
    required this.name,
    required this.slug,
    required this.type,
    required this.locality,
    required this.city,
    required this.monthlyRentMin,
    required this.monthlyRentMax,
    required this.securityDeposit,
    required this.genderPreference,
    required this.isVerified,
    required this.verificationLevel,
    required this.averageRating,
    required this.reviewCount,
    required this.availableBeds,
    required this.totalBeds,
    required this.hasFood,
    required this.amenities,
  });

  factory PropertyModel.fromJson(Map<String, dynamic> json) {
    return PropertyModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      slug: json['slug'] ?? '',
      type: json['type'] ?? 'pg',
      locality: json['locality'] ?? '',
      city: json['city'] ?? '',
      monthlyRentMin: (json['monthlyRentMin'] as num?)?.toDouble() ?? 0.0,
      monthlyRentMax: (json['monthlyRentMax'] as num?)?.toDouble() ?? 0.0,
      securityDeposit: (json['securityDeposit'] as num?)?.toDouble() ?? 0.0,
      genderPreference: json['genderPreference'] ?? 'any',
      isVerified: json['isVerified'] ?? false,
      verificationLevel: json['verificationLevel'] ?? 1,
      averageRating: (json['averageRating'] as num?)?.toDouble() ?? 0.0,
      reviewCount: json['reviewCount'] ?? 0,
      availableBeds: json['availableBeds'] ?? 0,
      totalBeds: json['totalBeds'] ?? 0,
      hasFood: json['hasFood'] ?? false,
      amenities: (json['amenities'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
    );
  }
}

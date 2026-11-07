class RoommateModel {
  final String id;
  final String userId;
  final String displayName;
  final int age;
  final String occupation;
  final String occupationDetail;
  final String city;
  final List<String> preferredLocalities;
  final double monthlyBudgetMin;
  final double monthlyBudgetMax;
  final String foodPreference;
  final String smokingPreference;
  final String lookingFor;
  final String introduction;
  final bool isIdVerified;
  final String? phone;
  final int compatibilityScore;

  RoommateModel({
    required this.id,
    required this.userId,
    required this.displayName,
    required this.age,
    required this.occupation,
    required this.occupationDetail,
    required this.city,
    required this.preferredLocalities,
    required this.monthlyBudgetMin,
    required this.monthlyBudgetMax,
    required this.foodPreference,
    required this.smokingPreference,
    required this.lookingFor,
    required this.introduction,
    required this.isIdVerified,
    this.phone,
    this.compatibilityScore = 90,
  });

  factory RoommateModel.fromJson(Map<String, dynamic> json) {
    return RoommateModel(
      id: json['id'] ?? '',
      userId: json['userId'] ?? '',
      displayName: json['displayName'] ?? '',
      age: json['age'] ?? 22,
      occupation: json['occupation'] ?? 'student',
      occupationDetail: json['occupationDetail'] ?? '',
      city: json['city'] ?? '',
      preferredLocalities: (json['preferredLocalities'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      monthlyBudgetMin: (json['monthlyBudgetMin'] as num?)?.toDouble() ?? 0.0,
      monthlyBudgetMax: (json['monthlyBudgetMax'] as num?)?.toDouble() ?? 0.0,
      foodPreference: json['foodPreference'] ?? 'veg',
      smokingPreference: json['smokingPreference'] ?? 'no_smoking',
      lookingFor: json['lookingFor'] ?? 'flatmates_to_rent',
      introduction: json['introduction'] ?? '',
      isIdVerified: json['isIdVerified'] ?? false,
      phone: json['phone'],
      compatibilityScore: json['compatibility']?['score'] ?? 92,
    );
  }
}

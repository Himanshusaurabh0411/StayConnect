class ApiConstants {
  // In production, maps to https://api.stayconnect.in/api/v1
  // In Android Emulator, localhost is 10.0.2.2:4000/api/v1
  // In iOS Simulator, localhost is 127.0.0.1:4000/api/v1
  static const String baseUrl = 'http://10.0.2.2:4000/api/v1';

  // Endpoints
  static const String requestOtp = '/auth/request-otp';
  static const String verifyOtp = '/auth/verify-otp';
  static const String properties = '/properties';
  static const String roommates = '/roommates';
  static const String enquiries = '/enquiries';
  static const String visits = '/visits';
  static const String reviews = '/reviews';

  // Deep Linking Schemes
  static const String deepLinkScheme = 'stayconnect';
  static const String universalLinkHost = 'stayconnect.in';
}

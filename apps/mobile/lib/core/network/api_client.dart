import 'package:dio/dio.dart';
import '../constants/api_constants.dart';

class MobileApiClient {
  static final MobileApiClient _instance = MobileApiClient._internal();
  factory MobileApiClient() => _instance;

  late final Dio dio;
  String? _jwtToken;

  MobileApiClient._internal() {
    dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // Request interceptor to inject Bearer tokens
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          if (_jwtToken != null) {
            options.headers['Authorization'] = 'Bearer $_jwtToken';
          }
          return handler.next(options);
        },
        onError: (DioException e, handler) {
          // Handle token expiry / 401 refresh
          return handler.next(e);
        },
      ),
    );
  }

  void setAuthToken(String? token) {
    _jwtToken = token;
  }

  // --- Core API Calls ---
  Future<Response> searchProperties({
    String? city,
    String? type,
    double? maxBudget,
    bool? verifiedOnly,
  }) async {
    return dio.get(
      ApiConstants.properties,
      queryParameters: {
        if (city != null && city != 'all') 'city': city,
        if (type != null && type != 'all') 'type': type,
        if (maxBudget != null) 'maxRent': maxBudget,
        if (verifiedOnly == true) 'verifiedOnly': true,
      },
    );
  }

  Future<Response> getPropertyDetails(String slugOrId) async {
    return dio.get('${ApiConstants.properties}/$slugOrId');
  }

  Future<Response> getTrueCostCalculation(String slugOrId) async {
    return dio.get('${ApiConstants.properties}/$slugOrId/cost-calculator');
  }

  Future<Response> searchRoommates({String? city, String? lookingFor}) async {
    return dio.get(
      ApiConstants.roommates,
      queryParameters: {
        if (city != null && city != 'all') 'city': city,
        if (lookingFor != null && lookingFor != 'all') 'lookingFor': lookingFor,
      },
    );
  }

  Future<Response> sendConnectionRequest(String roommateId, String message) async {
    return dio.post(
      '${ApiConstants.roommates}/$roommateId/connect',
      data: {'message': message},
    );
  }

  Future<Response> requestOtp(String phone, String role) async {
    return dio.post(
      ApiConstants.requestOtp,
      data: {'phone': phone, 'role': role},
    );
  }

  Future<Response> verifyOtp(String phone, String otp, {String? role}) async {
    return dio.post(
      ApiConstants.verifyOtp,
      data: {'phone': phone, 'otp': otp, 'role': role},
    );
  }
}

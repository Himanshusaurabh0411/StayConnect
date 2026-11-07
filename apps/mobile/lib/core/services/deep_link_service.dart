import 'package:flutter/foundation.dart';
import 'package:app_links/app_links.dart';

class DeepLinkService {
  static final DeepLinkService _instance = DeepLinkService._internal();
  factory DeepLinkService() => _instance;
  DeepLinkService._internal();

  late final AppLinks _appLinks;
  Function(String route, String param)? onDeepLinkReceived;

  Future<void> init() async {
    _appLinks = AppLinks();

    // Handle initial link if app was launched by deep link
    final initialUri = await _appLinks.getInitialLink();
    if (initialUri != null) {
      _handleUri(initialUri);
    }

    // Handle background / resumed deep links
    _appLinks.uriLinkStream.listen((uri) {
      _handleUri(uri);
    });
  }

  void _handleUri(Uri uri) {
    debugPrint('StayConnect Deep Link intercepted: $uri');
    // Patterns supported:
    // stayconnect://property/{slug} -> /property/:slug
    // stayconnect://roommate/{id} -> /roommate/:id
    // https://stayconnect.in/properties/{slug}
    final segments = uri.pathSegments;
    if (segments.contains('properties') && segments.length > 1) {
      onDeepLinkReceived?.call('property', segments[1]);
    } else if (segments.contains('roommates') && segments.length > 1) {
      onDeepLinkReceived?.call('roommate', segments[1]);
    }
  }
}

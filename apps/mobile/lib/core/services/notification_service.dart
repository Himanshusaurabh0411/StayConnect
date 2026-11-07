import 'package:flutter/foundation.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  Future<void> init() async {
    final messaging = FirebaseMessaging.instance;

    // Request user permission for alerts, badges, and sounds
    final settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      debugPrint('FCM Push Notification Permission Granted');

      // Fetch registration token to send to NestJS backend
      final fcmToken = await messaging.getToken();
      debugPrint('Device FCM Token: $fcmToken');

      // Listen for foreground notifications
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        debugPrint('Incoming FCM notification: ${message.notification?.title}');
      });

      // Handle notification tapped by user
      FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
        debugPrint('Notification clicked: ${message.data}');
      });
    }
  }
}

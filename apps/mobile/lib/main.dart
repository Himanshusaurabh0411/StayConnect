import 'package:flutter/material.dart';
import 'core/constants/app_colors.dart';
import 'core/services/deep_link_service.dart';
import 'core/services/notification_service.dart';
import 'screens/home_screen.dart';
import 'screens/property_discovery_screen.dart';
import 'screens/roommate_discovery_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Deep Linking and Notifications services
  try {
    await DeepLinkService().init();
    await NotificationService().init();
  } catch (_) {
    // Graceful fallback for non-native/test environments
  }

  runApp(const StayConnectApp());
}

class StayConnectApp extends StatefulWidget {
  const StayConnectApp({super.key});

  @override
  State<StayConnectApp> createState() => _StayConnectAppState();
}

class _StayConnectAppState extends State<StayConnectApp> {
  final GlobalKey<NavigatorState> _navigatorKey = GlobalKey<NavigatorState>();

  @override
  void initState() {
    super.initState();
    // Route deep links seamlessly
    DeepLinkService().onDeepLinkReceived = (route, param) {
      if (route == 'property') {
        _navigatorKey.currentState?.push(
          MaterialPageRoute(
            builder: (_) => PropertyDiscoveryScreen(searchQuery: param),
          ),
        );
      } else if (route == 'roommate') {
        _navigatorKey.currentState?.push(
          MaterialPageRoute(
            builder: (_) => const RoommateDiscoveryScreen(),
          ),
        );
      }
    };
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: _navigatorKey,
      title: 'StayConnect',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Inter',
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          primary: AppColors.primary,
          secondary: AppColors.secondary,
        ),
        scaffoldBackgroundColor: AppColors.backgroundAlt,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: AppColors.primary,
          elevation: 0,
        ),
        useMaterial3: true,
      ),
      home: const MainTabNavigator(),
    );
  }
}

class MainTabNavigator extends StatefulWidget {
  const MainTabNavigator({super.key});

  @override
  State<MainTabNavigator> createState() => _MainTabNavigatorState();
}

class _MainTabNavigatorState extends State<MainTabNavigator> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    PropertyDiscoveryScreen(),
    RoommateDiscoveryScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textSecondary,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 11),
        unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500, fontSize: 11),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.search_outlined), activeIcon: Icon(Icons.search), label: 'Stays'),
          BottomNavigationBarItem(icon: Icon(Icons.people_outline), activeIcon: Icon(Icons.people), label: 'Roommates'),
        ],
      ),
    );
  }
}

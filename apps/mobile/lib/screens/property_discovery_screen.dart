import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';
import '../core/network/api_client.dart';
import '../models/property_model.dart';

class PropertyDiscoveryScreen extends StatefulWidget {
  final String? city;
  final String? searchQuery;
  final String? initialType;

  const PropertyDiscoveryScreen({
    super.key,
    this.city,
    this.searchQuery,
    this.initialType,
  });

  @override
  State<PropertyDiscoveryScreen> createState() => _PropertyDiscoveryScreenState();
}

class _PropertyDiscoveryScreenState extends State<PropertyDiscoveryScreen> {
  late String _selectedCity;
  String _selectedType = 'all';
  double _maxBudget = 30000;
  bool _verifiedOnly = false;
  bool _isLoading = false;
  List<PropertyModel> _properties = [];

  @override
  void initState() {
    super.initState();
    _selectedCity = widget.city ?? 'Bangalore';
    if (widget.initialType != null) _selectedType = widget.initialType!;
    _fetchProperties();
  }

  Future<void> _fetchProperties() async {
    setState(() => _isLoading = true);
    try {
      final res = await MobileApiClient().searchProperties(
        city: _selectedCity,
        type: _selectedType,
        maxBudget: _maxBudget,
        verifiedOnly: _verifiedOnly,
      );
      if (res.data != null && res.data['data'] != null) {
        final list = (res.data['data'] as List)
            .map((item) => PropertyModel.fromJson(item))
            .toList();
        setState(() => _properties = list);
      }
    } catch (_) {
      // Local fallback
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundAlt,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          'Stays in $_selectedCity',
          style: const TextStyle(
            color: AppColors.primary,
            fontSize: 16,
            fontWeight: FontWeight.w800,
          ),
        ),
        iconTheme: const IconThemeData(color: AppColors.primary),
      ),
      body: Column(
        children: [
          // Filter Chips Rail
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  FilterChip(
                    label: const Text('All Types', style: TextStyle(fontSize: 11)),
                    selected: _selectedType == 'all',
                    onSelected: (val) {
                      setState(() => _selectedType = 'all');
                      _fetchProperties();
                    },
                  ),
                  const SizedBox(width: 6),
                  FilterChip(
                    label: const Text('PG Only', style: TextStyle(fontSize: 11)),
                    selected: _selectedType == 'pg',
                    onSelected: (val) {
                      setState(() => _selectedType = 'pg');
                      _fetchProperties();
                    },
                  ),
                  const SizedBox(width: 6),
                  FilterChip(
                    label: const Text('Verified Only', style: TextStyle(fontSize: 11)),
                    selected: _verifiedOnly,
                    onSelected: (val) {
                      setState(() => _verifiedOnly = val);
                      _fetchProperties();
                    },
                  ),
                ],
              ),
            ),
          ),

          // Properties List
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _properties.length,
                    itemBuilder: (context, index) {
                      final item = _properties[index];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 14),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: AppColors.surfaceBorder),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: AppColors.primary50,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    item.type.toUpperCase(),
                                    style: const TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.w800,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ),
                                if (item.isVerified)
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AppColors.secondary50,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Row(
                                      children: [
                                        const Icon(Icons.shield, color: AppColors.secondary, size: 12),
                                        const SizedBox(width: 4),
                                        Text(
                                          'Level ${item.verificationLevel} Verified',
                                          style: const TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.w700,
                                            color: AppColors.secondaryDark,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              item.name,
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w800,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '${item.locality}, ${item.city}',
                              style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                            ),
                            const SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                RichText(
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: '₹${item.monthlyRentMin.toInt()}',
                                        style: const TextStyle(
                                          color: AppColors.primary,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w900,
                                        ),
                                      ),
                                      const TextSpan(
                                        text: ' / month',
                                        style: TextStyle(
                                          color: AppColors.textSecondary,
                                          fontSize: 11,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                ElevatedButton(
                                  onPressed: () {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Text('Connecting directly to verified owner (Zero Brokerage)...'),
                                      ),
                                    );
                                  },
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                  child: const Text('Contact Owner', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

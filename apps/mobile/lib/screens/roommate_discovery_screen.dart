import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';
import '../core/network/api_client.dart';
import '../models/roommate_model.dart';

class RoommateDiscoveryScreen extends StatefulWidget {
  const RoommateDiscoveryScreen({super.key});

  @override
  State<RoommateDiscoveryScreen> createState() => _RoommateDiscoveryScreenState();
}

class _RoommateDiscoveryScreenState extends State<RoommateDiscoveryScreen> {
  String _selectedIntent = 'all';
  String _selectedCity = 'Bangalore';
  bool _isLoading = false;
  List<RoommateModel> _roommates = [];

  @override
  void initState() {
    super.initState();
    _fetchRoommates();
  }

  Future<void> _fetchRoommates() async {
    setState(() => _isLoading = true);
    try {
      final res = await MobileApiClient().searchRoommates(
        city: _selectedCity,
        lookingFor: _selectedIntent,
      );
      if (res.data != null && res.data['data'] != null) {
        final list = (res.data['data'] as List)
            .map((item) => RoommateModel.fromJson(item))
            .toList();
        setState(() => _roommates = list);
      }
    } catch (_) {
      // Local fallback
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _showConnectDialog(RoommateModel rm) {
    final msgController = TextEditingController(
      text: 'Hi ${rm.displayName}! I am also looking to rent an apartment in ${rm.city}. Let us connect!',
    );

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Connect with ${rm.displayName}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Phone numbers unlock upon mutual connection acceptance. Keep initial conversations respectful.',
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: msgController,
              maxLines: 3,
              decoration: InputDecoration(
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                hintText: 'Add an intro message...',
                isDense: true,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(ctx);
              await MobileApiClient().sendConnectionRequest(rm.id, msgController.text);
              if (mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Connection request sent! Phone unlocks on mutual acceptance.')),
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
            ),
            child: const Text('Send Request'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundAlt,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Roommate Discovery',
          style: TextStyle(color: AppColors.primary, fontSize: 16, fontWeight: FontWeight.w800),
        ),
        iconTheme: const IconThemeData(color: AppColors.primary),
      ),
      body: Column(
        children: [
          // City Selector Header
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Matching City:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedCity,
                    style: const TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.bold),
                    items: ['Bangalore', 'Mumbai', 'Hyderabad']
                        .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                        .toList(),
                    onChanged: (val) {
                      if (val != null) {
                        setState(() => _selectedCity = val);
                        _fetchRoommates();
                      }
                    },
                  ),
                ),
              ],
            ),
          ),

          // Roommates List
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _roommates.length,
                    itemBuilder: (context, index) {
                      final rm = _roommates[index];
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
                                Row(
                                  children: [
                                    CircleAvatar(
                                      radius: 16,
                                      backgroundColor: AppColors.primary50,
                                      child: Text(
                                        rm.displayName.substring(0, 1),
                                        style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 12),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '${rm.displayName} (${rm.age} yrs)',
                                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                        ),
                                        Text(
                                          '${rm.occupationDetail} • ${rm.city}',
                                          style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: AppColors.secondary50,
                                    borderRadius: BorderRadius.circular(4),
                                    border: Border.all(color: AppColors.secondary.withOpacity(0.3)),
                                  ),
                                  child: Text(
                                    '${rm.compatibilityScore}% Match',
                                    style: const TextStyle(color: AppColors.secondaryDark, fontSize: 10, fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: AppColors.surface,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                '"${rm.introduction}"',
                                style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: AppColors.textSecondary),
                              ),
                            ),
                            const SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Budget: ₹${rm.monthlyBudgetMin.toInt()} - ₹${rm.monthlyBudgetMax.toInt()}',
                                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary),
                                ),
                                ElevatedButton(
                                  onPressed: () => _showConnectDialog(rm),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                  child: const Text('Connect for Free', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
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

import { Bell, Compass, LayoutDashboard } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ActiveTab = 'dashboard' | 'explore' | 'notifications';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDark: boolean;
}

export default function BottomNav({ activeTab, onTabChange, isDark }: BottomNavProps) {
  return (
    <View style={[styles.bottomNav, { backgroundColor: isDark ? '#0d1320' : '#f8fafc', borderTopColor: isDark ? '#1e293b' : '#e2e8f0' }]}>      
      <TouchableOpacity style={styles.navTab} onPress={() => onTabChange('dashboard')}>
        <LayoutDashboard
          size={20}
          color={activeTab === 'dashboard' ? (isDark ? '#00daf3' : '#00838f') : (isDark ? '#64748b' : '#94a3b8')}
        />
        <Text style={[styles.navLabel, activeTab === 'dashboard' && { color: isDark ? '#00daf3' : '#00838f', fontWeight: '700' }]}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navTab} onPress={() => onTabChange('explore')}>
        <Compass
          size={20}
          color={activeTab === 'explore' ? (isDark ? '#00daf3' : '#00838f') : (isDark ? '#64748b' : '#94a3b8')}
        />
        <Text style={[styles.navLabel, activeTab === 'explore' && { color: isDark ? '#00daf3' : '#00838f', fontWeight: '700' }]}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navTab} onPress={() => onTabChange('notifications')}>
        <Bell
          size={20}
          color={activeTab === 'notifications' ? (isDark ? '#00daf3' : '#00838f') : (isDark ? '#64748b' : '#94a3b8')}
        />
        <Text style={[styles.navLabel, activeTab === 'notifications' && { color: isDark ? '#00daf3' : '#00838f', fontWeight: '700' }]}>Alerts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
  },
});

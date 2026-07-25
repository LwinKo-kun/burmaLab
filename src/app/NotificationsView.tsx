import { Bell } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface NotificationsViewProps {
  isDark: boolean;
}

export default function NotificationsView({ isDark }: NotificationsViewProps) {
  return (
    <View style={styles.container}>
      <Bell size={36} color={isDark ? '#00daf3' : '#00838f'} />
      <Text style={[styles.title, { color: isDark ? '#dce2f4' : '#0f172a' }]}>System Alerts</Text>
      <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>
        You are all caught up! No new notifications or security alerts at this time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    minHeight: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
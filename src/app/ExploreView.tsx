import { Compass } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface ExploreViewProps {
  isDark: boolean;
}

export default function ExploreView({ isDark }: ExploreViewProps) {
  return (
    <View style={styles.container}>
      <Compass size={36} color={isDark ? '#00daf3' : '#00838f'} />
      <Text style={[styles.title, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Explore Labs & Simulations</Text>
      <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>
        Discover interactive sandbox modules, physics experiments, and datasets.
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
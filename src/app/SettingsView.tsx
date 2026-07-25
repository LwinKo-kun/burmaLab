import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface SettingsViewProps {
  preference?: 'system' | 'light' | 'dark';
  onPreferenceChange?: (pref: 'system' | 'light' | 'dark') => void;
  onBack?: () => void;
}

export default function SettingsView({ preference = 'system', onPreferenceChange, onBack }: SettingsViewProps) {
  const system = useColorScheme();
  const effective = preference === 'system' ? (system === 'dark' ? 'dark' : 'light') : preference;
  const isDark = effective === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0d1320' : '#f8fafc' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color={isDark ? '#dce2f4' : '#0f172a'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Theme</Text>

        <TouchableOpacity
          style={[styles.option, preference === 'system' && styles.optionActive]}
          onPress={() => onPreferenceChange && onPreferenceChange('system')}
        >
          <Text style={[styles.optionText, { color: isDark ? '#dce2f4' : '#0f172a' }]}>System Default</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, preference === 'light' && styles.optionActive]}
          onPress={() => onPreferenceChange && onPreferenceChange('light')}
        >
          <Text style={[styles.optionText, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, preference === 'dark' && styles.optionActive]}
          onPress={() => onPreferenceChange && onPreferenceChange('dark')}
        >
          <Text style={[styles.optionText, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Dark</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optionActive: {
    backgroundColor: '#e2e8f0',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});


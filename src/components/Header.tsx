import { FlaskConical } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  isDark: boolean;
  children?: React.ReactNode;
}

export default function Header({ isDark, children }: HeaderProps) {
  return (
    <View style={[styles.header, { backgroundColor: isDark ? '#0d1320' : '#f8fafc', borderBottomColor: isDark ? '#1e293b' : '#e2e8f0' }]}>      
      <View style={styles.brandRow}>
        <FlaskConical size={26} color={isDark ? '#00daf3' : '#00838f'} />
        <Text style={[styles.brandTitle, { color: isDark ? '#dce2f4' : '#0f172a' }]}>Burma Lab</Text>
      </View>

      <View style={styles.right}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

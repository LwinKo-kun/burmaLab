import { ArrowLeft, User as UserIcon } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserProfile } from './MainDashboard';

interface UserProfileViewProps {
  currentUser: UserProfile;
  isDark: boolean;
  onBack: () => void;
}

export default function UserProfileView({ currentUser, isDark, onBack }: UserProfileViewProps) {
  const isAdmin = currentUser.role === 'admin';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0d1320' : '#f8fafc' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: isDark ? '#19202c' : '#e2e8f0' }]}>
          <ArrowLeft size={18} color={isDark ? '#00daf3' : '#00838f'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#dce2f4' : '#0f172a' }]}>User Profile</Text>
      </View>

      <View style={[styles.card, { backgroundColor: isDark ? '#19202c' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }]}>
        <View style={[styles.avatarLarge, { backgroundColor: isDark ? '#00e5ff' : '#00838f' }]}>
          <UserIcon size={32} color={isDark ? '#00363d' : '#ffffff'} />
        </View>
        <Text style={[styles.name, { color: isDark ? '#dce2f4' : '#0f172a' }]}>{currentUser.name}</Text>
        <Text style={[styles.email, { color: isDark ? '#94a3b8' : '#64748b' }]}>{currentUser.email}</Text>
        <View style={[styles.roleBadge, isAdmin ? styles.adminBadge : styles.userBadge]}>
          <Text style={[styles.roleText, { color: isDark ? '#00daf3' : '#00838f' }]}>
            {isAdmin ? 'ADMINISTRATOR' : 'LAB MEMBER'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  adminBadge: {
    backgroundColor: 'rgba(0, 218, 243, 0.15)',
  },
  userBadge: {
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
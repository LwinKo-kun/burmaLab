import {
  Activity,
  BarChart3,
  ChevronDown,
  FlaskConical,
  LogOut,
  Settings,
  Shield,
  User as UserIcon,
  Users
} from 'lucide-react-native';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomNav, { ActiveTab } from '@/components/BottomNav';
import Header from '@/components/Header';
import ExploreView from './ExploreView';
import NotificationsView from './NotificationsView';
import SettingsView from './SettingsView';
import UserProfileView from './UserProfileView';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface MainDashboardProps {
  theme?: 'dark' | 'light';
  themePreference?: 'system' | 'light' | 'dark';
  onPreferenceChange?: (pref: 'system' | 'light' | 'dark') => void;
  onThemeChange?: (newTheme: 'dark' | 'light') => void;
  onLogout?: () => void;
  currentUser?: UserProfile;
}

export default function MainDashboard({
  theme = 'dark',
  themePreference = 'system',
  onPreferenceChange,
  onThemeChange,
  onLogout,
  currentUser = {
    id: 'usr_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@burmalab.edu',
    role: 'admin',
  },
}: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isViewingSettings, setIsViewingSettings] = useState(false);
  const [isViewingProfile, setIsViewingProfile] = useState(false);
  const insets = useSafeAreaInsets();
  const isDark = theme === 'dark';
  const isAdmin = currentUser.role === 'admin';

  const dynamicStyles = getStyles(isDark);
  return (
    <View style={[dynamicStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>      
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0d1320' : '#f8fafc'}
      />

      <Header isDark={isDark}>
        <TouchableOpacity
          style={dynamicStyles.profileChip}
          onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          activeOpacity={0.8}
        >
          <View style={dynamicStyles.avatarBadge}>
            <Text style={dynamicStyles.avatarText}>
              {currentUser.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <ChevronDown size={14} color={isDark ? '#bac9cc' : '#64748b'} />
        </TouchableOpacity>
      </Header>

      {/* ------------------ PROFILE DROPDOWN MENU ------------------ */}
      {isProfileMenuOpen && (
        <View style={dynamicStyles.dropdownMenu}>
          <View style={dynamicStyles.menuHeader}>
            <Text style={dynamicStyles.menuUserName}>{currentUser.name}</Text>
            <Text style={dynamicStyles.menuUserEmail}>{currentUser.email}</Text>
            <View style={[dynamicStyles.roleBadge, isAdmin ? dynamicStyles.adminBadge : dynamicStyles.userBadge]}>
              <Text style={dynamicStyles.roleBadgeText}>
                {isAdmin ? 'ADMINISTRATOR' : 'LAB MEMBER'}
              </Text>
            </View>
          </View>

          <View style={dynamicStyles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsProfileMenuOpen(false);
              setIsViewingProfile(true);
              setIsViewingSettings(false);
            }}
          >
            <UserIcon size={16} color={isDark ? '#bac9cc' : '#64748b'} />
            <Text style={dynamicStyles.menuItemText}>View Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsProfileMenuOpen(false);
              setIsViewingSettings(true);
              setIsViewingProfile(false);
            }}
          >
            <Settings size={16} color={isDark ? '#bac9cc' : '#64748b'} />
            <Text style={dynamicStyles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsProfileMenuOpen(false);
              setIsViewingProfile(false);
              setIsViewingSettings(false);
              if (onLogout) onLogout();
            }}
          >
            <LogOut size={16} color="#f43f5e" />
            <Text style={[dynamicStyles.menuItemText, { color: '#f43f5e' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ------------------ MAIN CONTENT AREA ------------------ */}
      {isViewingProfile ? (
        <UserProfileView
          currentUser={currentUser}
          isDark={isDark}
          onBack={() => setIsViewingProfile(false)}
        />
      ) : isViewingSettings ? (
        <SettingsView
          preference={themePreference}
          onPreferenceChange={onPreferenceChange}
          onBack={() => setIsViewingSettings(false)}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setIsProfileMenuOpen(false)}
          >
            {activeTab === 'dashboard' && (
              <>
                <View style={styles.welcomeBanner}>
                  <Text style={dynamicStyles.greeting}>
                    Hello, {currentUser.name.split(' ')[0]} 👋
                  </Text>
                  <Text style={dynamicStyles.subGreeting}>
                    {isAdmin ? 'System Operations & Control Panel' : 'Workspace & Simulation Overview'}
                  </Text>
                </View>

                {isAdmin ? (
                  <AdminView isDark={isDark} dynamicStyles={dynamicStyles} />
                ) : (
                  <StandardUserView isDark={isDark} dynamicStyles={dynamicStyles} />
                )}
              </>
            )}

            {activeTab === 'explore' && <ExploreView isDark={isDark} />}
            {activeTab === 'notifications' && (
              <NotificationsView isDark={isDark} onClose={() => setActiveTab('dashboard')} />
            )}
          </ScrollView>

          {/* Reusable Bottom Navigation Component */}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />
        </>
      )}
    </View>
  );
}

function AdminView({ isDark, dynamicStyles }: { isDark: boolean; dynamicStyles: any }) {
  return (
    <View style={styles.viewContainer}>
      <Text style={dynamicStyles.sectionTitle}>Admin Controls</Text>
      <View style={styles.cardGrid}>
        <View style={dynamicStyles.card}>
          <Shield size={22} color={isDark ? '#00daf3' : '#00838f'} />
          <Text style={dynamicStyles.cardTitle}>System Status</Text>
          <Text style={dynamicStyles.cardValue}>Operational</Text>
        </View>
        <View style={dynamicStyles.card}>
          <Users size={22} color={isDark ? '#00daf3' : '#00838f'} />
          <Text style={dynamicStyles.cardTitle}>Total Users</Text>
          <Text style={dynamicStyles.cardValue}>1,248</Text>
        </View>
      </View>
      <View style={[dynamicStyles.card, styles.fullWidthCard]}>
        <BarChart3 size={22} color={isDark ? '#00daf3' : '#00838f'} />
        <Text style={dynamicStyles.cardTitle}>Admin Analytics</Text>
        <Text style={dynamicStyles.cardBody}>
          System-wide performance indicators and user logs are actively running.
        </Text>
      </View>
    </View>
  );
}

function StandardUserView({ isDark, dynamicStyles }: { isDark: boolean; dynamicStyles: any }) {
  return (
    <View style={styles.viewContainer}>
      <Text style={dynamicStyles.sectionTitle}>My Workspace</Text>
      <View style={styles.cardGrid}>
        <View style={dynamicStyles.card}>
          <Activity size={22} color={isDark ? '#00daf3' : '#00838f'} />
          <Text style={dynamicStyles.cardTitle}>Active Projects</Text>
          <Text style={dynamicStyles.cardValue}>4</Text>
        </View>
        <View style={dynamicStyles.card}>
          <FlaskConical size={22} color={isDark ? '#00daf3' : '#00838f'} />
          <Text style={dynamicStyles.cardTitle}>Completed Labs</Text>
          <Text style={dynamicStyles.cardValue}>12</Text>
        </View>
      </View>
      <View style={[dynamicStyles.card, styles.fullWidthCard]}>
        <Text style={dynamicStyles.cardTitle}>Recent Activity</Text>
        <Text style={dynamicStyles.cardBody}>
          You have no pending tasks. Start a new lab session from the explore menu.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scrollBody: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  welcomeBanner: {
    marginBottom: 20,
  },
  viewContainer: {
    gap: 16,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  fullWidthCard: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0d1320' : '#f8fafc',
    },
    header: {
      height: 60,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#1e293b' : '#e2e8f0',
      backgroundColor: isDark ? '#0d1320' : '#f8fafc',
      zIndex: 10,
    },
    brandTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#dce2f4' : '#0f172a',
    },
    iconButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDark ? '#19202c' : '#e2e8f0',
    },
    profileChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingRight: 4,
    },
    avatarBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? '#00e5ff' : '#00838f',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: isDark ? '#00363d' : '#ffffff',
      fontWeight: '700',
      fontSize: 14,
    },
    dropdownMenu: {
      position: 'absolute',
      top: 65,
      right: 16,
      width: 220,
      backgroundColor: isDark ? '#19202c' : '#ffffff',
      borderRadius: 12,
      padding: 8,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#e2e8f0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
      zIndex: 100,
    },
    menuHeader: {
      padding: 8,
    },
    menuUserName: {
      fontSize: 14,
      fontWeight: '700',
      color: isDark ? '#dce2f4' : '#0f172a',
    },
    menuUserEmail: {
      fontSize: 12,
      color: isDark ? '#94a3b8' : '#64748b',
      marginTop: 2,
    },
    roleBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginTop: 8,
    },
    adminBadge: {
      backgroundColor: isDark ? 'rgba(0, 218, 243, 0.15)' : 'rgba(0, 131, 143, 0.1)',
    },
    userBadge: {
      backgroundColor: isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.1)',
    },
    roleBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: isDark ? '#00daf3' : '#00838f',
    },
    menuDivider: {
      height: 1,
      backgroundColor: isDark ? '#334155' : '#e2e8f0',
      marginVertical: 4,
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#dce2f4' : '#334155',
    },
    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#dce2f4' : '#0f172a',
    },
    subGreeting: {
      fontSize: 14,
      color: isDark ? '#94a3b8' : '#64748b',
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#dce2f4' : '#334155',
      marginBottom: 8,
    },
    card: {
      flex: 1,
      backgroundColor: isDark ? '#19202c' : '#ffffff',
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#334155' : '#e2e8f0',
      gap: 6,
    },
    cardTitle: {
      fontSize: 13,
      fontWeight: '500',
      color: isDark ? '#94a3b8' : '#64748b',
    },
    cardValue: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#dce2f4' : '#0f172a',
    },
    cardBody: {
      fontSize: 13,
      color: isDark ? '#94a3b8' : '#64748b',
      lineHeight: 18,
    },
  });
import { Eye, EyeOff, FlaskConical, Moon, Sun } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AccessPortalProps {
  onLoginSuccess?: () => void;
  theme?: 'dark' | 'light';
  onThemeChange?: (newTheme: 'dark' | 'light') => void;
}

export default function AccessPortal({ onLoginSuccess, theme, onThemeChange }: AccessPortalProps) {
  const systemColorScheme = useColorScheme();
  const [overrideTheme, setOverrideTheme] = useState<'dark' | 'light' | null>(theme || null);

  const activeTheme = overrideTheme || systemColorScheme || 'dark';
  const isDark = activeTheme === 'dark';

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setOverrideTheme(nextTheme);
    if (onThemeChange) {
      onThemeChange(nextTheme);
    }
  };

  const handleAuth = async () => {
    // Basic validation
    if (!email.trim() || !password) {
      Alert.alert('Missing Info', 'Please provide both email and password.');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        Alert.alert('Missing Info', 'Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      // Simulate authentication request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isSignUp) {
        Alert.alert('Welcome!', 'Account created successfully.');
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      Alert.alert('Authentication Error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = getStyles(isDark);

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0d1320' : '#f8fafc'}
      />

      <View style={dynamicStyles.gridBackgroundOverlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Bar */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <FlaskConical size={28} color={isDark ? '#00daf3' : '#00838f'} />
              <Text style={dynamicStyles.brandTitle}>Burma Lab</Text>
            </View>

            {/* Theme Toggle Button */}
            <TouchableOpacity style={dynamicStyles.themeToggle} onPress={toggleTheme}>
              {isDark ? <Sun size={18} color="#00daf3" /> : <Moon size={18} color="#00838f" />}
            </TouchableOpacity>
          </View>

          {/* Card Panel */}
          <View style={styles.panelContainer}>
            <View style={dynamicStyles.glassPanel}>
              <View style={styles.welcomeSection}>
                <Text style={dynamicStyles.heading}>
                  {isSignUp ? 'Join the Core' : 'Welcome back!'}
                </Text>
                <Text style={dynamicStyles.subheading}>
                  {isSignUp
                    ? 'Register your account to access the workspace.'
                    : 'Sign in to your lab dashboard.'}
                </Text>
              </View>

              <View style={styles.form}>
                {isSignUp && (
                  <View style={styles.inputGroup}>
                    <Text style={dynamicStyles.label}>Full Name</Text>
                    <TextInput
                      style={dynamicStyles.input}
                      placeholder="Jane Doe"
                      placeholderTextColor={isDark ? 'rgba(132, 147, 150, 0.6)' : '#94a3b8'}
                      value={fullName}
                      onChangeText={setFullName}
                      autoCorrect={false}
                    />
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={dynamicStyles.label}>Email Address</Text>
                  <TextInput
                    style={dynamicStyles.input}
                    placeholder="student@burmalab.edu"
                    placeholderTextColor={isDark ? 'rgba(132, 147, 150, 0.6)' : '#94a3b8'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={dynamicStyles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[dynamicStyles.input, styles.passwordInput]}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? 'rgba(132, 147, 150, 0.6)' : '#94a3b8'}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeIconContainer}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={isDark ? '#bac9cc' : '#64748b'} />
                      ) : (
                        <Eye size={20} color={isDark ? '#bac9cc' : '#64748b'} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {isSignUp && (
                  <View style={styles.inputGroup}>
                    <Text style={dynamicStyles.label}>Confirm Password</Text>
                    <TextInput
                      style={[dynamicStyles.input, styles.passwordInput]}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? 'rgba(132, 147, 150, 0.6)' : '#94a3b8'}
                      secureTextEntry={!showPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      autoCapitalize="none"
                    />
                  </View>
                )}

                <TouchableOpacity
                  style={[dynamicStyles.primaryButton, loading && { opacity: 0.7 }]}
                  activeOpacity={0.8}
                  disabled={loading}
                  onPress={handleAuth}
                >
                  {loading ? (
                    <ActivityIndicator color={isDark ? '#00363d' : '#ffffff'} />
                  ) : (
                    <Text style={dynamicStyles.buttonText}>
                      {isSignUp ? 'Initialize Account' : 'Enter Lab'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={dynamicStyles.footer}>
                <Text style={dynamicStyles.footerText}>
                  {isSignUp ? 'Already registered?' : 'New to the core?'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                >
                  <Text style={dynamicStyles.createAccountText}>
                    {isSignUp ? 'Sign In Here' : 'Create an Account'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    width: '100%',
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  panelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 14,
    height: '100%',
    justifyContent: 'center',
  },
});

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? '#0d1320' : '#f8fafc',
    },
    gridBackgroundOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: isDark ? '#0d1320' : '#f8fafc',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(0, 218, 243, 0.03)' : 'rgba(0, 131, 143, 0.05)',
    },
    brandTitle: {
      color: isDark ? '#dce2f4' : '#0f172a',
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    themeToggle: {
      position: 'absolute',
      right: 0,
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDark ? '#19202c' : '#e2e8f0',
    },
    glassPanel: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: isDark ? '#19202c' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(132, 147, 150, 0.2)' : '#e2e8f0',
      elevation: isDark ? 0 : 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.05,
      shadowRadius: 8,
    },
    heading: {
      color: isDark ? '#dce2f4' : '#0f172a',
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 6,
    },
    subheading: {
      color: isDark ? '#bac9cc' : '#64748b',
      fontSize: 14,
      textAlign: 'center',
    },
    label: {
      color: isDark ? '#dce2f4' : '#334155',
      fontSize: 13,
      fontWeight: '500',
    },
    input: {
      width: '100%',
      height: 48,
      backgroundColor: isDark ? '#0d1320' : '#f1f5f9',
      borderWidth: 1,
      borderColor: isDark ? '#3b494c' : '#cbd5e1',
      borderRadius: 10,
      paddingHorizontal: 16,
      color: isDark ? '#dce2f4' : '#0f172a',
      fontSize: 15,
    },
    primaryButton: {
      width: '100%',
      height: 52,
      backgroundColor: isDark ? '#00e5ff' : '#00838f',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      elevation: 3,
    },
    buttonText: {
      color: isDark ? '#00363d' : '#ffffff',
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    footer: {
      marginTop: 24,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(59, 73, 76, 0.4)' : '#e2e8f0',
      alignItems: 'center',
      gap: 6,
    },
    footerText: {
      color: isDark ? '#bac9cc' : '#64748b',
      fontSize: 14,
    },
    createAccountText: {
      color: isDark ? '#00daf3' : '#00838f',
      fontSize: 14,
      fontWeight: '700',
    },
  });
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, useColorScheme } from 'react-native';
import { FlaskConical } from 'lucide-react-native';

interface LoadingScreenProps {
  statusText?: string;
  progress: number;
  theme?: 'dark' | 'light';
}

export default function LoadingScreen({
  statusText = 'Starting Engine...',
  progress = 0,
  theme,
}: LoadingScreenProps) {
  const systemColorScheme = useColorScheme();
  const activeTheme = theme || systemColorScheme || 'dark';
  const isDark = activeTheme === 'dark';

  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const isComplete = progress >= 100;
  const dynamicStyles = getStyles(isDark);

  return (
    <View style={dynamicStyles.container}>
      {/* Ambient Background Glow */}
      <View style={dynamicStyles.ambientGlow} />

      <View style={styles.content}>
        {/* Logo & App Name */}
        <View style={styles.logoContainer}>
          <View style={styles.iconWrapper}>
            <FlaskConical size={64} color={isDark ? '#00daf3' : '#00838f'} />
          </View>
          <Text style={dynamicStyles.title}>BURMA LAB</Text>
        </View>

        {/* Progress & Status Indicators */}
        <View style={styles.progressContainer}>
          <View style={styles.statusRow}>
            <Text style={[dynamicStyles.statusText, isComplete && dynamicStyles.accentText]}>
              {statusText}
            </Text>
            <Text style={dynamicStyles.percentText}>{Math.floor(progress)}%</Text>
          </View>

          {/* Progress Bar Track */}
          <View style={dynamicStyles.progressTrack}>
            <Animated.View style={[dynamicStyles.progressFill, { width: progressWidth }]} />
          </View>

          <Text style={dynamicStyles.subtext}>INITIALIZING PHYSICS ENVIRONMENT</Text>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 380,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 48,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    width: '100%',
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0d1320' : '#f0f4f8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ambientGlow: {
      position: 'absolute',
      width: width * 1.3,
      height: width * 1.3,
      borderRadius: (width * 1.3) / 2,
      backgroundColor: isDark ? 'rgba(0, 218, 243, 0.06)' : 'rgba(0, 131, 143, 0.08)',
    },
    title: {
      color: isDark ? '#dce2f4' : '#1e293b',
      fontSize: 32,
      fontWeight: '700',
      letterSpacing: 4,
      textTransform: 'uppercase',
    },
    statusText: {
      color: isDark ? 'rgba(186, 201, 204, 0.8)' : '#64748b',
      fontSize: 14,
      fontWeight: '500',
    },
    accentText: {
      color: isDark ? '#00daf3' : '#00838f',
    },
    percentText: {
      color: isDark ? '#00daf3' : '#00838f',
      fontSize: 14,
      fontWeight: '600',
    },
    progressTrack: {
      height: 4,
      width: '100%',
      backgroundColor: isDark ? 'rgba(46, 53, 66, 0.4)' : '#cbd5e1',
      borderRadius: 999,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: isDark ? '#00e5ff' : '#00838f',
      borderRadius: 999,
      shadowColor: isDark ? '#00daf3' : '#00838f',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 4,
    },
    subtext: {
      color: isDark ? 'rgba(186, 201, 204, 0.4)' : '#94a3b8',
      fontSize: 10,
      textAlign: 'center',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginTop: 4,
    },
  });
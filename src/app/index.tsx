import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import AccessPortal from './AccessPortal';
import LoadingScreen from './LoadingScreen';
import MainDashboard from './MainDashboard';

export default function Index() {
  const systemColorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [themePreference, setThemePreference] = useState<'system' | 'light' | 'dark'>('system');
  const theme = themePreference === 'system' ? (systemColorScheme === 'dark' ? 'dark' : 'light') : themePreference;
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Syncing Physics Engine...');

  useEffect(() => {
    let progressVal = 0;

    const progressInterval = setInterval(() => {
      progressVal += Math.random() * 4 + 1.5;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.min(100, progressVal));
    }, 100);

    const initializeApp = async () => {
      const minTimerPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      const sessionPromise = (async () => {
        setStatusText('Checking Active Session...');
        const hasSession = await checkUserSession();
        setIsLoggedIn(hasSession);
        return hasSession;
      })();

      await Promise.all([minTimerPromise, sessionPromise]);

      setStatusText('Lab Ready');
      setProgress(100);

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    initializeApp();

    return () => clearInterval(progressInterval);
  }, []);  // initialize once on mount, do not rerun when system theme changes

  const checkUserSession = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return false; // Set to `true` to bypass login if session token exists
  };

  // 1. Loading Screen
  if (isLoading) {
    return <LoadingScreen progress={progress} statusText={statusText} />;
  }

  // 2. Login / Sign Up Access Portal (theme toggle props removed)
  if (!isLoggedIn) {
    return (
      <AccessPortal
        theme={theme}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  // 3. Main Interactive Physics Dashboard
  return (
    <MainDashboard
      theme={theme}
      themePreference={themePreference}
      onPreferenceChange={(p: 'system' | 'light' | 'dark') => setThemePreference(p)}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}
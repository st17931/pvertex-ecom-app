import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../features/auth/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';
import { subscribeToAuthChanges } from '../utils/firebase/auth';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

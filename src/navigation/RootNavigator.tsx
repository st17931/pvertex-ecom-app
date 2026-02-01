import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';
import { subscribeToAuthChanges } from '../utils/firebase/auth';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

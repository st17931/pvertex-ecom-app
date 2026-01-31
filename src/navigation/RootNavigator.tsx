import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function RootNavigator() {
  const token = useSelector((state: RootState) => state.authSlice);

  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

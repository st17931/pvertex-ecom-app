import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ProductFullScreen from '../features/productFull/screens/productFull';

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductFullScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

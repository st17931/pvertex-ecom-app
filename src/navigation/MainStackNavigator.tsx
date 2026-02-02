import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ProductFullScreen from '../features/productFull/screens/productFull';
import CheckoutScreenOne from '../features/cart/screens/CheckoutScreenOne';
import CheckoutScreenTwo from '../features/cart/screens/CheckoutScreenTwo';
import CheckoutScreenThree from '../features/cart/screens/CheckoutScreenThree';
import FoundScreen from '../features/discover/screens/FoundScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  CheckoutScreenOne: undefined;
  CheckoutScreenTwo: undefined;
  CheckoutScreenThree: undefined;
  FoundScreen: undefined;
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
      <Stack.Screen
        name="CheckoutScreenOne"
        component={CheckoutScreenOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckoutScreenTwo"
        component={CheckoutScreenTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckoutScreenThree"
        component={CheckoutScreenThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoundScreen"
        component={FoundScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

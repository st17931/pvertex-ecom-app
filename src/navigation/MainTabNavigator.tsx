import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/screens/HomeScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import DiscoverScreen from '../features/discover/screens/DiscoverScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

import HomeIcon from '../assets/icons/HomeIcon.svg';
import DiscoverIcon from '../assets/icons/DiscoverIcon.svg';
import ShoppingBagIcon from '../assets/icons/ShoppingBagIcon.svg';
import ProfileIcon from '../assets/icons/ProfileIcon.svg';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          backgroundColor: '#141416',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute', // important for rounded tabs
          overflow: 'hidden',
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={24}
              height={24}
              stroke={focused ? 'white' : '#353945'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerTitle: '',
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <DiscoverIcon
              width={28}
              height={28}
              stroke={focused ? 'white' : '#353945'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: '',
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <ShoppingBagIcon
              width={34}
              height={34}
              stroke={focused ? 'white' : '#353945'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              width={34}
              height={34}
              stroke={focused ? 'white' : '#353945'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

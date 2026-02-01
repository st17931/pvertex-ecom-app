import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logoutUser } from '../../../utils/firebase/auth';

const ArrowRight = ({ color = '#fff' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function ProfileScreen() {
  const menuItems = [
    'Address',
    'Payment method',
    'Voucher',
    'My Wishlist',
    'Rate this app',
    'Log out',
  ];

  const actionHandler = (action: string) => {
    if (action === 'Log out') {
      logoutUser();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Manisha Saini</Text>
            <Text style={styles.email}>manisha@gmail.com</Text>
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.row}
              onPress={() => actionHandler(item)}
            >
              <Text style={styles.rowText}>{item}</Text>
              <ArrowRight />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  email: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#151515',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#262626',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  rowText: {
    color: '#fff',
    fontSize: 16,
  },
});

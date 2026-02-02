import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Link } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function CheckoutScreenThree() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c0f1c" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check out</Text>
      </View>

      {/* STEP PROGRESS */}
      <View style={styles.progressRow}>
        <View style={styles.progressDot} />
        <View style={styles.progressLine} />
        <View style={styles.progressDot} />
        <View style={styles.progressLine} />
        <View style={styles.progressDotActive} />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Order Completed</Text>

      {/* ICON */}
      <View style={styles.iconContainer}>
        <View style={styles.bag}>
          <View style={styles.handle} />
          <View style={styles.pocket} />
        </View>

        <View style={styles.checkWrap}>
          <Text style={styles.check}>✓</Text>
        </View>
      </View>

      {/* MESSAGE */}
      <Text style={styles.message}>
        Thank you for your purchase.{'\n'}
        You can view your order in <Text style={styles.bold}>‘My Orders’</Text>
        {'\n'}
        section.
      </Text>

      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainTabs',
                    params: {
                      screen: 'HomeStack', // change to your tab/stack name
                      params: { screen: 'Home' }, // change to your home screen name
                    },
                  },
                ],
              }),
            )
          }
        >
          <Text
            style={styles.buttonText}
            // screen="MainTabs"
            // params={{ userName: 'Guest' }}
          >
            Continue shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f1c',
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1f2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 18 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b3f4f',
  },
  progressDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  progressLine: {
    width: 45,
    height: 2,
    backgroundColor: '#3b3f4f',
    marginHorizontal: 6,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 40,
  },

  iconContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bag: {
    width: 140,
    height: 130,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    position: 'absolute',
    top: -28,
    width: 70,
    height: 50,
    borderWidth: 4,
    borderColor: '#fff',
    borderBottomWidth: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  pocket: {
    width: 28,
    height: 28,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 6,
  },

  checkWrap: {
    position: 'absolute',
    right: 95,
    bottom: -10,
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#0c0f1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: { color: '#fff', fontSize: 26, fontWeight: '700' },

  message: {
    marginTop: 70,
    textAlign: 'center',
    color: '#c9c9c9',
    fontSize: 16,
    lineHeight: 26,
  },
  bold: { color: '#fff', fontWeight: '700' },

  buttonContainer: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    left: 40,
    // alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});

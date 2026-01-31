import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Link } from '@react-navigation/native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B0B0B"
        translucent={false}
      />

      {/* Heading */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.title}>your account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#888"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Link */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Already have account?{' '}
          <Link
            style={styles.loginText}
            screen="Login"
            params={{ userName: 'Guest' }}
          >
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  titleContainer: {
    marginTop: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },

  form: {
    marginTop: 30,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 28,
  },

  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  bottomContainer: {
    alignItems: 'center',
  },

  bottomText: {
    color: '#AAA',
    fontSize: 14,
  },

  loginText: {
    color: '#FFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

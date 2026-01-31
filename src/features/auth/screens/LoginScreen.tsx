import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Link } from '@react-navigation/native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log in to</Text>
        <Text style={styles.title}>your account</Text>
      </View>

      {/* Inputs */}
      <View style={styles.form}>
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sign Up */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Don’t have an account?
          <Link
            style={styles.signUpText}
            screen="Register"
            params={{ userName: 'Guest' }}
          >
            Signup
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
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },

  titleContainer: {
    marginTop: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 42,
  },

  form: {
    marginTop: 40,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 25,
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  forgotText: {
    color: '#666',
    fontSize: 13,
  },

  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
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

  signUpText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

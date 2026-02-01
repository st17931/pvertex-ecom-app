import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { Link } from '@react-navigation/native';
import { signupUser } from '../../../utils/firebase/auth';
// import * as Keychain from 'react-native-keychain';

type UserData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorState = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

export default function RegisterScreen() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const validate = (): boolean => {
    const newErrors: ErrorState = {};

    if (!userData.name.trim()) newErrors.name = true;

    if (!userData.email.includes('@')) newErrors.email = true;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(userData.password)) newErrors.password = true;

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    console.log('email and password is', userData.email, userData.password);
    try {
      let reponse = await signupUser(userData.email, userData.password);
      console.log('reponse', reponse);
      Alert.alert('Success', 'Account created successfully!');
      //   await Keychain.setGenericPassword(token, { service: 'psquare_ecom_key' });
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.title}>your account</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          style={[styles.input, errors.name && styles.errorInput]}
          value={userData.name}
          onChangeText={(text: string) =>
            setUserData(prev => ({ ...prev, name: text }))
          }
        />

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#888"
          keyboardType="email-address"
          style={[styles.input, errors.email && styles.errorInput]}
          value={userData.email}
          onChangeText={(text: string) =>
            setUserData(prev => ({ ...prev, email: text }))
          }
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={[styles.input, errors.password && styles.errorInput]}
          value={userData.password}
          onChangeText={(text: string) =>
            setUserData(prev => ({ ...prev, password: text }))
          }
        />

        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#888"
          secureTextEntry
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          value={userData.confirmPassword}
          onChangeText={(text: string) =>
            setUserData(prev => ({ ...prev, confirmPassword: text }))
          }
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

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
  errorInput: {
    borderBottomColor: 'red',
  },
});

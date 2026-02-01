import { initializeApp } from 'firebase/app';
// @ts-ignore: getReactNativePersistence exists in the RN bundle
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB2Kf2L9OIKRPAavJhbDqHXueqUcbCFUdQ',
  authDomain: 'psquare-ecom-app.firebaseapp.com',
  projectId: 'psquare-ecom-app',
  appId: '1:374183722844:web:1b96cd1371f8a17827cb99',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

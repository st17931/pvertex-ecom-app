import RootNavigator from './src/navigation/RootNavigator';
// import { useState, useEffect, useCallback } from 'react';
// import { View, Text } from 'react-native';
// import * as Keychain from 'react-native-keychain';
// import { setAuthToken } from './src/redux/authSlice';
// import { useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loadingToken, setLoadingToken] = useState(false);
  // const dispatch = useDispatch();

  // const getTokenFromSecureStorage = useCallback(async () => {
  //   setLoadingToken(true);
  //   try {
  //     const credentials = await Keychain.getGenericPassword({
  //       service: 'psquare_ecom_key',
  //     });
  //     dispatch(setAuthToken(credentials?.token || ''));
  //   } catch (error) {
  //     console.error('Got some error while geting secure token', error);
  //   } finally {
  //     setLoadingToken(false);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   getTokenFromSecureStorage();
  // }, [getTokenFromSecureStorage]);

  // if (loadingToken) {
  //   return (
  //     <View>
  //       <Text>Hi</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;

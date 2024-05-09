import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();

  const checkLoginState = async () => {
    try{
      // retrieve the value of the token
    const userNameToken = await SecureStore.getItemAsync('uNameToken');
    const userPasswordToken = await SecureStore.getItemAsync('uPwordToken');
    const systemCred = await SecureStore.getItemAsync('sysCred');
  
    // navigate to the app screen if a token is present
    // else navigate to the auth screen
    if(userNameToken && userPasswordToken){
      if(systemCred){
        router.push('/main');
      }
      else {
        router.push('/auth/systemLogin');
      }
    }
    else{
      router.push('/auth/userLogin');
    }
    }catch(err){
      router.push('/auth/userLogin');
    }
    
}
// call checkLoginState when the component mounts
useEffect(() => {
    checkLoginState();
});

  return <Loading/>;
    //  <Redirect href="/auth/userLogin" />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
});

export default App;
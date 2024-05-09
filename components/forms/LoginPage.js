import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import {save} from '..//..//utils/secureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation(); 
  const [usernameIsInvalid, setUsernameIsInvalid] = useState("");

  const handleSignIn = () => {
    axios.post('http://192.168.219.188:5050/auth/login', {
      username: username,
      password: password,
    })
    .then(response => {
      console.log(response.data); // handle success
      save("uNameToken", username);
      save("uPwordToken", password);
      // router.push('/auth/systemLogin');
      router.push('/auth/userLogin/systemLogin');
      // navigation.navigate('systemLogin');
    })
    .catch(error => {
      console.error('Error:', error); // handle error
      //router.push('/main');
      setErrorMsg('Unsucessful');
    });

    // if (username!="a" || password!="b") {
    //   setUsernameIsInvalid('Username or Password is Invalid')
    //   setUsername("");
    //   setPassword("");
    //   return;
    // }
    
    // router.push("/main");

    // You can implement your authentication logic and navigation here
  };

  const handleSignUp = () => {
    router.push('/auth/userSignUp');
  }

  const handleForgotPassword = () => {
    // Implement your forgot password logic here (e.g., send password reset email)
    alert('Forgot password functionality not yet implemented.');
  };

  const clearOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error @clearOnboarding: ", error);
    }
  };

  const router = useRouter();

  return (
    <LinearGradient
		colors={['#a3d1c0','#E7FFF4','#D9EDDF','#8cd1b7']} // Adjust colors as desired
		style={styles.container}
	>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize='none'
        // isInvalid = {userameIsInvalid}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        // isInvalid = {passwordIsInvalid}
      />
      <Text style={styles.invalidText}>{usernameIsInvalid}</Text>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>      
      <TouchableOpacity >
        <Text style={styles.signUpButton} onPress={handleSignUp}>Create new account</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={{color:"red"}}>{errorMsg}</Text>
      <TouchableOpacity onPress={clearOnBoarding}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 8,
  },
  forgotButton: {
    height: 30,
    marginTop: 20,
    color: '#606161',
  },
  signUpButton: {
    height: 30,
    marginTop: 20,
    color: '#60cca3',
  },
  loginButton: {
    marginTop: 25,
    width: 120,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#60cca3',
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  invalidText: {
    color: 'red',
    margin: 4,
  }
});

export default LoginPage;

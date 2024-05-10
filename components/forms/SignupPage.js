import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailIsInvalid, setEmailIsInvalid] = useState("");
  const [usernameIsInvalid, setUsernameIsInvalid] = useState("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState("");
  
  
  const signUp = async () => {
  
    axios.post('http://192.168.219.188:5050/auth/register', {
      username: username,
      email: email,
      password: password,
    })
    .then(response => {
      console.log(response.data); // handle success
      SecureStore.setItemAsync("uNameToken", username);
      SecureStore.setItemAsync("uPwordToken", password);
      router.push("/auth/systemLogin");

    })
    .catch(error => {
      console.error('Error:', error); // handle error
    });

  };

  const handleSignIn = () => {


    if (!email) {
      setEmailIsInvalid("Email is Invalid");
      return;
    }

    if (!username) {
      setUsernameIsInvalid("Username is Invalid");
      return;
    }
    console.log(password);
    console.log(confirmPassword);
    if (!password || !confirmPassword ) {
      if(password !== confirmPassword){
        setPasswordIsInvalid("Password is Invalid");
        return;
      }
      
    }

    // store the token then navigate to the app's main screen
    try {
      signUp();
      
    } catch (e) {
      <Redirect href="/auth/userLogin" />;
    }

    // You can implement your authentication logic and navigation here
  };

  const handleLogIn = () => {
    router.push("/auth/userLogin");
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        // isInvalid = {passwordIsInvalid}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Text style={styles.invalidText}>
        {emailIsInvalid}
        {"\n\n"}
        {usernameIsInvalid}
        {"\n\n"}
        {passwordIsInvalid}
      </Text>
      <TouchableOpacity>
        <Text style={styles.signInButton} onPress={handleLogIn}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 8,
  },
  forgotButton: {
    height: 30,
    marginTop: 20,
    color: "#606161",
  },
  loginButton: {
    marginTop: 25,
    width: 120,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#60cca3",
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  signInButton: {
    height: 30,
    marginTop: 20,
    color: "#60cca3",
  },
  invalidText: {
    color: "red",
    margin: 4,
  },
});

export default SignupPage;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import Onboarding from "../components/Onboarding/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const App = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginState = async () => {
    try {
      const userNameToken = await SecureStore.getItemAsync("uNameToken");
      const userPasswordToken = await SecureStore.getItemAsync("uPwordToken");
      const systemCred = await SecureStore.getItemAsync("sysCred");

      if (userNameToken && userPasswordToken) {
        if (systemCred) {
          router.push("/main");
        } else {
          router.push("/auth/systemLogin");
        }
      } else {
        router.push("/auth/userLogin");
      }
    } catch (err) {
      router.push("/auth/userLogin");
    }
  };

  useEffect(() => {
    const checkOnboardingAndLoginState = async () => {
      await checkOnboarding();
      if (!viewedOnboarding) {
        return; // Don't check login state if onboarding is not viewed
      }
      checkLoginState();
    };

    checkOnboardingAndLoginState();
  }, [viewedOnboarding]); // useEffect will re-run when viewedOnboarding changes

  return (
    <>
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <Redirect href="/auth/userLogin" />
      ) : (
        <Onboarding />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
});

export default App;

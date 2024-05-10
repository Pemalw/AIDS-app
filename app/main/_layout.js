import { View, Image, StyleSheet } from "react-native";
import { Stack } from "expo-router";

function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.headerLogo}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

export default function layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTintColor: "white", // Set text color to white
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginHorizontal:"auto",
    width:"100%",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    paddingRight:40,
    // backgroundColor:"red"
   
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
});

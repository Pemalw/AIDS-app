import { Slot } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

Notifications.requestPermissionsAsync().then(() => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldSetBadge: false,
      shouldPlaySound: true,
    }),
  });
});

export default function layout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <Slot />
    </View>
  );
}

// const StackLayout= ()=>{
//   return(
//       <Stack>
//           <Stack.Screen name="index" options={{headerShown:false}} />
//       </Stack>
//   )
// }

// export default StackLayout;
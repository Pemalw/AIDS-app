import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { save } from "../../utils/secureStore";
import { LinearGradient } from 'expo-linear-gradient';

const AddSystem = () => {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [systemID, setSystemID] = useState("");
  const [password, setPassword] = useState("");
  const [dataIsInvalid, setDataIsInvalid] = useState("");

  const onAddSystem = () => {
    setModalVisible(!isModalVisible);
  }; 

  const handleAddSystem = async() => {
    // if (systemID != "ads001" || password != "12345678Ads") {
    // if (systemID != "1" || password != "2") {
    if (systemID != "ads@rpi" || password != "Ads12345678") {
      setDataIsInvalid("System ID or password is invalid");
      setSystemID("");
      setPassword("");
      return;
    }
    await save('sysCred', JSON.stringify({u: systemID, p: password, e:new Date()+30}));
    router.push("/main");
  };

  return (
    <LinearGradient
		colors={['#a3d1c0','#E7FFF4','#D9EDDF','#8cd1b7']} // Adjust colors as desired
		style={styles.container}
	  >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <TouchableOpacity style={styles.addSystemButton} onPress={onAddSystem}>
        <Text style={styles.addSystemText}>Add System</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="System ID"
            value={systemID}
            onChangeText={(text) => setSystemID(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
          />
          <Text style={styles.invalidText}>{dataIsInvalid}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onAddSystem}>
              <Text style={styles.addText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddSystem}
            >
              <Text style={styles.addText}>Add System</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    paddingBottom: 30,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 50,
    paddingTop: 30,
    borderRadius: 30,
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
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingTop: 12,
  },
  addSystemButton: {
    width: 200,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#60cca3",
  },
  addSystemText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    marginTop: 25,
    width: 120,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#60cca3",
  },
  addText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  cancelButton: {
    marginTop: 25,
    width: 120,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#e64949",
    marginRight: 20,
  },
  invalidText: {
    color: "red",
    margin: 4,
  },
});

export default AddSystem;

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {LinearGradient} from 'expo-linear-gradient';

const SystemInformation = (props) => {
    const router = useRouter();
    const navigation = useNavigation(); 

    const [isModalVisible, setModalVisible] = useState(false); 
    const [systemName, setSystemName] = useState(props.initialSystemName || 'System 1');

    const onSystemNameChange = () => {
      setModalVisible(!isModalVisible);
    }

    const handleNameChange = (newSystemName) => {
        setSystemName(newSystemName);
    };

    const handleSystemNameSave = (setSystemName) => {
        props.onSystemNameChange && props.onSystemNameChange(systemName);
        setModalVisible(false);
    };
    
    const handleClose = () => {
        setModalVisible(false);
    };

    const systemRemove =async() => {
        const systemCred = await SecureStore.deleteItemAsync('sysCred');
        router.push('/auth/userLogin/systemLogin');
    }
    
    return(
      <LinearGradient
		colors={['#E7FFF4','#D9EDDF']}
        style={{flex:1}}
		>
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>System ID</Text>
                <Text style={styles.dataText}>12345</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Password</Text>
                <Text style={styles.dataText}>
                *******{"  "}
                    <Entypo name='eye' size={15} color={'black'}/>
                </Text>
            </View>
            <TouchableOpacity style={styles.infoContainer} onPress={onSystemNameChange}>
                <Text style={styles.infoText}>System Name</Text>
                <Text style={styles.dataText}>
                {systemName}
                    <Entypo name='chevron-right' size={15} color={'black'}/>
                </Text>
            </TouchableOpacity>

            <Modal 
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            transparent={true}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit System Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleNameChange}
                        value={systemName}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity  style={styles.cancelButton} onPress={handleClose}>
                        <Text style={styles.addText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.addButton} onPress={handleSystemNameSave}>
                        <Text style={styles.addText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Battery Percent</Text>
                <Text style={styles.dataText}>95%</Text>
            </View>

            <TouchableOpacity style={styles.infoContainer}>
                <Text style={styles.infoText}>System</Text>
                <Entypo name='chevron-right' size={15} color={'black'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delSystemContainer} onPress={systemRemove}>
                <Text style={styles.delSystemText}>Remove System</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 18,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb'
    },
    infoText: {
        fontSize: 15,
    },
    dataText: {
        color: '#828181',
    },
    delSystemContainer:{
        padding: 20,
    },
    delSystemText: {
        color: 'red',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 30,
    },
    modalTitle: {
        fontSize: 15,
        marginBottom: 10,
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 15,
        paddingLeft: 8,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    modalButtonText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        marginHorizontal: 5,
    },
    addButton: {
        marginTop: 25,
        width: 120,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#60cca3',
    },
    addText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    cancelButton: {
        marginTop: 25,
        width: 120,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#e64949',
        marginRight: 20,
    },
});

export default SystemInformation;
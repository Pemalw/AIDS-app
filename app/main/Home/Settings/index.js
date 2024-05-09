import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const Settings = () => {
    const navigation = useNavigation(); 
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [editedData, setEditedData] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const items = [
        'UserName',
        'Password',
        'PhoneNumber',
        'Email',
        'Dzongkhag',
        'Gewog',
    ];

    const [userData, setUserData] = useState({
        UserName: 'Pema',
        Password: '******',
        PhoneNumber: '17171717',
        Email: 'add email',
        Dzongkhag: 'Paro',
        Gewog: 'Bondey',
    });

    const handleSystemPress = () => {
        navigation.navigate('System Information'); // Navigate to the System Information screen
    };

    const handleEditPress = (item) => {
        setSelectedItem(item);
        setEditedData(userData[item]);
        setModalVisible(true);
    };

    const handleSaveChanges = () => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [selectedItem]: editedData,
        }));

        // Close the modal
        setModalVisible(false);
    };

    const getSecureText = (text) => {
        // Replace each character in the text with an asterisk (*)
        return '*'.repeat(text.length);
    };

    const accountLogOut =async() => {
        await SecureStore.deleteItemAsync('uNameToken');
        const userPasswordToken = await SecureStore.deleteItemAsync('uPwordToken');
        const systemCred = await SecureStore.deleteItemAsync('sysCred');
        router.push('/auth/userLogin');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.infoContainer}  onPress={handleSystemPress}>
                <Text style={styles.infoText}>System</Text>
                <Entypo name='chevron-right' size={15} color={'black'}/>
            </TouchableOpacity>

            {items.map((item) => (
                <TouchableOpacity
                 key={item}
                 style={styles.infoContainer}
                 onPress={() => handleEditPress(item)}
                >
                 <Text style={styles.infoText}>{item}</Text>
                 {item === 'Password' ? (
                     <Text style={styles.dataText}>
                        {getSecureText(userData[item])}
                        <Entypo name='chevron-right' size={15} color={'black'} />
                     </Text>          
                 ) : (
                     <Text style={styles.dataText}>
                         {userData[item]}
                         <Entypo name='chevron-right' size={15} color={'black'} />
                     </Text>
                 )}
             </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.infoContainer} onPress={accountLogOut}>
                <Text style={styles.delSystemText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delSystemContainer}>
                <Text style={styles.delSystemText}>Delete Account</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{"Edit " + selectedItem}</Text>
                        <TextInput
                            style={styles.textInput}
                            value={editedData}
                            onChangeText={(text) => setEditedData(text)}
                        />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.addText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveChanges}
                        >
                            <Text style={styles.addText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        marginHorizontal: 5,
    },
    saveButton: {
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

export default Settings;

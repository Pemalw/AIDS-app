import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItems(key, value){
    await AsyncStorage.setItem(key, value);
}

export async function getItems(key){
    const result = await AsyncStorage.getItem(key);
    if (result){
        return result;
    }
}

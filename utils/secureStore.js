import * as SecureStore from 'expo-secure-store';

export async function save(key, value){
    await SecureStore.setItemAsync(key, value);
}

export async function get(key){
    const result = await SecureStore.getItemAsync(key);
    if (result){
        return result;
    }
}

export async function del(key){
    const result = await SecureStore.deleteItemAsync(key);
    if (result){
        return result;
    }
}
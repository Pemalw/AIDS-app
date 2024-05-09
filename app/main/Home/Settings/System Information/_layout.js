import {Stack} from 'expo-router';

const StackLayout= ()=>{
    return(
        <Stack >
            <Stack.Screen name="index" options={{headerShown:false, title:"System Information"}} />
        </Stack>
    )
}

export default StackLayout;
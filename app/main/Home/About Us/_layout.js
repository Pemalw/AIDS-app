// import {Slot } from 'expo-router';

//  export default function layout () {
//     return <Slot/>
//  }

import {Stack} from 'expo-router'

const StackLayout= ()=>{
    return(
        <Stack >
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}

export default StackLayout;
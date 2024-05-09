import {Tabs} from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

export default function layout () {

  const color = '#ffff';
    return (
      <View style={{ flex: 1, backgroundColor: '#D9EDDF' }}>
      <Tabs 
       initialRouteName='Results'
        screenOptions={{
          tabBarActiveTintColor: '#279698',
          // tabBarActiveBackgroundColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderRadius: 80,
            margin: 8,
            paddingBottom: 10,
            paddingTop: 10,
            height: 60,
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen 
          name="About Us"
          options={{headerTitle: '',
                    headerStatusBarHeight: -50,
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="information" color={color} size={size} />
              },
          }}
        />
        <Tabs.Screen 
          name="Help" 
          options={{headerTitle: '',
                    headerStatusBarHeight: -50,
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="help-circle-outline" color={color} size={size} />
                    },
                  }}
        />
        <Tabs.Screen 
          name="Results" 
          // component={CurrentTab} 
          options={{
                    headerTitle: '',
                    headerStatusBarHeight: -50,
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialCommunityIcons name="home" color={color} size={size} />
                    },
                  }}
        />
        <Tabs.Screen 
          name="Data Analysis"
          options={{headerTitle: '',
          tabBarLabel: 'Data Analysis',
                    headerStatusBarHeight: -50,
                    tabBarIcon: ({ color, size }) => (
                      <Entypo name="bar-graph" color={color} size={size} />
                    ),
                  }}
          initialParams={{data: 'hello'}}
        />
        <Tabs.Screen 
          name="Settings" 
          options={{headerTitle: '',
                    headerStatusBarHeight: -50,
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="settings" color={color} size={size} />
                    },
          }}
        />
      </Tabs>
      </View>
    )
}

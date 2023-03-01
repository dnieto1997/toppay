import 'react-native-gesture-handler';

import React ,{useState,useEffect}from 'react';


import {NavigationContainer} from '@react-navigation/native'

import {createStackNavigator} from '@react-navigation/stack'
import Login from './views/Login'
import axios from 'axios'
import Dashboard from './views/Dashboard';

const Stack= createStackNavigator()

const App = () => {
 



  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen name='Login' component={Login} 
   options ={(navigation)=>({
       
    headerTitleAlign:'center', headerShown: false
 
 
      })}/>



<Stack.Screen name='Dashboard' component={Dashboard}   options ={(navigation)=>({
       
        headerShown: false
    
    
         })}/>

    </Stack.Navigator>





  </NavigationContainer>
   )
 }


export default App;

import 'react-native-gesture-handler';
import React,{useState} from 'react'
import {
 FlatList,RefreshControl,View,ScrollView,StyleSheet,Image} from 'react-native';



import Graficos from './src/Graficos';


import Payin from '../views/src/Payin'
import Utilidades from '../views/src/Utilidades'

import { Button,Text } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard1 from './Dashboard1';
import Tab from '../nav/Tab';
import Login from './Login';










const Dashboard = () => {
 
 
 
  const Drawer = createDrawerNavigator();
 
  
  return (
   
 

<>

     
    <NavigationContainer independent={true}  >
        <Drawer.Navigator drawerContent={(props)=> <Tab{...props}/> }   >
        <Drawer.Screen name="Dashboard" component={Dashboard1} options={{title:'Dashboard', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}} />
        
          <Drawer.Screen  name="Payin" component={Payin} options={{title:'Pay In', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}} />
          <Drawer.Screen name="Payout" component={Graficos} options={{title:'Pay Out', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}} />
          <Drawer.Screen name="Utilidades" component={Utilidades} options={{title:'Utilidades', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}} />
          <Drawer.Screen name="Login" component={Login}  options ={()=>({
       
       headerShown: false
   
   
        })}/>
        
        </Drawer.Navigator>
      
    
        </NavigationContainer>

        
       
       
        </>
    
     
    
    )
}

const styles=StyleSheet.create({

container:{
  backgroundColor:'red',
 bottom:5
}

})
export default Dashboard







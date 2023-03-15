import 'react-native-gesture-handler';
import React,{useState} from 'react'
import {
 FlatList,RefreshControl,View,ScrollView,StyleSheet
  } from 'react-native';



import Graficos from './src/Graficos';
import Payout from '../views/Payout'

import Payin from '../views/src/Payin'
import Utilidades from '../views/src/Utilidades'


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
        <Drawer.Navigator drawerContent={(props)=><Tab{...props}/>} >
        <Drawer.Screen name="Dashboard" component={Dashboard1} />
        <Drawer.Screen name="Graficos" component={Graficos} />
          <Drawer.Screen name="Payin" component={Payin} />
          <Drawer.Screen name="Payout" component={Payout} />
          <Drawer.Screen name="Utilidades" component={Utilidades} />
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







import 'react-native-gesture-handler';
import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,TouchableOpacity,Image,FlatList
  } from 'react-native';



import Graficos from './src/Graficos';
import Payout from '../views/Payout'

import Payin from '../views/src/Payin'
import Utilidades from '../views/src/Utilidades'


import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import Dashboard1 from './Dashboard1';
import Tab from '../nav/Tab';




const Drawer = createDrawerNavigator();

 

 const Dashboard = () => {
 
 

  
  return (
   
   
  
  <NavigationContainer independent={true}> 
      <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props)=><Tab{...props}/>} >
      <Drawer.Screen name="Dashboard" component={Dashboard1} />
      <Drawer.Screen name="Graficos" component={Graficos} />
        <Drawer.Screen name="Payin" component={Payin} />
        <Drawer.Screen name="Payout" component={Payout} />
        <Drawer.Screen name="Utilidades" component={Utilidades} />
      </Drawer.Navigator>
    </NavigationContainer>
 
  

   
 
  )
}




export default Dashboard 

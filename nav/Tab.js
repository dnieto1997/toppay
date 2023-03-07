import 'react-native-gesture-handler';
import React from 'react'



import Payout from '../views/Payout'
import { NavigationContainer } from '@react-navigation/native'
import Payin from '../views/src/Payin'
import Utilidades from '../views/src/Utilidades'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../views/Dashboard';


const Tab = () => {
  const Drawer = createDrawerNavigator();
 
 return (
    
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard " component={Dashboard} />
  <Drawer.Screen name="Payout" component={Payout} />
  <Drawer.Screen name="Payin" component={Payin} />
  <Drawer.Screen name="Utilidades" component={Utilidades} />
</Drawer.Navigator>
  )
}

export default Tab

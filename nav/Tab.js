import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Payout from '../views/Payout'
import { NavigationContainer } from '@react-navigation/native'
import Payin from '../views/src/Payin'
import Utilidades from '../views/src/Utilidades'


const Tab = () => {
 const Tab= createBottomTabNavigator()
 
 return (
    
    <NavigationContainer independent={true}>
    <Tab.Navigator>
    <Tab.Screen name="Das" component={Payout}/>
    <Tab.Screen name="Payout" component={Payout}/>
    <Tab.Screen name="Payin" component={Payin}/>
    <Tab.Screen name="Utilidades" component={Utilidades}/>
    </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Tab

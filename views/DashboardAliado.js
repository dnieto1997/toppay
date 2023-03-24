import React, { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashboardAliado1 from './DashboardAliado1';
import PayoutAliado from './src/PayoutAliado';
import TabAliado from '../nav/TabAliado';
import PayinAliado from './src/PayinAliado';




const DashboardAliado = () => {

  const Drawer = createDrawerNavigator();
  return (

    <>

     
    <NavigationContainer independent={true}  >
        <Drawer.Navigator drawerContent={(props)=> <TabAliado{...props}/> } >
        <Drawer.Screen name="Dashboard" component={DashboardAliado1} />
        <Drawer.Screen name="Payout" component={PayoutAliado} />
        <Drawer.Screen name="Payin" component={PayinAliado} />
        
       
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
export default DashboardAliado
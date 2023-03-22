import React, { useState, useEffect } from 'react'

import { PieChart } from 'react-native-chart-kit';
import { View, ScrollView, StyleSheet, Alert, Button } from 'react-native';

import { Text } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashboardAliado1 from './DashboardAliado1';





const DashboardAliado = () => {

  const Drawer = createDrawerNavigator();
  return (

    <>

     
    <NavigationContainer independent={true}  >
        <Drawer.Navigator    >
        <Drawer.Screen name="Dashboard" component={DashboardAliado1} />
        
          
        
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
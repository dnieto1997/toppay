
import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,TouchableOpacity,Image,FlatList
  } from 'react-native';


import Dashboard1 from './Dashboard1';
import Graficos from './src/Graficos';
import Tab from '../nav/Tab'

 

 const Dashboard = (navigation) => {
 
 

  
  return (
   
   <ScrollView>
  
   <Dashboard1/>
   
  <Graficos/>
  <Tab/>

   </ScrollView>
 
  )
}


export default Dashboard

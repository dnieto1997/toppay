import 'react-native-gesture-handler';
import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,TouchableOpacity,Image,FlatList
  } from 'react-native';

 import globalStyles from './global/styles';
import Dashboard1 from './Dashboard1';
import Graficos from './src/Graficos';

 

 const Dashboard = () => {
 
 

  
  return (
   
   <ScrollView>
   <Dashboard1/>
<Graficos/>
   </ScrollView>
  )
}


export default Dashboard

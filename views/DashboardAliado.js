import React, { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashboardAliado1 from './DashboardAliado1';
import PayoutAliado from './src/PayoutAliado';
import TabAliado from '../nav/TabAliado';
import PayinAliado from './src/PayinAliado';
import Balances from './src/Balances';
import Login from './Login';
import Auth from './Auth';




const DashboardAliado = () => {

  const Drawer = createDrawerNavigator();
  return (

    <>

     
    <NavigationContainer independent={true}  >
        
        <Drawer.Navigator drawerContent={(props)=> <TabAliado{...props}/> } >
        
        <Drawer.Screen name="Dashboard" component={DashboardAliado1}options={{title:'Dashboard', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}}  />
        <Drawer.Screen name="Payout" component={PayoutAliado} options={{title:'Pay Out', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}}/>
        <Drawer.Screen name="Payin" component={PayinAliado}  options={{title:'Pay In', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}}/>
        <Drawer.Screen name="Balances" component={Balances}  options={{title:'Balances', headerTitleAlign:'center',headerTintColor:'white',headerStyle:{backgroundColor:'#4e2d87'}}} />
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
export default DashboardAliado
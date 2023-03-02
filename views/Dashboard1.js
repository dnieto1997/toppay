
import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react'

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,TouchableOpacity,Image,FlatList
  } from 'react-native';

 import globalStyles from './global/styles';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 



 const Dashboard1 = () => {
    const[token,setToken] =useState('')
    const [todaymoneyin,setTodaymoneyin] =useState('')
   
    useEffect(()=>{
        const obtenerToken =async () =>{
        try {
          const tokenStorage =await AsyncStorage.getItem('token') 
          setToken(tokenStorage)
        
       
        } catch (error) {
          console.log(error)
          
        }
        
        }
        obtenerToken()
        
        },[])
        

        useEffect(()=>{

            todayMoneyin()
            
            },[token]) 
        
          const  todayMoneyin = async () => {
         
            try {
                
           const res = await fetch('http://129.80.238.214:3000/api/dashboard/todaymoneyin', {
            method: 'GET',
            headers: {
              
                'x-token':`${token}`
            }
          });
        
                const { result } = await res.json();
                
                const total = result[0].total;
                setTodaymoneyin(total)
                
        
              } catch (err) {
                console.log(err);
              }
            
            
            }
             

          

             

           

    return (
    <ScrollView >
    <View style={styles.contenedor}>
      <View style={globalStyles.contenedor2}>
     <View style={styles.contenedor2} >
     <View >
    <Image source={require('../assets/img/setting.png')} style={styles.imagen}/>
    </View>
     <View style={{marginLeft:10}}>
      <Text style={styles.texto1}>Today's Money Cash in Success</Text>
      <Text >{todaymoneyin}</Text>
      </View>
     </View>
     </View>
     </View>


     <View style={styles.contenedor}>
      <View style={globalStyles.contenedor2}>
     <View style={styles.contenedor2} >
     <View >
    <Image source={require('../assets/img/setting.png')} style={styles.imagen}/>
    </View>
     <View style={{marginLeft:10}}>
      <Text style={styles.texto1}>Today's Transaction Cash Out</Text>
      <Text>{token} </Text>
      </View>
     </View>
     </View>
     </View>

     <View style={styles.contenedor}>
      <View style={globalStyles.contenedor2}>
     <View style={styles.contenedor2} >
     <View >
    <Image source={require('../assets/img/cash.png')} style={styles.imagen}/>
    </View>
     <View style={{marginLeft:10}}>
      <Text style={styles.texto1}>Today's Transaction Cash In</Text>
      <Text>454 (COP) Success API</Text>
      <Text>1,811 (COP) Pending</Text>
      </View>
     </View>
     </View>
     </View>

     <View style={styles.contenedor}>
      <View style={globalStyles.contenedor2}>
     <View style={styles.contenedor2} >
     <View >
    <Image source={require('../assets/img/cash2.png')} style={styles.imagen}/>
    </View>
     <View style={{marginLeft:10}}>
      <Text style={styles.texto1}>Today's Transaction Cash Out</Text>
      <Text>consulta de api  </Text>
      
      </View>
     </View>
     </View>
     </View>
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    imagen:{
      width:100,
      height:100,
      marginLeft:5
      
  
    },contenedor:{
      marginTop:20
    },contenedor2:{
      flexDirection:'row'
    },texto1:{
      marginBottom:40
    }
  })
export default Dashboard1

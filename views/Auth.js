


import React,{useEffect,useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



const Auth = ({navigation}) =>{
    
  
    const [tokenstorage, setToken] = useState('');
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [tokenapi, setTokenapi] = useState('');
   
   
   
   
    useEffect(()=>{
        const obtenerToken = async () =>{
          
          try {
          const tokenStorage = await AsyncStorage.getItem('token') 
          const userStorage = await AsyncStorage.getItem('user') 
          const passwordStorage =await AsyncStorage.getItem('password') 
          setToken(tokenStorage)
          setUser(userStorage)
          setPassword(passwordStorage)
        
        } catch (error) {
          console.log(error)
          
        }
        
        }
        obtenerToken()


        if(tokenapi!=tokenstorage){
         
         Alert.alert(
           'Alerta',
         'Token Vencido',
          [
          {text:'Ok',onPress:()=>{
           navigation.navigate('Login')
           
          
         }} 
           ]
            
         )
   
      console.log('algo')
          
        }else {
         navigation.navigate('Dashboard')
          
        }


   


        
        })

        useEffect(() => {
            consumirApi()
          },[tokenstorage]);

        const  consumirApi = async () => {
         
            try {
           const res = await fetch('http://129.80.238.214:3000/api/auth/login/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user : `${usuario}`,
              password: `${password}`,
            }),
          });
                const resJson = await res.json();
                setTokenapi(resJson.token)
              } catch (err) {
                console.log(err);
              }  

            }
    return(
       <></>
        )
}

export default Auth;
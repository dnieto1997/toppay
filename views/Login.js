import React, { useState, useEffect} from 'react'
import {
  StyleSheet, View, Text, Image, Alert
} from 'react-native';
import globalStyles from './global/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper'




const Login = ({ navigation }) => {
  const [usuario, guardarUsuario] = useState('')
  const [password, guardarPassword] = useState('')
  
 


  useEffect(() => {
   
    consumirApi()

  },[])


  const consumirApi = async () => {
    

    try {

      
      const res = await fetch('http://129.80.238.214:3000/api/auth/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `${usuario}`,
          password: `${password}`,
        }),
      });


      const resJson = await res.json();
      const token =resJson.token
      
     
      const res2 = await fetch(
        'http://129.80.238.214:3000/api/menu',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          }
        },
      );


     const {tipo,status} = await res2.json();
     console.log(tipo)
     console.log(resJson)
     
     


      if (status === 1 && tipo==="MA") {

        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', usuario)
        await AsyncStorage.setItem('password', password)
        console.log(token)
        console.log(usuario)
        console.log(password)
       
        navigation.navigate('Dashboard')
        
      } else if (status === 0) {
        mostrarAlerta()

      }else if(status === 1 && tipo==="TE"){
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', usuario)
        await AsyncStorage.setItem('password', password)
        console.log(token)
        console.log(usuario)
        console.log(password)
       
        navigation.navigate('DashboardAliado')
        return
      }




    } catch (err) {
      console.log(err);
    }


  }





  const mostrarAlerta = () => {

    Alert.alert('Error', 'Usuario y contraseña incorrecta', [{ text: 'Ok' }])
  }







  return (

    
      <View style={globalStyles.contenedor}>

        <Image source={require('../assets/img/logo.png')} style={styles.imagen} />

        <TextInput
          label="Username"
          placeholder='Username'
          style={styles.input}
          onChangeText={texto => guardarUsuario(texto)}
          value={usuario}


        />


        <TextInput
          label="Password"
          placeholder='Password'
          style={styles.input}
          onChangeText={texto => guardarPassword(texto)}
          value={password}
          secureTextEntry={true}

        />
        <Button onPress={() => consumirApi()} style={styles.boton}><Text style={styles.btnText} >Iniciar sesion</Text></Button>

      </View>

   

  )
}


const styles = StyleSheet.create({

  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'

  }, imagen: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }, boton: {
    backgroundColor: '#8a2be2'

  }, btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase'


  }



})

export default Login

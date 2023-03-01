import React,{useState,useEffect} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,Image,Alert
  } from 'react-native';
  import globalStyles from './global/styles';
  import axios from 'axios';
  
 

  import {TextInput,Button} from 'react-native-paper'




const Login = ({navigation}) => {
  const [usuario,guardarUsuario] =useState('')
  const [password,guardarPassword] =useState('')
  useEffect(()=>{

    consumirApi()
    
    },[])
       

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
       
        console.log(resJson)
        if (resJson.status === 1) {
           navigation.navigate('Dashboard')
           return
        } else if(resJson.status === 0){
          mostrarAlerta()
          
        }

      } catch (err) {
        console.log(err);
      }
    
    
    };



const mostrarAlerta =() =>{

  Alert.alert('Error','Usuario y contraseña incorrecta',[{text:'Ok'}])
}




 

 
 return (
    
    
    <View style={globalStyles.contenedor}>
    
     
  


<Image source={require('../assets/img/logo.png') } style ={styles.imagen}/>

        
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
     <Button onPress={()=>consumirApi()} style={styles.boton}><Text style={styles.btnText} >Iniciar sesion</Text></Button>
   
    </View>
    
  )
}


const styles = StyleSheet.create({

input:{
  marginBottom:20,
  backgroundColor:'transparent'

},imagen:{
  width:200,
  height:200,
  alignSelf:'center'
}, boton:{
  backgroundColor:'#8a2be2'
  
},btnText:{
color:'#fff',
fontWeight:'bold',
fontSize:14,
textTransform:'uppercase'


}



})

export default Login

import 'react-native-gesture-handler';
import React,{useState,useEffect}from 'react'



import { DrawerContentScrollView } from '@react-navigation/drawer';


import { View,Text,StyleSheet,Image,Alert} from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Tab = ({navigation}) => {
 
  const [token, setToken] = useState('');
  const [tipo, setTipo] = useState('');
    
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
    
    })
  

    useEffect(()=>{
      TipoUser()
    })
    
    
    const TipoUser =async()=>{
try {

  const res2 = await fetch(
    'http://129.80.238.214:3000/api/menu',
    {
      method: 'GET',
      headers: {
        'x-token': `${token}`,
      }
    },
  );


  const { tipo, status } = await res2.json();
  setTipo(tipo)
  
} catch (error) {
  
}




    }


  
  
  
  
  
  
  
  const CerrarSesion = async() =>{
    
    
     
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('password')
    Alert.alert(
      'LOGOUT',
      'Quieres Cerrar Sesion?',
     
     
      [
     {text:'No',style:'cancel'},
     {text:'Si',onPress: async() =>{
      AsyncStorage.clear()
      .then(
          res => {
              navigation.navigate('Login')
              AsyncStorage.clear()
          }
      )

     }}
     
    
      ]
      
    )
    
     }

 return (
    <DrawerContentScrollView style={styles.contenedor2} >
<View style={{backgroundColor:'white'}}>
 <Image source={require('../assets/img/logo.png')} style={styles.imagen} />
 </View>

{tipo==="MA"?
<View style={styles.contenedor} >
 
 
 <Button title='Dashboard'  onPress={()=>{navigation.navigate('Dashboard');  navigation.closeDrawer();}  } style={styles.boton} icon={require('../assets/img/dashboard.png')} labelStyle={{ color: '#fff' }}> <Text style={styles.texto2} mode="outlined"> Dashboard</Text> </Button>
 <Button title='Payout' onPress={()=>navigation.navigate('Payout')} style={styles.boton} icon={require('../assets/img/payout.png')} labelStyle={{ color: '#fff' }}><Text style={styles.texto2} > Pay out</Text></Button>
 <Button title='Payin' onPress={()=>navigation.navigate('Payin')} style={styles.boton} icon={require('../assets/img/payin.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Pay in</Text></Button>
 <Button title='Utilidades' onPress={()=>navigation.navigate('Utilidades')} style={styles.boton} icon={require('../assets/img/utilidades.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Utilidades</Text></Button>
 <Button title='Cerrar Sesion' onPress={()=>CerrarSesion()} style={styles.boton} icon={require('../assets/img/cerrar.png')} labelStyle={{ color: 'red' }} ><Text style={styles.texto2}> Cerrar Sesion</Text></Button>
 </View>   
 
 
 :  
 <View style={styles.contenedor} >
 
 
 <Button title='Dashboard'  onPress={()=>navigation.navigate('Dashboard') } style={styles.boton} icon={require('../assets/img/dashboard.png')} labelStyle={{ color: '#fff' }}> <Text style={styles.texto2} mode="outlined"> Dashboard</Text> </Button>
 <Button title='Payout' onPress={()=>navigation.navigate('Payout1')} style={styles.boton} icon={require('../assets/img/payout.png')} labelStyle={{ color: '#fff' }}><Text style={styles.texto2} > Pay out</Text></Button>
 <Button title='Payin' onPress={()=>navigation.navigate('Payin1')} style={styles.boton} icon={require('../assets/img/payin.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Pay in</Text></Button>
 <Button title='Balances' onPress={()=>navigation.navigate('Balances')} style={styles.boton}    labelStyle={{ color: '#fff' }}  icon={require('../assets/img/balance.webp')} ><Text style={styles.texto2}> Balances</Text></Button>
 
 
 <Button title='Cerrar Sesion' onPress={()=>CerrarSesion()} style={styles.boton} icon={require('../assets/img/cerrar.png')} labelStyle={{ color: 'red' }} ><Text style={styles.texto2}> Cerrar Sesion</Text></Button>
 </View>   
 
 }





{/* 
 <View style={styles.contenedor} >
 
 
  <Button title='Dashboard'  onPress={()=>{navigation.navigate('Dashboard');  navigation.closeDrawer();}  } style={styles.boton} icon={require('../assets/img/dashboard.png')} labelStyle={{ color: '#fff' }}> <Text style={styles.texto2} mode="outlined"> Dashboard</Text> </Button>
  <Button title='Payout' onPress={()=>navigation.navigate('Payout')} style={styles.boton} icon={require('../assets/img/payout.png')} labelStyle={{ color: '#fff' }}><Text style={styles.texto2} > Pay out</Text></Button>
  <Button title='Payin' onPress={()=>navigation.navigate('Payin')} style={styles.boton} icon={require('../assets/img/payin.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Pay in</Text></Button>
  <Button title='Utilidades' onPress={()=>navigation.navigate('Utilidades')} style={styles.boton} icon={require('../assets/img/utilidades.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Utilidades</Text></Button>
  <Button title='Cerrar Sesion' onPress={()=>CerrarSesion()} style={styles.boton} icon={require('../assets/img/cerrar.png')} labelStyle={{ color: 'red' }} ><Text style={styles.texto2}> Cerrar Sesion</Text></Button>
  </View>   
  
 */}
  

  

    </DrawerContentScrollView>
  )
}

const styles =StyleSheet.create({
  contenedor2:{

    backgroundColor:'#4e2d87',
    padding:20,
    flex:1,
    
    
    
},texto1:{
  textAlign:'center',
  fontSize:25,
  fontWeight:'bold',
  color:'#FFF',
  textTransform:'uppercase',
  margin:30
  

},contenedor:{
 
 backgroundColor: '#4e2d87',
    borderRadius:5,
    padding:5,
   justifyContent: 'space-between',
  
   paddingVertical:20
    
   


},boton:{

  
 
  borderRadius: 4,
  backgroundColor: 'transparent',
  top:30,
  margin:5,
  alignItems:'flex-start',
  alignContent:'flex-start',
 
  borderColor: '#6200EE',
  alignSelf:'flex-start'
  

  
 

  
},texto2:{

 
  fontSize:16,
  fontWeight:'bold',
  color:'#FFF',
  textTransform:'uppercase'
 
},botonCerrar:{
 

marginRight:30,
backgroundColor:'red',
borderRadius:4,
borderTopEndRadius:4

 

},imagen: {
  width: 110,
  height: 110,
  alignSelf: 'center'
}
})
export default Tab

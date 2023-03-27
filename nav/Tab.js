import 'react-native-gesture-handler';
import React from 'react'



import { DrawerContentScrollView } from '@react-navigation/drawer';


import { View,Text,StyleSheet,Image,Alert} from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Tab = ({navigation}) => {
 
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
 <View style={styles.contenedor} >
 
 
  <Button title='Dashboard'  onPress={()=>{navigation.navigate('Dashboard');  navigation.closeDrawer();}  } style={styles.boton} icon={require('../assets/img/dashboard.png')} labelStyle={{ color: '#fff' }}> <Text style={styles.texto2} mode="outlined"> Dashboard</Text> </Button>
  <Button title='Payout' onPress={()=>navigation.navigate('Payout')} style={styles.boton} icon={require('../assets/img/payout.png')} labelStyle={{ color: '#fff' }}><Text style={styles.texto2} > Pay out</Text></Button>
  <Button title='Payin' onPress={()=>navigation.navigate('Payin')} style={styles.boton} icon={require('../assets/img/payin.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Pay in</Text></Button>
  <Button title='Utilidades' onPress={()=>navigation.navigate('Utilidades')} style={styles.boton} icon={require('../assets/img/utilidades.png')} labelStyle={{ color: '#fff' }} ><Text style={styles.texto2}> Utilidades</Text></Button>
  
  </View>   
  

  

  

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

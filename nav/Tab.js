import 'react-native-gesture-handler';
import React from 'react'



import { DrawerContentScrollView } from '@react-navigation/drawer';


import { View,Text,StyleSheet,Image} from 'react-native';
import { Button } from 'react-native-paper';







const Tab = ({navigation}) => {
 


 return (
    <DrawerContentScrollView style={styles.contenedor2} >


 <Text style={styles.texto1}>Menu</Text>
 
 <View style={styles.contenedor} >
 
 
  <Button title='Dashboard'  onPress={()=>navigation.navigate('Dashboard') } style={styles.boton} icon={require('../assets/img/dashboard.png')} > <Text style={styles.texto2}> Dashboard</Text> </Button>
  <Button title='Payout' onPress={()=>navigation.navigate('Payout')} style={styles.boton} icon={require('../assets/img/payout.png')}><Text style={styles.texto2} > Pay out</Text></Button>
  <Button title='Payin' onPress={()=>navigation.navigate('Payin')} style={styles.boton} icon={require('../assets/img/payin.png')} ><Text style={styles.texto2}> Pay in</Text></Button>
  <Button title='Utilidades' onPress={()=>navigation.navigate('Utilidades')} style={styles.boton} icon={require('../assets/img/utilidades.png')} ><Text style={styles.texto2}> Utilidades</Text></Button>
  <Button title='Graficos' onPress={()=>navigation.navigate('Graficos')} style={styles.boton} icon={require('../assets/img/graficos.png')}><Text style={styles.texto2}> Graficas</Text></Button>
  
  
  <Button title='Graficos' onPress={()=>navigation.navigate('Graficos')} style={styles.botonCerrar}> <Image source={require('../assets/img/logout.png')} style={styles.imagen}/><Text style={styles.texto2}> LOGOUT</Text></Button>
  
  </View>   



    </DrawerContentScrollView>
  )
}

const styles =StyleSheet.create({
  contenedor2:{

    backgroundColor:'#4e2d87',
    padding:20
    
    
},texto1:{
  textAlign:'center',
  fontSize:25,
  fontWeight:'bold',
  color:'#FFF',
  textTransform:'uppercase',
  margin:10
  

},contenedor:{
 
  borderRadius:5,
  padding:5,

 justifyContent: 'space-between',
 backgroundColor: '#4e2d87',

 marginVertical:30,




 
 
},boton:{

  
 
  borderRadius: 4,
  backgroundColor: 'transparent',
  top:30,
  margin:20,
  alignItems:'center',
  alignContent:'center',
  alignSelf:'center',

  
},texto2:{

 
  fontSize:18,
  fontWeight:'bold',
  color:'#FFF',
  textTransform:'uppercase'
 
},botonCerrar:{
  borderRadius: 4,
  backgroundColor: '#D32F2F',
  marginHorizontal:40,
  marginTop:80,
  marginRight:30,
  top:30,
  alignSelf:'baseline',
  right:50
 

},imagen:{
  width:20,
  height:20,
  
}

})
export default Tab

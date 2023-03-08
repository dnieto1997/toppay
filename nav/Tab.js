import 'react-native-gesture-handler';
import React from 'react'



import { DrawerContentScrollView } from '@react-navigation/drawer';

import globalStyles from '../views/global/styles';
import { View,Text,StyleSheet} from 'react-native';




const Tab = () => {
 
 
 return (
    <DrawerContentScrollView style={styles.contenedor2} >
<View style={styles.contenedor} >
  
 <Text style={styles.texto1}>Menu</Text>
  
  </View>



    </DrawerContentScrollView>
  )
}

const styles =StyleSheet.create({
  contenedor2:{

    backgroundColor:'#4e2d87',
    padding:15
    
},texto1:{
  textAlign:'center',
  fontSize:20,
  fontWeight:'bold',
  color:'#FFF',
  textTransform:'uppercase'
  

},contenedor:{
 
  borderRadius:5,
  padding:10,
 borderTopColor:'#fff',
 borderLeftColor:'#fff',
 borderEndColor:'#fff',
 borderStartColor:'#fff',
 justifyContent: 'space-between',
 backgroundColor: '#4e2d87',
 borderWidth: 1
}

})
export default Tab

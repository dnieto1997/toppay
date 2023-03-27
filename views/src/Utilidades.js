import React, { useState, useEffect } from 'react'


import {View, ScrollView, StyleSheet, Alert,Button} from 'react-native';

import { Text} from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Table, Row, Rows } from 'react-native-table-component';


import AsyncStorage from '@react-native-async-storage/async-storage';




const Utilidades = () => {


  const [fechainicio, setfechainicio] = useState(new Date())
  const [fechafin, setfechafin] = useState(new Date())
  const [resultado, setResultado] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const [token, setToken] = useState('');
  const [pais, SetPais] = useState('')


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setfechainicio(date)
    hideDatePicker();
  };



  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    setfechafin(date)
    hideDatePicker2();

  };

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const tokenStorage = await AsyncStorage.getItem('token')
        setToken(tokenStorage)



      } catch (error) {
        console.log(error)

      }

    }
    obtenerToken()

  })

  useEffect(() => {
    Pais()
    buscarMerchant()

  })


  const buscarMerchant = async () => {

    try {
      const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/buscaraliado', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `${user}`,

        }),
      });


      const resJson = await res.json();
      setAliado(resJson[0].merchant)
      
      
        

    } catch (error) {
     console.log(error)
    }

  }



  const Pais = async () => {
    try {
      const res3 = await fetch(
        'http://129.80.238.214:3000/api/menu',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          }
        },
      );


      const { pais } = await res3.json();
   
      console.log(pais)

    if(pais==1){
      SetPais('COP')
    
    }else if(pais==2){
      SetPais('SOL')
    }
 

    } catch (error) {

    }


  }

  console.log(pais)

  const buscarFecha = async () => {



    const FechaInicioFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    const FechaFinFormat = fechafin.getFullYear() + "-" + (fechafin.getMonth() + 1) + "-" + fechafin.getDate()


    try {

      const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/utilidadesAdm', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechainicio: `${FechaInicioFormat}`,
          fechafin: `${FechaFinFormat}`,
          pais:`${pais}`
        }),
      });

      const resJson = await res.json();

    console.log(resJson)
      
      setResultado(resJson)



    } catch (err) {
      console.log(err);
    }

}



const mostrarAlerta = () => {
    
  Alert.alert('Error', 'La fecha inicial no puede ser mayor a la fecha final', [{ text: 'Ok' }])


}
const Validacion = () => {
  if (fechainicio.getDate() > fechafin.getDate()) {
    mostrarAlerta()
    
    setfechainicio('')
    setfechafin('')
   
  } else {
    buscarFecha()
  }
  return
}



  return (

<>

 
<View style={styles.contenedor}>


<Button title="Fecha Inicial" onPress={showDatePicker} style={styles.boton} color='#6f42c1' >
  <Text style={styles.texto}>Fecha Inicial</Text>
</Button>
<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={handleConfirm}
  onCancel={hideDatePicker}
  format='yyyy-mm-dd'
  date={fechainicio}
/>


<Button title="Fecha Final" onPress={showDatePicker2} style={styles.boton} color='#6f42c1'><Text style={styles.texto} >Fecha Fin</Text></Button>
<DateTimePickerModal
  date={fechafin}
  isVisible={isDatePickerVisible2}
  mode="date"
  onConfirm={handleConfirm2}
  onCancel={hideDatePicker2}
  format='yyyy-mm-dd'

/>



</View>

<View style={{top:20,alignSelf:'center',backgroundColor:'red'}}>
<Button onPress={()=>Validacion()} title="Buscar" color='#6f42c1'></Button>
</View>

<ScrollView horizontal={true} >

<View style={styles.container}>
<Table>
      <Row data={['Mes','Cliente', 'Transacciones','Sumatoria','Utilidad',"Total","Pay In","payincount"]}  style={styles.head} textStyle={styles.text}/>
      <Rows data={resultado.map(item => [item.fecha,item.cliente, item.transacciones,item.sumatoria,item.utilidad,item.total,item.payin,item.payincount])} style={styles.row} textStyle={styles.text} />
    </Table>
</View>
</ScrollView>
    
    </>
  );

}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#6f42c1',
    paddingLeft: 10,
    width: 170,
    borderRadius: 3,
    alignItems: 'center',
    top:20

  },
  texto: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize:17
    
  },contenedor:{
  top:10,
    flexDirection:'row',
  alignItems:'center',
  columnGap:10,
  alignSelf:'center'
  },botonBuscar:{
    top:40,
    backgroundColor: '#6f42c1',
    width:170,
    borderRadius: 3,
    alignSelf:'center',
    height:30
    
  },container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',top:30 },
  head: { height: 30, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  row: { height: 40, backgroundColor: '#f9f9f9' },
  
  
})


export default Utilidades





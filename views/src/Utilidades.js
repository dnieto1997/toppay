import React, { useState, useEffect } from 'react'




import { FlatList, Dimensions, View, ScrollView, StyleSheet, Alert, Button, TouchableOpacity, Image } from 'react-native';

import { Text } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Table, Row, Rows } from 'react-native-table-component';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatearCantidad } from '../../helpers/Index';







const Utilidades = () => {

  const [fechainicio, setfechainicio] = useState(new Date())
  const [fechafin, setfechafin] = useState(new Date())
  const [resultado, setResultado] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [status, setStatus] = useState('')
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [fechaiformateada, Setfechaiformateada] = useState('')
  const [fechafformateada, Setfechafformateada] = useState('')
  const [token, setToken] = useState('');
  const [pais, SetPais] = useState('')
  const [user, SetUser] = useState('')
  const [aliado, setAliado] = useState('')


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
    setConsultaRealizada(false)


  };




  const validacion = () => {
    if (fechaiformateada > fechafformateada) {
      mostrarAlerta()
      
    } else {
      buscarFecha()
     
    }
    
  }
  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const tokenStorage = await AsyncStorage.getItem('token')
        const userStorage = await AsyncStorage.getItem('user')

        setToken(tokenStorage)
        SetUser(userStorage)


      } catch (error) {
        console.log(error)

      }

    }
    obtenerToken()

  }, [])


  useEffect(() => {
    Pais()
   

  },[])




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

      if (pais == 1) {
        SetPais('COP')

      } else if (pais == 2) {
        SetPais('SOL')
      }


    } catch (error) {

    }


  }






  useEffect(() => {

    if (!consultaRealizada) {
      validacion()
    }



  }, [consultaRealizada])








  const buscarFecha = async () => {



    const FechaInicioFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    const FechaFinFormat = fechafin.getFullYear() + "-" + (fechafin.getMonth() + 1) + "-" + fechafin.getDate()

    Setfechaiformateada(FechaInicioFormat)
    Setfechafformateada(FechaFinFormat)


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
          pais: `${pais}`,
          
        }),
      });

      const resJson = await res.json();
    console.log(resJson)

      setResultado(resJson)
      setConsultaRealizada(true);


    } catch (err) {
      console.log(err);

    }





  }



  const mostrarAlerta = () => {

    Alert.alert('Error', 'La fecha inicial no puede ser mayor a la fecha final', [{ text: 'Ok' }])


  }

 
 
 
 
 
 
 
 
  const renderItem = ({ item }) => (

    <View style={styles.row}>

      <Text style={styles.cell}>{obtenerNombreDelMes(item.fecha)}</Text>
      <Text style={styles.cell}>{item.cliente}</Text>
      <Text style={styles.cell}>{item.transacciones}</Text>
      <Text style={styles.cell}>{item.sumatoria.toFixed(2)}</Text>
      <Text style={styles.cell}>{item.utilidad}</Text>
        <View style={{flexDirection:'column'}}>
      <Text style={styles.cell}>{item.payin.toFixed(2)} </Text>
       <Text style={{textAlign:'center'}}>({item.payincount})</Text>
       </View>
       <View style={{flexDirection:'column'}}>
      <Text style={styles.cell}>{item.payout.toFixed(2)} </Text>
       <Text style={{textAlign:'center'}}>({item.payoutcount})</Text>
       </View>

    </View>

  );

  function obtenerNombreDelMes(numeroMes) {
    switch (numeroMes) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';



      default:
        return 'Mes no válido';
    }
  }
  
  console.log(fechainicio)
  console.log(fechafin)
  console.log(resultado)

  return (

    <>
      <View style={styles.contenedor}>



        <TouchableOpacity onPress={showDatePicker} style={styles.boton} color='#6f42c1'>

          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../global/Img/fecha.png')} style={styles.imagen} />
            <Text style={styles.texto2}> Fecha inicial</Text>
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          format='yyyy-mm-dd'
          date={fechainicio}
        />


        <TouchableOpacity title="Fecha Final" onPress={showDatePicker2} style={styles.boton} color='#6f42c1'><View style={{ flexDirection: 'row' }}>
          <Image source={require('../global/Img/fecha.png')} style={styles.imagen} />
          <Text style={styles.texto2}> Fecha Final</Text>
        </View></TouchableOpacity>
        <DateTimePickerModal
          date={fechafin}
          isVisible={isDatePickerVisible2}
          mode="date"
          onConfirm={handleConfirm2}
          onCancel={hideDatePicker2}
          format='yyyy-mm-dd'

        />

      </View>
      <TouchableOpacity onPress={()=>validacion()} title="Buscar" style={styles.botonBuscar} ><Text style={styles.texto}>Buscar</Text></TouchableOpacity>
      
      
      <ScrollView horizontal={true}  >
        <View style={styles.container}>

          <View style={styles.header}>

            <Text style={[styles.cell, styles.headerText]}>Mes</Text>
            <Text style={[styles.cell, styles.headerText]}>Cliente</Text>
            <Text style={[styles.cell, styles.headerText]}>Transacciones</Text>
            <Text style={[styles.cell, styles.headerText]}>Sumatoria</Text>
            <Text style={[styles.cell, styles.headerText]}>Utilidades</Text>
            <Text style={[styles.cell, styles.headerText]}>Pay In</Text>
            <Text style={[styles.cell, styles.headerText]}>Pay Out</Text>
          </View>

          <FlatList
            data={resultado}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
           
          />

        </View>
      </ScrollView>
     
   
      
     
    









    </>
  )
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#6f42c1',
    paddingLeft: 10,
    width: 170,
    borderRadius: 3,
    alignItems: 'center',
    top: 20

  },
  texto: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold'


  }, contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',

  }, botonBuscar: {
    top: 30,
    backgroundColor: '#6f42c1',
    width: 170,
    borderRadius: 3,
    height: 30,
    alignSelf: 'center'


  }, imagen: {
    width: 20,
    height: 20,
    alignSelf: 'flex-start',
    top: 1



  }, texto2: {

    textAlign: 'left',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold'
  }, container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    top: 40
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 150,
    height: 40
  },



})
export default Utilidades

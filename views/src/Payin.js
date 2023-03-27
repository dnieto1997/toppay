import React, { useState, useEffect } from 'react'

import { PieChart } from 'react-native-chart-kit';
import { Dimensions, View, ScrollView, StyleSheet, Alert, Button,TouchableOpacity,Image } from 'react-native';
import globalStyles from '../global/styles';
import { Text } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';





const Payin = () => {

  const [fechainicio, setfechainicio] = useState(new Date())
  const [fechafin, setfechafin] = useState(new Date())
  const [resultado, setResultado] = useState([])
  const [color, setColor] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [status, setStatus] = useState('')
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [fechaiformateada, Setfechaiformateada] = useState('')
  const [fechafformateada, Setfechafformateada] = useState('')


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
    falso()


  };


const falso = () =>{
  setConsultaRealizada(false)
}

const validacion =() =>{
  if(fechaiformateada>fechafformateada){
    mostrarAlerta()
    
    
  }else{
    buscarFecha()
    return
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

      const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payinsuccess', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechainicio: `${FechaInicioFormat}`,
          fechafin: `${FechaFinFormat}`,
          status: `${status}`
        }),
      });

      const resJson = await res.json();

      resJson.forEach(function (dato) {

        const generarColor = () => "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
        const legendFontColor = '#7F7F7F'
        const legendFontSize = 15
        dato.color = generarColor(color)
        dato.legendFontColor = legendFontColor
        dato.legendFontSize = legendFontSize,
          dato.name = dato.merchant_name
        dato.population = dato.cantidad

      });



      setResultado(resJson)
      setConsultaRealizada(true);




    } catch (err) {
      console.log(err);

    }
  




  }



  const mostrarAlerta = () => {

    Alert.alert('Error', 'La fecha inicial no puede ser mayor a la fecha final', [{ text: 'Ok' }])


  }









  return (

    <ScrollView>


      <View>
        <Picker onValueChange={(valor) => setStatus(valor)} selectedValue={status} style={{ textAlign: 'center' }}  >
          <Picker.Item label='-Seleccione estado---' value="" />
          <Picker.Item label='Success' value="1" />
          <Picker.Item label='Declined' value="3" />

        </Picker>
      </View>

      <View style={styles.contenedor}>

      
      
        <TouchableOpacity onPress={showDatePicker} style={styles.boton} color='#6f42c1'  >
         
         <View style={{flexDirection:'row'}}>
          <Image source={require('../global/Img/fecha.png')} style={styles.imagen}/>
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


        <TouchableOpacity title="Fecha Final" onPress={showDatePicker2} style={styles.boton} color='#6f42c1'><View style={{flexDirection:'row'}}>
          <Image source={require('../global/Img/fecha.png')} style={styles.imagen}/>
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

      <View style={{ top: 20, alignSelf: 'center' }}>
        <TouchableOpacity  onPress={() => validacion()} style={styles.botonBuscar} disabled={consultaRealizada}><Text style={styles.texto}>Buscar</Text></TouchableOpacity>
      </View>
      <View  >
        <PieChart
          data={resultado}
          width={Dimensions.get('window').width - 10}
          height={233}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 3,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,


            },
          }}
          style={{
            marginVertical: 20,
            borderRadius: 12,
            top: 30,
          }}
          accessor="population"
          backgroundColor="transparent"

          absolute //for the absolute number remove if you want percentage
        />

      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#6f42c1',
    paddingLeft: 10,
    width: 175,
    borderRadius: 3,
    alignItems: 'center',
    top: 10,
   

  },
  texto: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight:'bold'
    

  }, contenedor: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'center'
  }, botonBuscar: {
    top: 20,
    backgroundColor: '#6f42c1',
    width: 170,
    borderRadius: 3,
    alignSelf: 'center',
    height: 30

  },imagen:{
    width:20,
    height:20,
    alignSelf:'flex-start',
    top:1
    
    
 
   
    
  },texto2:{
    
    textAlign:'left',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight:'bold'
    

  }
})
export default Payin

import React, { useState, useEffect } from 'react'


import { Image,TouchableOpacity,ActivityIndicator,Dimensions, SafeAreaView, View, ScrollView, StyleSheet, Alert, Button } from 'react-native';
import globalStyles from '../global/styles';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
 
  StackedBarChart,
} from 'react-native-chart-kit';





const PayoutAliado = () => {

  const [token, setToken] = useState('');
  const [fechainicio, setfechainicio] = useState(new Date())
  const [fechafin, setfechafin] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [aliado, setAliado] = useState([])
  const [user, setUser] = useState('')
  const [payouts, setpayouts] = useState('')
  const [payoutd, setpayoutd] = useState('')
  const[pais,SetPais]=useState('')
  const [loading, setLoading] = useState(true);
  const [currency, Setcurrency] = useState('')


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
    buscarUser()
    buscarMerchant()
  })




  useEffect(() => {

    Validacion()


  }, [])





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






  const buscarUser = async () => {

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


      const { usuario } = await res2.json();
      setUser(usuario)
   

    } catch (error) {

    }

  }


  useEffect(() => {
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
            SetPais(pais)
            console.log("pais: ",pais)



        } catch (error) {
            console.log(error)
        }


    }
    Pais()

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



  const buscarFecha = async () => {
    if (pais === 1) {
      Setcurrency("COP")
  } else if (pais === 2) {
      Setcurrency("SOL")
  }



    const FechaInicioFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    const FechaFinFormat = fechafin.getFullYear() + "-" + (fechafin.getMonth() + 1) + "-" + fechafin.getDate()


    try {

      const res2 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payoutsuccessaliado', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechainicio: `${FechaInicioFormat}`,
          fechafin: `${FechaFinFormat}`,
          aliado: `${aliado}`,
          currency: `${currency}`

        }),
      });

      const resJson = await res2.json();

     
      setpayouts(resJson[0].cantidad)
      

      const res3 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payoutdeclinedaliado', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechainicio: `${FechaInicioFormat}`,
          fechafin: `${FechaFinFormat}`,
          aliado: `${aliado}`,
          currency: `${currency}`

        }),
      });

      const resJson2 = await res3.json();
      setpayoutd(resJson2[0].cantidad)

      setLoading(false)
      


    } catch (err) {
      console.log(err);
    }



  }



  const mostrarAlerta = () => {

    Alert.alert('Error', 'La fecha inicial no puede ser mayor a la fecha final', [{ text: 'Ok' }])


  }





  const datos = [payouts, payoutd]

  console.log(datos)





  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
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
        <TouchableOpacity  onPress={() => Validacion()} style={styles.botonBuscar} >  
        <View style={{flexDirection:'row'}}>
          
        <Image source={require('../../assets/img/buscar.png')} style={[styles.imagen,{left:10}]}/><Text style={styles.texto5}>Buscar</Text>
          
          </View>
          
          
          </TouchableOpacity>
      </View>
<View  style={{top:40,bottom:10}}>

<StackedBarChart
  data={{
    labels: ['Pay out Success', 'Pay out Declined'],
    

    data: [
      [payouts],
      [payoutd],
    ],
    barColors: ['#6f42c1'],

  }
  


}
formatYLabel={(value) => Math.floor(value).toString()}
  
  width={Dimensions.get('window').width - 14}
  height={300}
  chartConfig={{
    backgroundGradientFrom: "#6f42c1",
backgroundGradientFromOpacity: "#6f42c1",
backgroundGradientTo: "#6f42c1",
backgroundGradientToOpacity: 0.5,
color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
strokeWidth: 2, // optional, default 3
barPercentage: 2,
decimalPlaces:0,
useShadowColorFromDataset: false // optional
  }}
  style={{
    marginVertical: 8,
    borderRadius: 8,
    marginLeft:8,
    margin:10
  }}
/>

</View>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#6f42c1',
    paddingLeft: 10,
    width: 140,
    borderRadius: 3,
    alignItems: 'center',
    top: 10,
    height:25

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
    width: 130,
    borderRadius: 3,
    alignSelf: 'center',
    height: 25

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
    

  },texto5:{
    
    textAlign:'left',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight:'bold',
    left:15
    

  }
})
export default PayoutAliado

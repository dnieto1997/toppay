import React, { useState, useEffect } from 'react'


import { ActivityIndicator,Dimensions, SafeAreaView, View, ScrollView, StyleSheet, Alert,Button  } from 'react-native';
import globalStyles from '../global/styles';
import { Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
 
  StackedBarChart,
} from 'react-native-chart-kit';





const PayinAliado = () => {

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
  const [currency, Setcurrency] = useState('')
  const [isLoading, setIsLoading] = useState(false);


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




  const buscarFecha = async () => {

    if (pais === 1) {
      Setcurrency("COP")
  } else if (pais === 2) {
      Setcurrency("SOL")
  }


    const FechaInicioFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    const FechaFinFormat = fechafin.getFullYear() + "-" + (fechafin.getMonth() + 1) + "-" + fechafin.getDate()


    try {

      const res2 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payinsuccessaliado', {
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
      setIsLoading(false);

      const res3 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payindeclinedaliado', {
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
      setIsLoading(false);
      


    } catch (err) {
      console.log(err);
    }



  }



  const mostrarAlerta = () => {

    Alert.alert('Error', 'La fecha inicial no puede ser mayor a la fecha final', [{ text: 'Ok' }])


  }





  const datos = [payouts, payoutd]

  console.log(datos)
  console.log(user)




  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
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

<View style={{ top: 20, alignSelf: 'center' }}>
<Button onPress={()=>Validacion()} title="Buscar" color='#6f42c1' ></Button>

</View>
{isLoading && <ActivityIndicator />}
<View >
<Text style={styles.header}>Pay in</Text>
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
    marginLeft:8
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
    width: 170,
    borderRadius: 3,
    alignItems: 'center',
    top: 20

  },
  texto: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 17

  }, contenedor: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'center'
  }, botonBuscar: {
    top: 40,
    backgroundColor: '#6f42c1',
    width: 170,
    borderRadius: 3,
    alignSelf: 'center',
    height: 30

  }, container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  }
})
export default PayinAliado

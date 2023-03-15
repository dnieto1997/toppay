import React,{useState,useEffect} from 'react'

import { PieChart } from 'react-native-chart-kit';
import { View,ScrollView,StyleSheet } from 'react-native';
import globalStyles from '../global/styles';
import { Button, Text } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';




const Graficos = () => {
  
  
  








  const [fechainicio, setfechainicio] = useState(new Date())
  const [fechafin, setfechafin] = useState(new Date()) 
  const [resultado, setResultado] = useState({}) 

 



useEffect(()=>{
  buscarFecha()
},[])





  const buscarFecha = async () => {
    
    const FechaInicioFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    const FechaFinFormat = fechainicio.getFullYear() + "-" + (fechainicio.getMonth() + 1) + "-" + fechainicio.getDate()
    try {

      
      const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payoutsuccess', {
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechainicio: `${FechaInicioFormat}`,
          fechafin: `${FechaFinFormat}`,
        }),
      });


      const resJson = await res.json();
    setResultado(resJson)
    console.log(resJson)
    
     

    } catch (err) {
      console.log(err);
    }
    

    
  }









   return (
    
    <ScrollView>
  

  <View>   
<DatePicker date={fechainicio} onDateChange={setfechainicio}  mode="date" format='yyyy-mm-dd' />


<DatePicker date={fechafin} onDateChange={setfechafin}  mode="date" format='yyyy-mm-dd'/>

<Button onPress={()=>buscarFecha()}>Buscar</Button>


</View> 

 
    
    
    
    <PieChart
 data={[
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
]}
  width={400}
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute //for the absolute number remove if you want percentage
/>
    
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  date:{
    flexDirection:'row'
  }
})
export default Graficos

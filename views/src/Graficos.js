import React,{useState,useEffect} from 'react'
import { Button, Text } from 'react-native-paper'
import DatePicker from 'react-native-date-picker';
import { View } from 'react-native';
import axios from 'axios';

const Graficos = () => {
const [fechainicio, setfechainicio] = useState(new Date())
const [fechafin, setfechafin] = useState(new Date())

   useEffect(() => {
    consumirapilaravel();
    
  },[]);

   const consumirapilaravel = async () => {
    try {
        
    

      const res = await fetch('http://127.0.0.1:8000/api/prueba/pruebapost/', {
      
      method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        fechainicio : `${fechainicio}`,
        fechafin: `${fechafin}`,
       }),
     });
     console.log(res)
   
   
           const resJson = await res.json();
           console.log(resJson)
          
           
   
         } catch (err) {
           console.log(err);
         }
  };
   
   return (
    <View>
      
<DatePicker date={fechainicio} onDateChange={setfechainicio} />
<DatePicker date={fechafin} onDateChange={setfechafin} dateFormat="MMMM d h:mm aa"/>

<Button onPress={()=>consumirapilaravel()}>mirar grafica</Button>

    </View>
  )
}

export default Graficos

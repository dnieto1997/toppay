import React,{useState,useEffect} from 'react'

import DatePicker from 'react-native-date-picker';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View,Text,TouchableOpacity
  } from 'react-native';
  import globalStyles from './global/styles';
const Payout = () => {
  
  const [fechainicio, setfechainicio] = useState(new Date())
const [fechafin, setfechafin] = useState(new Date())
console.log(fechainicio)
  return (
    <ScrollView>
  <View>   
<DatePicker date={fechainicio} onDateChange={setfechainicio}  mode="date" />


<DatePicker date={fechafin} onDateChange={setfechafin}  mode="date" />
</View> 


    </ScrollView>
  )
}

export default Payout

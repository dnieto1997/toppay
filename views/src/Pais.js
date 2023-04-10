
import React,{useState} from 'react';
import { Picker } from '@react-native-picker/picker';

const Pais =() =>{
    
    const [pais, setPais] = useState('');
    return(
    
    <Picker onValueChange={(valor)=>setPais(valor)} selectedValue={pais}  >
        <Picker.Item label='-- Seleccione Pais --' value=""/>
        <Picker.Item label='Colombia' value="1"/>
        <Picker.Item label='Peru' value="2"/>
        
        </Picker>
        
        )
}


export default Pais
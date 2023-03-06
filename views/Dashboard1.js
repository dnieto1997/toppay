import React, {useEffect, useState} from 'react';
import {formatearCantidad} from '../helpers/Index';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import globalStyles from './global/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard1 = () => {
  const [token, setToken] = useState('');
  const [todaymoneyin, setTodaymoneyin] = useState('');
  const [todaystransactionin, settodaystransactionin] = useState('');
  const [todaystransactionerrorin, setttodaystransactionerrorin] = useState('');
  const [todaymoneyout, settodaymoneyout] = useState('');
  const [todaystransactionout, settodaystransactionout] = useState('');

 

  useEffect(()=>{
    const obtenerToken =async () =>{
    try {
      const tokenStorage =await AsyncStorage.getItem('token') 
      setToken(tokenStorage)
      console.log(tokenStorage)
    
   
    } catch (error) {
      console.log(error)
      
    }
    
    }
    obtenerToken()
    
    },[])



  useEffect(() => {
    todayMoneyin();
    todaysTransactionin();
    todaysTransactionerrorin();
    todayMoneyout();
    todaysTransactionout();
  });

  const todayMoneyin = async () => {
    try {
      const res = await fetch(
        'http://129.80.238.214:3000/api/dashboard/todaymoneyin',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          }
        },
      );

      const {result} = await res.json();
     
     const total = result[0].total;
     
      setTodaymoneyin(total);
      
    } catch (err) {
      console.log(err);
    }
  };

  const todaysTransactionin = async () => {
    try {
      const res = await fetch(
        'http://129.80.238.214:3000/api/dashboard/todaystransactionin',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          },
        },
      );

      const {result} = await res.json();

      const total = result[0].total;
      settodaystransactionin(total);
    } catch (err) {
      console.log(err);
    }
  };

  const todaysTransactionerrorin = async () => {
    try {
      const res = await fetch(
        'http://129.80.238.214:3000/api/dashboard/todaystransactionerrorin',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          },
        },
      );

      const {result} = await res.json();

      const total = result[0].total;
      setttodaystransactionerrorin(total);
    } catch (err) {
      console.log(err);
    }
  };

  const todayMoneyout = async () => {
    try {
      const res = await fetch(
        'http://129.80.238.214:3000/api/dashboard/todaymoneyout',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          },
        },
      );

      const {result} = await res.json();

      const total = result[0].total;
      settodaymoneyout(total);
    } catch (err) {
      console.log(err);
    }
  };

  const todaysTransactionout = async () => {
    try {
      const res = await fetch(
        'http://129.80.238.214:3000/api/dashboard/todaystransactionout',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          },
        },
      );

      const {result} = await res.json();

      const total = result[0].total;
      settodaystransactionout(total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <View style={globalStyles.contenedor2}>
          <View style={styles.contenedor2}>
            <View>
              <Image
                source={require('../assets/img/setting.png')}
                style={styles.imagen}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.texto1}>Today's Money Cash in Success</Text>
              <Text style={styles.texto2}>
                {formatearCantidad(todaymoneyin)}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contenedor}>
        <View style={globalStyles.contenedor2}>
          <View style={styles.contenedor2}>
            <View>
              <Image
                source={require('../assets/img/cash.png')}
                style={styles.imagen}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.texto1}>Today's Transaction Cash In</Text>
              <Text style={styles.texto2}>
                {todaystransactionin} (COP){' '}
                <Text style={{color: 'green'}}>Success</Text>
              </Text>
              <Text style={styles.texto2}>
                {todaystransactionerrorin} (COP)
                {''}
                
                
                 <Text style={{color: 'red'}}>Pending</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contenedor}>
        <View style={globalStyles.contenedor2}>
          <View style={styles.contenedor2}>
            <View>
              <Image
                source={require('../assets/img/cash2.png')}
                style={styles.imagen}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={[styles.texto1, styles.texto0]}>
                Today's Money Transaction Cash Out
              </Text>

              <Text style={styles.texto2}>
                {formatearCantidad(todaymoneyout)}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contenedor}>
        <View style={globalStyles.contenedor2}>
          <View style={styles.contenedor2}>
            <View>
              <Image
                source={require('../assets/img/setting.png')}
                style={styles.imagen}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.texto1}>Today's Transaction Cash Out</Text>
              <Text style={styles.texto2}>
                {todaystransactionout} (COP){' '}
                <Text style={{color: 'green'}}>Success</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imagen: {
    width: 100,
    height: 100,
    marginLeft: 5,
  },
  contenedor: {
    marginTop: 20,
  },
  contenedor2: {
    flexDirection: 'row',
  },
  texto1: {
    marginBottom: 40,

    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  texto2: {
    textAlign: 'center',
    fontSize: 19,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  texto0: {
    fontSize: 10,
  },
});
export default Dashboard1;

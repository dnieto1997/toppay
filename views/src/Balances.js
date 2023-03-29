import React, { useState, useEffect } from 'react'




import { FlatList, View, ScrollView, StyleSheet, RefreshControl } from 'react-native';

import { Text } from 'react-native-paper';



import AsyncStorage from '@react-native-async-storage/async-storage';








const Balances = () => {


    const [resultado, setResultado] = useState([])


    const [token, setToken] = useState('');
    const [pais, SetPais] = useState('')
    const [user, SetUser] = useState('')
    const [aliado, setAliado] = useState('')



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
    })




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

            const res2 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/buscaraliado', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: `${user}`,

                }),
            });

            const resJson = await res2.json();


            setAliado(resJson[0]['id'])




        } catch (error) {

        }


    }

    const controller = new AbortController();
    const signal = controller.signal;


  const buscarFecha = async () => {

    try {

        const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/dispersiones',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pais: `${pais}`,
                merchant: `${aliado}`

            }),
        });

        const resJson = await res.json();
        console.log(resJson)

        setResultado(resJson)




    } catch (err) {
        console.log(err);

    }



}

useEffect(()=>{
    buscarFecha()
},[SetPais])






    const renderItem = ({ item }) => (

        <View style={styles.row}>

            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.fechapago}</Text>
            <Text style={styles.cell}>{item.aliado}</Text>
            <Text style={styles.cell}>{item.bancoaliado}</Text>
            <Text style={styles.cell}>{item.cuenta}</Text>
            <Text style={styles.cell}>{item.valor}</Text>
            <Text style={styles.cell}>{item.tipon} </Text>
            <Text style={styles.cell}>{item.gmf} </Text>
            <Text style={styles.cell}>{item.estadon} </Text>


        </View>

    );






    return (
  <>
      
            <View style={styles.contenedor}>



            </View>



            <ScrollView horizontal={true}  >
                <View style={styles.container}>

                    <View style={styles.header}>

                        <Text style={[styles.cell, styles.headerText]}>Id</Text>
                        <Text style={[styles.cell, styles.headerText]}>Fecha de Pago</Text>
                        <Text style={[styles.cell, styles.headerText]}>Aliado</Text>
                        <Text style={[styles.cell, styles.headerText]}>Banco</Text>
                        <Text style={[styles.cell, styles.headerText]}>Cuenta</Text>
                        <Text style={[styles.cell, styles.headerText]}>Valor</Text>
                        <Text style={[styles.cell, styles.headerText]}>Tipo</Text>
                        <Text style={[styles.cell, styles.headerText]}>GMF</Text>
                        <Text style={[styles.cell, styles.headerText]}>Estado</Text>
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
export default Balances

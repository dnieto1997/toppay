import React, { useState, useEffect } from 'react'





import { RefreshControl, FlatList, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { Button, Text } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { formatearCantidad, formatearCantidad2, formatearCantidad3 } from '../../helpers/Index';
//import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const Balances = () => {


    const [resultado, setResultado] = useState([])
    const [token, setToken] = useState('');
    const [pais, SetPais] = useState('')
    const [user, SetUser] = useState('')
    const [aliado, setAliado] = useState('')
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [currency, Setcurrency] = useState('')
    const [payin, setpayin] = useState('')
    const [payout, setpayout] = useState('')
    const [balancepayout, setbalancepayout] = useState('')
    const [balancepayin, setbalancepayin] = useState('')
    const [total1, settotal1] = useState('')
    const [total2, settotal2] = useState('')
    const [totalSum, settotalsum] = useState('')






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


    })




    useEffect(() => {


        const BuscarAliado = async () => {
            try {

                const res2 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/buscar', {
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


                setAliado(resJson[0].resultado)
                console.log("este es el id del alidado", resJson[0].resultado)




            } catch (error) {
                console.log(error)
            }


        }
        BuscarAliado()
    })







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
                console.log("este es el pais", pais)





            } catch (error) {
                console.log(error)
            }


        }
        Pais()

    })





    const balance = async () => {

        if (pais === 1) {
            Setcurrency("COP")
        } else if (pais === 2) {
            Setcurrency("SOL")
        }


        try {

            const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/balance', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${aliado}`,
                    currency: `${currency}`

                }),
            });

            const resJson = await res.json();
            setpayin(resJson[0].payin)
            setpayout(resJson[0].payout)
            console.log("payin", resJson[0].payin)
            console.log("payout", resJson[0].payout)







        } catch (err) {
            console.log(err);


        }



    }




    const balancetotal = async () => {


        try {

            const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/payoutsuccesssperu', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${aliado}`,
                    pais: `${pais}`

                }),
            });



            const resJson = await res.json();

            setbalancepayout(resJson[0].valor)


            setbalancepayin(resJson[1].valor)









        } catch (err) {
            console.log(err);


        }



    }


    /* 
    const total1 = Math.round(payin) + Math.round(balancepayin)
            const total2 = Math.round(payout) + Math.round(balancepayout)
            const totalSum = total1 - total2   */




    const Dispersiones = async () => {


        try {

            const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/dispersiones', {
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

            console.log("resultado2", res)
            setResultado(resJson)

            setLoading(false)




        } catch (err) {
            console.log(err);


        }






    }







    useEffect(() => {

        balance()
        balancetotal()
        const total1 = Math.round(payin) + Math.round(balancepayin)
        const total2 = Math.round(payout) + Math.round(balancepayout)
        const totalSum = total1 - total2
        settotal1(total1)
        settotal2(total2)
        settotalsum(totalSum)


    })


    useEffect(() => {

        const timeout = setTimeout(() => {
            setRefresh(false);
            Dispersiones()



        }, 25000);

        return () => clearTimeout(timeout);
    }, []);

    const handleRefresh = () => {
        setRefresh(true);
    };


    /*    const renderItem = ({ item }) => (
    
            <View style={styles.row}>
    
                <Text style={styles.cell2}>{item.id}</Text>
                <Text style={styles.cell}>{item.fechapago}</Text>
                <Text style={styles.cell}>{item.aliado}</Text>
                <Text style={styles.cell}>{item.bancoaliado}</Text>
                <Text style={styles.cell}>{item.cuenta}</Text>
                <Text style={styles.cell}>{formatearCantidad3(item.valor)}</Text>
                <Text style={styles.cell}>{item.tipon} </Text>
                <Text style={styles.cell}>{formatearCantidad3(item.gmf)} </Text>
                <Text style={styles.cell}>{item.estadon} </Text>
    
    
    
            </View>
    
    
    
    
        );  */

    /*
       const tableHead = ['Id', 'Fecha de Pago','Aliado','Banco','Cuenta','Valor','Tipo','GMF','Estado'];
     const tableRows = tableData.map(item => [item.columna1, item.columna2]);
    */



    /*   <Text style={[styles.cell2, styles.headerText]}>Id</Text>
      <Text style={[styles.cell, styles.headerText]}>Fecha de Pago</Text>
      <Text style={[styles.cell, styles.headerText]}>Aliado</Text>
      <Text style={[styles.cell, styles.headerText]}>Banco</Text>
      <Text style={[styles.cell, styles.headerText]}>Cuenta</Text>
      <Text style={[styles.cell, styles.headerText]}>Valor</Text>
      <Text style={[styles.cell, styles.headerText]}>Tipo</Text>
      <Text style={[styles.cell, styles.headerText]}>GMF</Text>
      <Text style={[styles.cell, styles.headerText]}>Estado</Text> */

    if (loading) {


        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

    }


    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => handleRefresh()} />} style={{ backgroundColor: '#fff' }}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={styles.contenedor}>

                        <View style={{ flexDirection: 'column', right: 40 }}>
                            <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Total Pay-In</Text>
                            <Text style={[styles.texto3, { color: 'black', top: 9 }]}> Recaudo: </Text>
                            <Text style={[styles.texto3, { color: 'green', top: 7 }]}>{pais === 2 ? formatearCantidad2(Math.round(payin)) : formatearCantidad(Math.round(payin))}</Text>
                            <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Consignacion: </Text>
                            <Text style={[styles.texto3, { color: 'green', top: 7 }]}>{pais === 2 ? formatearCantidad2(Math.round(balancepayin)) : formatearCantidad(Math.round(balancepayin))} </Text>
                            <Text style={[styles.texto3, { color: 'green', top: 18 }]}> {pais === 2 ? formatearCantidad2(Math.round(total1)) : formatearCantidad(Math.round(total1))} </Text>
                        </View>
                        <View style={{ flexDirection: 'column', left: 40 }}>
                            <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Total Pay-Out</Text>
                            <Text style={[styles.texto3, { color: 'black', top: 9 }]}> Prestamos: </Text>
                            <Text style={[styles.texto3, { color: 'red', top: 7 }]}>{pais === 2 ? formatearCantidad2(Math.round(payout)) : formatearCantidad(Math.round(payout))}</Text>
                            <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Retiros: </Text>
                            <Text style={[styles.texto3, { color: 'red', top: 7 }]}>{pais === 2 ? formatearCantidad2(Math.round(balancepayout)) : formatearCantidad(Math.round(balancepayout))} </Text>
                            <Text style={[styles.texto3, { color: 'red', top: 18 }]}> {pais === 2 ? formatearCantidad2(Math.round(total2)) : formatearCantidad(Math.round(total2))} </Text>
                        </View>

                    </View>

                    <View style={{ alignSelf: 'center', top: 30 }}>
                        <Text> {pais === 2 ? formatearCantidad2(Math.round(totalSum)) : formatearCantidad(Math.round(totalSum))}</Text>
                    </View>

                </View>



                <ScrollView horizontal={true} >


                    <View style={styles.container}>
                        <View style={styles.header}>

                            <Text style={[styles.cell2, styles.headerText]}>Id</Text>
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
                            renderItem={({ item }) =>
                                <View style={styles.row}>
                                    <Text style={styles.cell2}>{item.id}</Text>
                                    <Text style={styles.cell}>{item.fechapago}</Text>
                                    <Text style={styles.cell}>{item.aliado}</Text>
                                    <Text style={styles.cell}>{item.bancoaliado}</Text>
                                    <Text style={styles.cell}>{item.cuenta}</Text>
                                    <Text style={styles.cell}>{formatearCantidad3(item.valor)}</Text>
                                    <Text style={styles.cell}>{item.tipon} </Text>
                                    <Text style={styles.cell}>{formatearCantidad3(item.gmf)} </Text>
                                    <Text style={styles.cell}>{item.estadon} </Text>
                                </View>
                            }


                        />









                    </View>




                </ScrollView>
            </View>

        </ScrollView>




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

    }, head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    texto: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold'


    }, texto3: {

        textAlign: 'center',
        color: "red",
        textTransform: 'uppercase',
        fontSize: 11,
        fontWeight: 'bold'




    },



    contenedor: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'

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
        top: 40,
        marginBottom: 30
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
    cell2: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'stretch',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        width: 40,
        height: 40
    }


})
export default Balances

import React, { useState, useEffect, Component } from 'react'





import { RefreshControl, FlatList, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { Text } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { formatearCantidad,formatearCantidad2 } from '../../helpers/Index';



const Balances = () => {


    const [resultado, setResultado] = useState([])
    const [token, setToken] = useState('');
    const [pais, SetPais] = useState('')
    const [user, SetUser] = useState('')
    const [aliado, setAliado] = useState('')
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [currency, Setcurrency] = useState('')
    const [payin, setpayin] = useState('')
    const [payout, setpayout] = useState('')
    const [balancepayout, setbalancepayout] = useState('')
    const [balancepayin, setbalancepayin] = useState('')

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
                const logMerchantId = resJson[0].log_merchantid

                setAliado(logMerchantId)




            } catch (error) {
                console.log(error)
            }


        }
        BuscarAliado()
    })


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



            console.log("lo arroja vacio", resJson)





        } catch (err) {
            console.log(err);


        }



    }




    const balancetotal = async () => {



        try {

            const res = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/balancepayout', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    merchant: `${aliado}`,
                    pais: `${pais}`

                }),
            });

            const resJson = await res.json();
            setbalancepayin(resJson[0].valor)


            const res2 = await fetch('https://toppaylatam.com/Apireact/public/api/prueba/balancepayin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    merchant: `${aliado}`,
                    pais: `${pais}`

                }),
            });


            const resJson2 = await res2.json();
            setbalancepayout(resJson2[0].valor)

            








        } catch (err) {
            console.log(err);


        }

        setLoading(false);

    }


    const Actualizacion = async () =>{
        Dispersiones()
    }



    useEffect(()=>{
        
        Actualizacion()
         
    },[])

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


            setResultado(resJson)
           
          






        } catch (err) {
            console.log(err);


        }


    }

  

    useEffect(() => {
        balance()
        balancetotal()
    })






    const total1 = Math.round(payin) + Math.round(balancepayin)
    const total2 = Math.round(payout) + Math.round(balancepayout)
    const totalSum = total1 - total2


console.log("Hace BOOM",resultado)

      const renderItem = ({item}) => (
    
            <View style={styles.row}>
    
                <Text style={styles.cell2}>{item.id}</Text>
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
    

       






    if (loading || !totalSum) {


        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

    }


    return (
       
       <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Actualizacion()} />}  style={{ backgroundColor: '#fff' }}>
       <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff' }}>
                <View style={styles.contenedor}>

                    <View style={{ flexDirection: 'column', right: 40 }}>
                        <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Total Pay-In</Text>
                        <Text style={[styles.texto3, { color: 'black', top: 9 }]}> Recaudo: </Text>
                        <Text style={[styles.texto3, { color: 'green', top: 7 }]}>{pais=="1"?formatearCantidad(Math.round(payin)) : formatearCantidad2(Math.round(payin))}</Text>
                        <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Consignacion: </Text>
                        <Text style={[styles.texto3, { color: 'green', top: 7 }]}>{pais=="1"?formatearCantidad(Math.round(balancepayin)) : formatearCantidad2(Math.round(balancepayin)) } </Text>
                        <Text style={[styles.texto3, { color: 'green', top: 18 }]}> {pais=="1"?formatearCantidad(Math.round(total1)) : formatearCantidad2(Math.round(total1))} </Text>
                    </View>
                    <View style={{ flexDirection: 'column', left: 40 }}>
                        <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Total Pay-Out</Text>
                        <Text style={[styles.texto3, { color: 'black', top: 9 }]}> Prestamos: </Text>
                        <Text style={[styles.texto3, { color: 'red', top: 7 }]}>{pais=="1"?formatearCantidad(Math.round(payout)) : formatearCantidad2(Math.round(payout))}</Text>
                        <Text style={[styles.texto3, { color: 'black', top: 7 }]}> Retiros: </Text>
                        <Text style={[styles.texto3, { color: 'red', top: 7 }]}>{ pais=="1"?formatearCantidad(Math.round(balancepayout)) : formatearCantidad2(Math.round(balancepayout))} </Text>
                        <Text style={[styles.texto3, { color: 'red', top: 18 }]}> {pais=="1"?formatearCantidad(Math.round(total2)) : formatearCantidad2(Math.round(total2))} </Text>
                    </View>

                </View>

                <View style={{ alignSelf: 'center', top: 30 }}>
                    <Text> {pais=="1"?formatearCantidad(Math.round(totalSum)) : formatearCantidad2(Math.round(totalSum))}</Text>
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
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
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

    },head: { height: 40, backgroundColor: '#f1f8ff' },
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
        marginBottom:30
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
    },


})
export default Balances

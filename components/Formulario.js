import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export const Formulario = ({ moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI}) => {

    const [criptoMonedas, setCriptoMonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);


            setCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    }

    const obtenerCriptomoneda = (cripto) => {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
       if(moneda.trim() === "" || criptomoneda.trim() === ""){
           mostrarAlerta();
           return;
       }
       setConsultarAPI(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos Campos son obligatorios',
            [
                { text: 'OK' }
            ]
        )
    }

    return (
        <View>

            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>


            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
            >
                <Picker.Item label="- Seleccione -" value="" />
                {criptoMonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={cotizarPrecio}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
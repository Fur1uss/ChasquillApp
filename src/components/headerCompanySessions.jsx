import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const HeaderCompanySessions = () => {

    return (
        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}>@nombreEmpresa</Text>
            <Image style = {styles.imageUser} source={require("../assets/images/defaultUserImage.png")} />
        </View>

    );
}

const styles = StyleSheet.create({

    headerContainer: {
        width: "130%", // Ancho del View
        height: 250, // Altura del View
        backgroundColor: '#FFD148', // Color de fondo
        borderBottomLeftRadius: 250, // Radio inferior izquierdo igual a la mitad del ancho
        borderBottomRightRadius: 250, // Radio inferior derecho igual a la mitad del ancho

        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    
    headerText: {
        fontSize: 25,
        color: "black",
        fontWeight: "bold",
    },

    imageUser: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 20,
    },
});


export default HeaderCompanySessions;
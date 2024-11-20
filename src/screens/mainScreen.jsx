import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";


const Main = () => {
    return (
        <View style = {styles.mainScreenContainer}>
        <StatusBar barStyle = 'dark-content'  backgroundColor={"#FFD148"}/>
            <Image style = {styles.mainScreenLogo} source = {require('../assets/images/logoChasquillApp.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainScreenContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },

    mainScreenLogo: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },

});

export default Main;
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";


const Main = () => {
    return (
        <View style = {styles.mainScreenContainer}>
            <Text style = {styles.mainText}>Este es el main</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainText: {
        fontFamily: "Figtree",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: 'justify',
    },
});

export default Main;
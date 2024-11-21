import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";


const Settings = () => {

    return (
        <View style={styles.viewStyle}>
            <StatusBar hidden = {true}/>

            <TouchableOpacity style = {styles.returnButton}>
                <View>
                    <Image style = {styles.iconButtonConfig} source={require("../assets/images/returnButton.png")}  />
                </View>
            </TouchableOpacity>

            <View style = {styles.buttonsContainer}>

            </View>

            <View style = {styles.footerContainer}></View>

        </View>
    );

}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
    },

    returnButton: {
        position: "absolute",
        top: 60,
        left: 18,
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",

        borderRadius: 7,

        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    
    iconButtonConfig: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },

    buttonsContainer: {
        width: "90%",
        height: "65%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginTop: 150,
    },

    footerContainer: {
        flex: 1,
        width: "100%",
        height: 10,
        backgroundColor: "#FFD148",
        marginTop: 40,
    },

});

export default Settings;
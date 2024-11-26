import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const Empresas = () => {

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    const navigation = useNavigation();

    

    return(
        <View style = {styles.companyScreenContainer}>
                <View style = {styles.headerContainer}>
                    <ImageBackground style = {styles.backgroundImageEllipse} source={require("../assets/images/ellipseCompany.png")}>
                        <Text style = {styles.titleTextHeader}>Empresas</Text>
                        <Image style = {styles.emojiImgConfig} source={require("../assets/images/buildingEmoji.png")} />
                    </ImageBackground>
                </View>

                <View style = {styles.buttonsContainer}>
                    <TouchableOpacity style = {styles.buttonConfig} onPress={() => navigation.navigate('NewCompany')}>
                        <Text style = {styles.buttonText}>Registrar empresa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.buttonConfig} onPress={() => navigation.navigate('JoinCompany')}>
                        <Text style = {styles.buttonText}>Unirse a empresa</Text>
                    </TouchableOpacity>


                </View>

                <View style = {styles.footerContainer}></View>
        </View>
    )

}

const styles = StyleSheet.create({

    companyScreenContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    backgroundImageEllipse: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: "center",

        position: "absolute",
        bottom: 70,

        flexDirection: "column",
        
    },
    headerContainer: {
        width: "100%",
        height: "45%",
        
    },

    titleTextHeader: {
        fontSize: 30,
        color: "#000000",
        fontFamily: "FigtreeBold",
        textAlign: "center",
        marginTop: 40,
    },

    emojiImgConfig: {
        marginTop: 40,
        
        width: "30%",
        height: "30%",
    },

    buttonsContainer: {
        width: "75%",
        height: "30%",

        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",

    },

    buttonConfig: {
        width: "100%",
        height: "30%",
        backgroundColor: "#482D1C",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

        elevation: 5,
    },

    buttonText: {
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "FigtreeBold",
    },

    footerContainer: {
        flex: 1,
        width: "100%",
        height: 10,
        backgroundColor: "#FFD148",

        marginTop: 130,
    },
});

export default Empresas;
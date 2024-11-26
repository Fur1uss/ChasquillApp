import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import HeaderCompanySessions from "../components/headerCompanySessions";
import EmployeeScrollView from "../components/employeesScrollView";
import RatingCompanyElement from "../components/ratingCompanyElement";
import InvitationCodeSection from "../components/invitationCodeElement";

const AdminEmpresas = () => {

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    return(
        <View style = {styles.AdminCompanyScreenContainer}>

            <HeaderCompanySessions />

            <Text style = {styles.subtitleText}>Empleados</Text>
            <View style = {styles.scrollViewContainer}>
                <EmployeeScrollView />
            </View>

            <View style = {styles.buttonsContainer}>
                <TouchableOpacity style = {styles.buttonComponent}>
                    <Text style = {styles.buttonText}>Solicitudes de trabajo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.buttonComponent}>
                    <Text style = {styles.buttonText}>Gestión de empresa</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.invitationCodeContainer}>
                <InvitationCodeSection />         
            </View>

            <View style = {styles.calificationContainer}> 
                <RatingCompanyElement />
            </View>

        
        </View>
    );
    
}

const styles = StyleSheet.create({

    AdminCompanyScreenContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        
        backgroundColor: "#ECECEC",
        
    },


    subtitleText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        marginTop: 30,
    },

    scrollViewContainer: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },

    buttonsContainer: {
        flexDirection: "row",
        width: "100%",
        height: 35,
        marginTop: 35,
        justifyContent: "space-around",
    },

    buttonComponent: {
        width: "45%",
        height: "100%",
        backgroundColor: "#482D1C",
        borderRadius: 20,

        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "white",
        marginTop: 5,
        fontFamily: "FigtreeBold",
        fontSize: 12,
        textAlign: "center",
        padding: 0,
    },

    invitationCodeContainer: {
        marginTop: 35,
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    titleInvitationText: {
        fontSize: 12,
        color: "black",
        fontFamily: "FigtreeBold",
        marginLeft: 20,
    },

    invitationCodeItem: {
        width: 150,
        height: 30,
        marginRight: 20,
        borderRadius: 6,

        borderColor: "#0DC143",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,

        alignItems: "center",
        justifyContent: "center",
    },

    invitationCodeText: {
        fontSize: 15,
        color: "black",
        fontFamily: "Figtree",
        textAlign: "center",
    },

    calificationContainer: {
        marginTop: 15,
        width: "100%",
        height: 70,
    },


    
    
});
export default AdminEmpresas;
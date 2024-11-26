import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import HeaderCompanySessions from "../components/headerCompanySessions";
import EmployeeScrollView from "../components/employeesScrollView";


const AdminEmpresas = () => {
    return(
        <View style = {styles.AdminCompanyScreenContainer}>

            <HeaderCompanySessions />

            <Text style = {styles.subtitleText}>Empleados</Text>
            <EmployeeScrollView />
        
        </View>
    );
    
}

const styles = StyleSheet.create({

    AdminCompanyScreenContainer: {
        flex: 1,
        backgroundColor: "red",
        width: "100%",
        alignItems: "center",
    },


    subtitleText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        marginTop: 30,
    },


    
    
});
export default AdminEmpresas;
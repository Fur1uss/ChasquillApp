import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const RatingCompanyElement = () => {
    
    return(
        <View style = {styles.calificationContainer}> 
            <Text style = {styles.titleRatingText}>Nota empresa</Text>
            <View style = {styles.starsContainer}>
                <Image source = {require("../assets/images/unratedStar.png")} style = {styles.starImage} />
                <Image source = {require("../assets/images/unratedStar.png")} style = {styles.starImage} />
                <Image source = {require("../assets/images/unratedStar.png")} style = {styles.starImage} />
                <Image source = {require("../assets/images/unratedStar.png")} style = {styles.starImage} />
                <Image source = {require("../assets/images/unratedStar.png")} style = {styles.starImage} />
            </View>
        </View>
    );
    
}


const styles = StyleSheet.create({
    
    calificationContainer: {

        width: "100%",
        height: "100%",

        justifyContent: "center",
        alignItems: "center",
    },

    titleRatingText: {
        fontFamily: "FigtreeBold",
        fontSize: 15,
        color: "#000000",
        textAlign: "center",
        marginTop: 10,
    },

    starsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    starImage: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    

    
});


export default RatingCompanyElement;
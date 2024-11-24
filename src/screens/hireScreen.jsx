import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageCarousel from "../components/carouselAdComponent";
import MaestrosScroll from "../components/scrollViewMaestros";
import WorkerTypeSelection from "../components/typeWorkerButtonsSelector";
import WorkerImageListView from "../components/workersInfoScroll";

import LottieView from 'lottie-react-native';


import { useFonts } from "expo-font";


import Categories from "../components/categoriesButtonsScrollView";

const Hire = () => {

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    return (
        <View style = {styles.hireScreenContainer}>
            <StatusBar hidden = {true}/>
            <View style = {styles.headerElementContainer}>
                <Text style = {styles.headerText} >Contratar</Text>
            </View>

            <View style = {styles.categoriesContainer}>
                <Text style = {styles.titleTextCategoriesConfig}>Categoría</Text>

                <View style = {styles.scrollViewCategories}>
                    <Categories />
                </View>

            </View>

            <View style = {styles.workerChoiseContainer}>
                <Text style = {styles.titleTextWorkerChoise}>Tipo</Text>
                <WorkerTypeSelection />
            </View>

            <View style = {styles.workersListView}>
                <WorkerImageListView />
            </View>

            <View style = {styles.footerHireScreen}></View>

        </View>
    );
}

const styles = StyleSheet.create({

    hireScreenContainer: {

        alignItems: "center",
        justifyContent: "center",
    },

    headerElementContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFD148",
        padding: 10,

        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

        width: "100%",
        height: 150,
    },

    headerText: {
        fontSize: 50,
        color: "black",
        fontFamily: "FigtreeBold",
    },

    categoriesContainer: {

        marginTop: 15,

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 10,

        width: "90%",
        height: 80,


    },


    titleTextCategoriesConfig: {
        fontSize: 20,
        fontFamily: "FigtreeBold",
        color: "black",
        textAlign: "left",
    },

    workerChoiseContainer: {
        marginTop: 0,
        width: "90%",
        height: 80,

        padding: 10,

    },

    titleTextWorkerChoise: {
        fontSize: 20,
        fontFamily: "FigtreeBold",
        color: "black",
        textAlign: "left",
    },


    workersListView: {
        marginTop: 0,
        width: "100%",
        height: 350,
    },

    footerHireScreen: {
        flex: 0,
        width: "100%",
        height: 100,
        backgroundColor: "#FFD148",

        marginTop: 40,
    },



});

export default Hire;
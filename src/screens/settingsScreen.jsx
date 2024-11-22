import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import { getAuth, signOut } from "firebase/auth";


const Settings = () => {

    const navigation = useNavigation();

    const handleGoToMain = () => {
        navigation.navigate("Main");
    }

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
    });
    
    if (!fontsLoaded) return null;
    
    const handleLogout = async () => {
        const auth = getAuth();
        try{
            await signOut(auth);
            console.log("Usuario deslogueado");
            navigation.navigate("Login");

            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        }catch (error){
            console.log("Error al cerrar sesion", error);
        }
    };

    return (
        <View style={styles.viewStyle}>
            <StatusBar hidden = {true}/>

            <TouchableOpacity style = {styles.returnButton} onPress={handleGoToMain}>
                <View>
                    <Image style = {styles.iconButtonConfig} source={require("../assets/images/returnButton.png")}  />
                </View>
            </TouchableOpacity>

            <View style = {styles.buttonsContainer}>

                <View style = {styles.ButtonContainer01}>
                    <TouchableOpacity style = {styles.smallButtonContainer}>
                        <View style = {styles.infoSmallButton}>
                            <Image style = {styles.infoImageConfig} source={require("../assets/images/userEmoji.png")} />
                            <Text style = {styles.infoTextConfig}>Usuario</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.largeButtonContainer}>

                        <View style = {styles.infoLargeButton}>
                            <Image style = {styles.infoLargeImageConfig} source={require("../assets/images/searchEmoji.png")} />
                            <Text style = {[styles.infoLargeTextConfig, {fontSize: 20}, {marginTop: 15}]}>Busqueda</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style = {styles.ButtonContainer02}>
                    <TouchableOpacity style = {styles.middleButtonContainer}>
                        <Image style = {[styles.infoLargeImageConfig, {height: "50%"},{marginTop:15}]} source={require("../assets/images/bellsEmoji.png")} />
                        <Text style = {[styles.infoLargeTextConfig, {fontSize: 20}, {marginTop: 30},{marginLeft:15} ,{textAlign: "left"}]}>Notificaciones</Text>

                    </TouchableOpacity>
                </View>

                <View style = {styles.ButtonContainer03}>

                    <TouchableOpacity style = {styles.largeButtonContainer} onPress={handleLogout}>
                        <View style = {styles.infoLargeButton}>
                            <Image style = {styles.infoLargeImageConfig} source={require("../assets/images/personEmoji.png")} />
                            <Text style = {styles.infoLargeTextConfig}>Cerrar{"\n"}Sesion</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.smallButtonContainer}>
                        <View style = {styles.infoSmallButton}>
                            <Image style = {styles.infoImageConfig} source={require("../assets/images/faceEmoji.png")} />
                            <Text style = {styles.infoTextConfig}>Privacidad</Text>
                        </View>
                    </TouchableOpacity>

                </View>

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

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",


    },

    footerContainer: {
        flex: 1,
        width: "100%",
        height: 10,
        backgroundColor: "#FFD148",
        marginTop: 40,
    },

    ButtonContainer01: {
        width: "90%",
        height: "32.33%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    ButtonContainer02: {
        width: "90%",
        height: "30.33%",

        
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    ButtonContainer03: {
        width: "90%",
        height: "32.33%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    smallButtonContainer: {
        width: "45%",
        height: "80%",
        backgroundColor: "#ECECEC",

        borderRadius: 10,
    },

    infoSmallButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    infoImageConfig: {
        width: "100%",
        height: "60%",
        resizeMode: "contain",

        marginTop: 10,
    },

    infoTextConfig: {
        fontSize: 20,
        fontFamily: "Figtree",
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginTop: 5,
    },

    middleButtonContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ECECEC",

        borderRadius: 10,
    },

    largeButtonContainer: {
        width: "45%",
        height: "90%",
        backgroundColor: "#ECECEC",

        borderRadius: 10,
    },

    infoLargeButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    infoLargeImageConfig: {
        width: "100%",
        height: "60%",
        resizeMode: "contain",

        marginTop: 10,
    },

    infoLargeTextConfig: {
        fontSize: 15,
        fontFamily: "Figtree",
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginTop: 5,
    },


});

export default Settings;
import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase-config"; // Importa auth desde firebase-config.js
import CustomAlert from "../components/customAlerts";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Figtree: require("../assets/fonts/Figtree.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    if (!email || !password) {
      setAlertMessage("Por favor, ingrese un correo y una contraseña");
      setAlertVisible(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario logueado");
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "Error desconocido";
        switch (errorCode) {
          case "auth/invalid-email":
            errorMessage = "Correo electrónico no válido";
            break;
          case "auth/user-not-found":
            errorMessage = "No se encontró un usuario con este correo";
            break;
          case "auth/wrong-password":
            errorMessage = "Contraseña incorrecta";
            break;
          default:
            errorMessage = error.message;
        }
        setAlertMessage(errorMessage);
        setAlertVisible(true);
      });
  };

  return (
    <View style={styles.viewStyle}>
        <StatusBar backgroundColor="#FFD148" barStyle="dark-content" />
        <Image style={styles.imageLogo} source={require('../assets/images/logoChasquillApp.png')} />
        
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>Bienvenido</Text>
            <Text style={styles.subtitleText}>La App N#1 de busqueda{"\n"}de maestros.</Text>
        </View>

        <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <View style={styles.loginForumContainer}>
                <ImageBackground source={require('../assets/images/ellipseLogin.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.inputContainerUsername}>
                            <Text style={styles.inputTitleConfig}>Correo</Text>
                            <View style={styles.innerShadowContainer}>
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0.25)', 'transparent']}
                                    style={styles.innerShadow}
                                />
                                <TextInput
                                    onChangeText={(text) => setEmail(text)}
                                    style={styles.inputConfig}
                                    keyboardType="email-address"
                                    value={email}
                                />
                            </View>
                        </View>
                        
                        <View style={styles.inputContainerPassword}>
                            <Text style={styles.inputTitleConfigPassword}>Contraseña</Text>
                            <View style={styles.innerShadowContainer}>
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0.25)', 'transparent']}
                                    style={styles.innerShadow}
                                />
                                <TextInput
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={true}
                                    style={styles.inputConfig}
                                    value={password}
                                />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Image source={require('../assets/images/button.png')} style={styles.buttonImage} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.textForgotPassword}>
                            <TouchableOpacity onPress={() => alert("Olvido contra")}>
                                <Text style={{ color: '#482D1C', fontFamily: "Figtree", fontWeight: 'bold', }}>
                                    ¿Olvidaste tu contraseña?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.registerButton}>
                            <TouchableOpacity style={styles.registerButtonConfig} onPress={() => navigation.navigate('Register')}>
                                <Image source={require('../assets/images/registerButton.png')} style={styles.registerButtonImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAvoidingView>

        <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
        />
    </View>
);
}

const styles = StyleSheet.create({
viewStyle: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
},

imageLogo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
},

textContainer: {
    justifyContent: 'center',
    alignItems: 'start',
    marginTop: 30,
    marginRight: 0,
},

titleText: {
    fontFamily: "Figtree",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: 'justify',
},

subtitleText: {
    fontFamily: "Figtree",
    fontWeight: "bold",
    fontSize: 25,
    color: "#482D1C",
    textAlign: 'justify',
},

loginForumContainer: {
    marginTop: 50,
    width: 360,
    height: 500,
    flex: 1,
    flexDirection: 'column',
},

inputContainerUsername: {
    flex: 0,
    justifyContent: 'start',
    margin: 0,
    padding: 0,
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
},

inputContainerPassword: {
    flex: 0,
    justifyContent: 'start',
    margin: 0,
    padding: 0,
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
},


inputTitleConfig: {
    fontSize: 10,
    color: '#482D1C',
    fontFamily: "Figtree",
    fontWeight: 'bold',
    marginRight: 240,
    margin: 0,
    padding: 0,
    width:"100%",
    textAlign:"center"
},

inputTitleConfigPassword: {
    fontSize: 10,
    color: '#482D1C',
    fontFamily: "Figtree",
    fontWeight: 'bold',
    marginRight: 220,
    margin: 0,
    padding: 0,
    width:"100%",
    textAlign:"center"
},


innerShadowContainer: {
    position: 'relative',
    width: 300,
    height: 50,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'white',
},

inputConfig: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 28,
    padding:10,
    margin: 0,
},

innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4, // Ajusta la altura según la profundidad de la sombra que desees
    borderRadius: 28,
},

container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    width: '100%',
    height: 50,
},

buttonImage: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
},

textForgotPassword: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    marginTop: 10,
    width: '100%',
    height: 50,
},

registerButton: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    height: 70,
},


registerButtonImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
},

});



    
export default Login;
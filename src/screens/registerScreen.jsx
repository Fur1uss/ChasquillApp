import React, { useState } from "react";
import { View, Text, StatusBar, Image, StyleSheet, ImageBackground, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../Firebase/firebase-config";
import { db } from "../../Firebase/firebase-config"; // Importar Firestore
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import CustomAlert from "../components/customAlerts";

// initializeApp(firebaseConfig);

const Register = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const auth = getAuth();
    
    const navigation = useNavigation();

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{8}$/;
        return regex.test(phone);
    };

    const checkUserNameExists = async (userName) => {
        const q = query(collection(db, 'users'), where("userName", "==", userName));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const checkRutExists = async (rut) => {
        const q = query(collection(db, 'users'), where("rut", "==", rut));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const checkPhoneExists = async (phone) => {
        const q = query(collection(db, 'users'), where("phone", "==", phone));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const handleCreateAccount = async () => {
        if (!validateEmail(email)) {
            setAlertMessage("⚠️Correo inválido.");
            setAlertVisible(true);
            return;
        }
        if (!validatePhone(phone)) {
            setAlertMessage("⚠️Teléfono inválido. Debe tener 8 dígitos.");
            setAlertVisible(true);
            return;
        }
        if (userName.trim() === "") {
            setAlertMessage("⚠️El nombre de usuario no puede estar vacío.");
            setAlertVisible(true);
            return;
        }

        const userNameExists = await checkUserNameExists(userName);
        if (userNameExists) {
            setAlertMessage("⚠️El nombre de usuario ya está en uso.");
            setAlertVisible(true);
            return;
        }

        const rutUserExist = await checkRutExists(rut);
        if (rutUserExist) {
            setAlertMessage("⚠️El rut ya está en uso.");
            setAlertVisible(true);
            return;
        }

        const phoneUserExist = await checkPhoneExists(phone);
        if (phoneUserExist) {
            setAlertMessage("⚠️El teléfono ya está en uso.");
            setAlertVisible(true);
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario creado:', user);

                const userRef = collection(db, 'users');
                addDoc(userRef, {
                    uid: user.uid,
                    userName: userName,
                    email: email,
                    phone: phone,
                    rut: rut,
                    createdAt: new Date(),
                    profilePicture: "",
                })
                    .then(() => {
                        console.log('Datos del usuario guardados en Firestore');
                        setAlertMessage("💚Cuenta creada correctamente.");
                        setAlertVisible(true);
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                        console.error("Error al guardar los datos en Firestore:", error.message);
                        setAlertMessage("⚠️No se pudo guardar la información en Firestore.");
                        setAlertVisible(true);
                    });
            })
            .catch((error) => {
                console.log(error.message);
                setAlertMessage(error.message);
                setAlertVisible(true);
            });
    };

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
    });

    return (
        <View style={styles.registerContainer}>
            <Text style={styles.registerTitleText}>Encuentra y anuncia{"\n"}soluciones obreras en tu{"\n"}bolsillo!</Text>

            <View style={styles.registerForumContainer}>
                <KeyboardAvoidingView style={{ flex: 0 }} behavior={Platform.OS === "Android" ? "padding" : "height"}>
                    <ImageBackground source={require('../assets/images/ellipseRegister.png')} style={{ width: '100%', height: '100%', alignItems: "center", justifyContent: "center" }}>
                        <View style={styles.forumInputsContainer}>
                            <View style={styles.fullnameInputObject}>
                                <Text style={styles.fullnameText}>Correo</Text>
                                <TextInput style={styles.fullnameInput} value={email} onChangeText={setEmail} />
                            </View>

                            <View style={styles.fullnameInputObject}>
                                <Text style={styles.fullnameText}>Nombre de usuario</Text>
                                <TextInput style={[styles.fullnameInput, styles.inputWidthConfigUsername]} value={userName} onChangeText={setUserName} />
                            </View>

                            <View style={styles.fullnameInputObject}>
                                <Text style={styles.fullnameText}>Teléfono (+569)</Text>
                                <TextInput style={[styles.fullnameInput, styles.inputWidthConfigPhone]} value={phone} onChangeText={setPhone} keyboardType="numeric" maxLength={8} />
                            </View>

                            <View style={styles.fullnameInputObject}>
                                <Text style={styles.fullnameText}>Rut (xxxxxxx-x)</Text>
                                <TextInput 
                                    style={[styles.fullnameInput, styles.inputWidthConfigRut]} 
                                    value={rut} 
                                    onChangeText={setRut} 
                                    maxLength={9} 
                                />
                            </View>

                            <View style={styles.fullnameInputObject}>
                                <Text style={styles.fullnameText}>Contraseña</Text>
                                <TextInput style={[styles.fullnameInput, styles.inputWidthConfigPassword]} value={password} onChangeText={setPassword} secureTextEntry />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                                <Image source={require('../assets/images/button.png')} style={styles.buttonImage} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>

            <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    registerContainer: {
        flex: 0,
        backgroundColor: "#fff",
        textAlign: "center",
        height: "100%",
        width: "100%",
    },
    registerTitleText: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Figtree",
        color: "#482D1C",
        textAlign: "center",
        margin: 20,
        marginBottom: 10,
    },

    registerForumContainer: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
    },

    forumInputsContainer: {
        flex: 0,
        justifyContent: "start",
        alignItems: "center",
        height: "50%",
        width: "95%",
        marginTop: -50,
    },

    fullnameInputObject: {
        flex: 0,
        marginBottom: 10,
        justifyContent: "start",
        alignItems: "start",
        height: "auto",
        width: "100%",
    },
    fullnameText: {
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: "Figtree",
        color: "#482D1C",
        textAlign: "left",
        margin: 0,
    },

    fullnameInput: {
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 5,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin: 0,
    },

    buttonImage: {
        width: 100,
        height: 70,
        resizeMode: 'contain',
        marginTop: 20,
    },

    container: {
        flex: 0,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Register;

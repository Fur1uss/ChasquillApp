import React, { useState } from "react";
import { View, Text, StatusBar, Image, StyleSheet, ImageBackground, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, ActivityIndicator, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../Firebase/firebase-config";
import { db } from "../../Firebase/firebase-config"; // Importar Firestore
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import CustomAlert from "../components/customAlerts";

const Register = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");

    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false); // Estado para la ventana de carga

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

        setLoading(true); // Activar ventana de carga

        try {
            const userNameExists = await checkUserNameExists(userName);
            if (userNameExists) {
                setAlertMessage("⚠️El nombre de usuario ya está en uso.");
                setAlertVisible(true);
                setLoading(false); // Desactivar ventana de carga
                return;
            }

            const rutUserExist = await checkRutExists(rut);
            if (rutUserExist) {
                setAlertMessage("⚠️El rut ya está en uso.");
                setAlertVisible(true);
                setLoading(false);
                return;
            }

            const phoneUserExist = await checkPhoneExists(phone);
            if (phoneUserExist) {
                setAlertMessage("⚠️El teléfono ya está en uso.");
                setAlertVisible(true);
                setLoading(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = collection(db, 'users');
            await addDoc(userRef, {
                uid: user.uid,
                userName: userName,
                email: email,
                phone: phone,
                rut: rut,
                createdAt: new Date(),
                profilePicture: "",
            });

            setAlertMessage("💚Cuenta creada correctamente.");
            setAlertVisible(true);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error:", error.message);
            setAlertMessage(error.message);
            setAlertVisible(true);
        } finally {
            setLoading(false); // Desactivar ventana de carga
        }
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

            <Modal transparent={true} visible={loading}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#482D1C" />
                    <Text style={styles.loadingText}>Registrando...</Text>
                </View>
            </Modal>

            <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    registerContainer: { flex: 1, backgroundColor: "#fff", textAlign: "center", height: "100%", width: "100%" },
    registerTitleText: { fontSize: 25, fontWeight: "bold", fontFamily: "Figtree", color: "#482D1C", textAlign: "center", margin: 20, marginBottom: 10 },
    registerForumContainer: { flex: 1, backgroundColor: "#fff", height: "100%", width: "100%" },
    forumInputsContainer: { justifyContent: "start", alignItems: "center", width: "95%", marginTop: -50 },
    fullnameInputObject: { marginBottom: 10, width: "100%" },
    fullnameText: { fontSize: 10, fontWeight: "bold", fontFamily: "Figtree", color: "#482D1C" },
    fullnameInput: { height: 40, backgroundColor: "#fff", borderRadius: 12, padding: 5, shadowColor: "#000", elevation: 10 },
    buttonImage: { width: 100, height: 70, resizeMode: 'contain', marginTop: 20 },
    container: { marginTop: 20, alignItems: "center", justifyContent: "center" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
    loadingText: { marginTop: 10, fontSize: 16, color: "#fff" }
});

export default Register;

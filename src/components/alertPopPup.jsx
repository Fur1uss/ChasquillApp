import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useFonts } from "expo-font";

const AlertPopup = ({ message, onClose, isError }) => {
    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });

    const bounceValue = useRef(new Animated.Value(0)).current; // Animación de rebote al aparecer
    const fadeValue = useRef(new Animated.Value(1)).current; // Animación de opacidad para desaparecer
    const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del popup

    useEffect(() => {
        // Animación de rebote al aparecer
        Animated.spring(bounceValue, {
            toValue: 1, 
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleClose = () => {
        // Animación de desvanecimiento y escala al cerrar
        Animated.timing(fadeValue, {
            toValue: 0, // Reduce la opacidad a 0 para hacerlo invisible
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Después de que la animación de cierre termine, cambiamos la visibilidad
        setTimeout(() => {
            setIsVisible(false);
            onClose(); // Llamar a la función onClose pasada como prop
        }, 300); // Tiempo que dura la animación de salida (300ms)
    };

    if (!fontsLoaded || !isVisible) return null;

    return (
        <View style={styles.popupContainer}>
            <Animated.View
                style={[
                    styles.popupBox,
                    isError ? styles.errorBox : styles.successBox,
                    {
                        transform: [
                            {
                                scale: bounceValue, // Animación de rebote al aparecer
                            },
                        ],
                        opacity: fadeValue, // Animación de desvanecimiento al cerrar
                    },
                ]}
            >
                <Text style={styles.popupMessage}>{message}</Text>
                <TouchableOpacity style={styles.button} onPress={handleClose}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popupBox: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    successBox: {
        backgroundColor: "#4CAF50",
    },
    errorBox: {
        backgroundColor: "#FF5733",
    },
    popupMessage: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        marginBottom: 15,
        fontFamily: "FigtreeBold",
    },
    button: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: "#333",
        fontFamily: "FigtreeBold",
    },
});

export default AlertPopup;

// WorkerTypeSelection.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { useFonts } from "expo-font";

const WorkerTypeSelectionAnnouncement = () => {
    const [selectedType, setSelectedType] = useState('independent');

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    return (
        <View style={styles.buttonsContainerWorker}>
            <TouchableOpacity 
                style={[
                    styles.typeButton,
                    selectedType === 'company' && styles.selectedButton
                ]}
                onPress={() => setSelectedType('company')}
            >
                <Text style={[
                    styles.typeButtonText,
                    selectedType === 'company' && styles.selectedButtonText
                ]}>
                    Empresa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[
                    styles.typeButton,
                    selectedType === 'independent' && styles.selectedButton
                ]}
                onPress={() => setSelectedType('independent')}
            >
                <Text style={[
                    styles.typeButtonText,
                    selectedType === 'independent' && styles.selectedButtonText
                ]}>
                    Independiente
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainerWorker: {
        flexDirection: 'row',
        gap: 10,

        alignItems: 'center',
        justifyContent: "space-around",

    },
    typeButton: {
        marginTop: 10,
        flex: 0,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedButton: {
        borderColor: '#FFD148',
        backgroundColor: '#FFFFFF',
    },
    typeButtonText: {
        fontSize: 10,
        color: '#333',
        fontWeight: '500',
        fontFamily: 'FigtreeBold',
    },
    selectedButtonText: {
        color: '#000',
    }
});

export default WorkerTypeSelectionAnnouncement;
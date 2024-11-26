
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkerTypeSelection = () => {
    const [selectedType, setSelectedType] = useState('independent');

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
    },
    typeButton: {
        marginTop: 10,
        flex: 0,
        backgroundColor: '#FFFFFF',
        paddingVertical: 4,
        paddingHorizontal: 10,
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
    },
    selectedButtonText: {
        color: '#000',
    }
});

export default WorkerTypeSelection;
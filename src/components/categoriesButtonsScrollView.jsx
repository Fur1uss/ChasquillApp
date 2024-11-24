
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { useFonts } from "expo-font";

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    const categories = [
        { id: '1', title: 'Albañilería 🏗️' },
        { id: '2', title: 'Carpintería 🪚' },
        { id: '3', title: 'Ceramista 🔲' },
        { id: '4', title: 'Climatización 🌡️' },
        { id: '5', title: 'Electricidad ⚡' },
        { id: '6', title: 'Gasfitería 🔥' },
        { id: '7', title: 'Pintura 🎨' },
        { id: '8', title: 'Plomería 🔧' },
        { id: '9', title: 'Soldadura 🦾' },
        { id: '10', title: 'Tabiquería 🧱' },
        { id: '11', title: 'Techumbre 🏠' },
        { id: '12', title: 'Ventanas 🪟' }
    ];

    return (
        <View style={styles.categoriesContainer}>
            <View style={styles.scrollViewCategories}>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {categories.map((category) => (

                        <TouchableOpacity 
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedButton
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category.id && styles.selectedText
                            ]}>
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        marginVertical: 10,
    },

    categoryButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginHorizontal: 2,
    },

    selectedButton: {
        borderColor: '#FFD148',
        borderWidth: 3,
    },
    categoryText: {
        fontSize: 16,
        color: '#333',

        fontFamily: "FigtreeBold",
    },
    selectedText: {
        color: '#000000',
    }
});

export default Categories;
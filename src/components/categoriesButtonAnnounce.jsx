import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


import { useFonts } from "expo-font";

const CategoriesGrid = () => {
    const categories = [
        { id: "1", title: "Albañilería 🏗️" },
        { id: "2", title: "Carpintería 🪚" },
        { id: "3", title: "Ceramista 🔲" },
        { id: "4", title: "Climatización 🌡️" },
        { id: "5", title: "Electricidad ⚡" },
        { id: "6", title: "Gasfitería 🔥" },
        { id: "7", title: "Pintura 🎨" },
        { id: "8", title: "Plomería 🔧" },
        { id: "9", title: "Soldadura 🦾" },
        { id: "10", title: "Tabiquería 🧱" },
        { id: "11", title: "Techumbre 🏠" },
        { id: "12", title: "Ventanas 🪟" },
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handlePress = (id) => {
        if (selectedCategories.includes(id)) {

            setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
        } else {

            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const [fontsLoaded] = useFonts({
        Figtree: require("../assets/fonts/Figtree.ttf"),
        FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
    });
    
    if (!fontsLoaded) return null;

    return (
        <View style={styles.gridContainer}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.categoryButton,
                        selectedCategories.includes(category.id) && styles.selectedButton,
                    ]}
                    onPress={() => handlePress(category.id)}
                >
                    <Text style={styles.buttonText}>{category.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,

        marginTop: 10,

    },
    categoryButton: {
        backgroundColor: "#FFFFFF",
        width: "30%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

        
    },
    selectedButton: {
        borderColor: "#FFD148",
        borderWidth: 3,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 11,
        color: "#000000",
        fontFamily: "FigtreeBold",
    },
});

export default CategoriesGrid;

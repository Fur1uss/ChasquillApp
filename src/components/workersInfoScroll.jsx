import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";

const WorkerImageListView = () => {
    const images = [
        require("../assets/images/worker01.png"),
        require("../assets/images/worker02.png"),
        require("../assets/images/worker01.png"),
    ];

    const getShuffledImages = () => {
        const repeatedImages = [...images, ...images, ...images]; // Repetir imágenes
        return repeatedImages.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
    };

    const shuffledImages = getShuffledImages();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {shuffledImages.map((image, index) => (
                <Image key={index} source={image} style={styles.workerImage} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 0,
        alignItems: "center",
        paddingVertical: 10,
 
    },
    workerImage: {
        flex: 0,
        width: "90%",
        height: 100,
        marginBottom: 10,
        borderRadius: 10,

        resizeMode: "contain",
        
    },
});

export default WorkerImageListView;

import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, FlatList, Animated } from 'react-native';

const images = [
  require('../assets/images/ad01.png'),
  require('../assets/images/ad01.png'),
  require('../assets/images/ad01.png'),
];

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const ImageCarousel = () => {
  const flatListRef = useRef(null); // Referencia al FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la imagen actual
  const scrollX = useRef(new Animated.Value(0)).current; // Para manejar la animación

  // Efecto para mover automáticamente el carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    imageContainer: {
      width: width,
      height: height,

    },
    image: {
      width: "70%",
      height: height * 0.135, // Relación 16:9 (ancho * alto/ancho)
      resizeMode: "stretch", // Cambia a 'contain' si prefieres que no se recorte
      borderRadius: 10,
    },
  });
  
export default ImageCarousel;

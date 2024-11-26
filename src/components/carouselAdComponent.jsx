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
  const flatListRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current; 


  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval); 
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
      height: height * 0.135,
      resizeMode: "stretch",
      borderRadius: 10,
    },
  });
  
export default ImageCarousel;

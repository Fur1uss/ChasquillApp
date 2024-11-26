import React from 'react';
import { ScrollView, Image, StyleSheet,TouchableOpacity} from 'react-native';

const MaestrosScroll = () => {

  const imageArray = Array(20).fill(null);

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
    >

      {imageArray.map((_, index) => (

        <TouchableOpacity>
            <Image key={index}source={require('../assets/images/rectangleMaestroScrollView.png')}style={styles.maestroImage}/>
        </TouchableOpacity>

      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
  },
  maestroImage: {
    width: '100%',
    height: 40,
    marginVertical: 2,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default MaestrosScroll;
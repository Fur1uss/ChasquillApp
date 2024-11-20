import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);

      if (user) {
        navigation.replace("Main"); 
      } else {
        navigation.replace("Login");
      }
    });


    return () => unsubscribe();
  }, [navigation]);


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }


  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

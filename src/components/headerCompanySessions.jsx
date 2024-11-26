import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LottieView from 'lottie-react-native';

const HeaderCompanySessions = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);


  const fadeAnim = useState(new Animated.Value(0))[0]; 
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!userId) return;

      try {
        let companyQuery;
        let querySnapshot;


        companyQuery = query(
          collection(db, "empresas"),
          where("administradorEmpresa", "==", userId)
        );
        querySnapshot = await getDocs(companyQuery);

        if (querySnapshot.empty) {

          companyQuery = query(
            collection(db, "empresas"),
            where("miembrosEmpresa", "array-contains", userId)
          );
          querySnapshot = await getDocs(companyQuery);
        }

        if (!querySnapshot.empty) {
          const companyDoc = querySnapshot.docs[0];
          setCompanyData(companyDoc.data());
        } else {
          console.error("No se encontró la empresa asociada al usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [userId]);


  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>

        <LottieView
          source={require('../assets/animations/loadingAnimation.json')}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <Animated.Text style={[styles.headerText, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {companyData ? companyData.nombreEmpresa : "Nombre no disponible"}
      </Animated.Text>
      <Animated.Image
        style={[styles.imageUser, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
        source={
          companyData && companyData.logoEmpresa
            ? { uri: companyData.logoEmpresa }
            : require("../assets/images/defaultUserImage.png")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "130%",
    height: 250,
    backgroundColor: "#FFD148",
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  headerText: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },

  imageUser: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
  },

  loadingContainer: {
    width: "130%",
    height: 250,
    backgroundColor: "#FFD148",
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  lottieStyle: {
    width: 100,
    height: 100,
  },
});

export default HeaderCompanySessions;

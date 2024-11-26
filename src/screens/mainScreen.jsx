import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageCarousel from "../components/carouselAdComponent";
import MaestrosScroll from "../components/scrollViewMaestros";

import LottieView from 'lottie-react-native';
import { useFonts } from "expo-font";

const Main = () => {
  const [username, setUsername] = useState("usuario");
  const [userPhoto, setUserPhoto] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
  
        if (!db) {
          console.warn("Error: No se pudo establecer conexión con Firestore");
          return;
        }
  
        if (!user) {

          return;
        }
  
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
  
        const matchingDoc = querySnapshot.docs.find(
          (docSnap) => docSnap.data().uid === user.uid
        );
  
        if (!matchingDoc) {
          console.warn(`No se encontró documento para el UID: ${user.uid}`);
          return;
        }
  
        const userData = matchingDoc.data();
        setUsername(userData.userName || userData.username || "usuario");
        setUserPhoto(userData.profilePicture || "");
  

        const empresasCollection = collection(db, "empresas");
        const empresasSnapshot = await getDocs(empresasCollection);
  
        for (const empresaDoc of empresasSnapshot.docs) {
          const empresaData = empresaDoc.data();
  
          if (empresaData.administradorEmpresa === user.uid) {
            setUserRole("admin");
            return;
          }
  
          if (empresaData.miembrosEmpresa?.includes(user.uid)) {
            setUserRole("member");
            return;
          }
        }
  
        setUserRole(null);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData();
      }
    });
  
    return () => unsubscribe();
  }, []);


  const [fontsLoaded] = useFonts({
    Figtree: require("../assets/fonts/Figtree.ttf"),
    FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
  });

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("../assets/animations/loadingAnimation.json")}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <View style={styles.mainScreenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFD148"} />
      <Image style={styles.mainScreenLogo} source={require('../assets/images/logoChasquillApp.png')} />

      <View style={styles.sliderAdsContainer}>
        <ImageCarousel />
      </View>

      <View style={styles.usernameInfoContainer}>
        <View style={styles.infoUser}>
          <Text style={styles.textInfoUser} adjustsFontSizeToFit numberOfLines={2} minimumFontScale={0.5}>
            Hola!{"\n"}@{username}
          </Text>
        </View>
        <View style={styles.userPhoto}>
          <Image
            style={styles.userPhotoImage}
            source={
              userPhoto ? { uri: userPhoto } : require("../assets/images/defaultUserImage.png")
            }
          />
        </View>
      </View>

      <View style={styles.interactiveMenuContainer}>
        <View style={styles.mainMenuLeft}>
          <View style={styles.maestrosSliderContainer}>
            <Text style={styles.maestrosTitleText}>Trabajos</Text>
            <View style={styles.sliderMaestrosContainer}>
              <MaestrosScroll />
            </View>
          </View>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.bottomTouchableContainer}
              onPress={() => navigation.navigate('Settings')}
            >
              <View style={styles.bottomButtonsConfig}>
                <Text style={styles.bottomButtonText}>Configuracion</Text>
                <Image style={styles.bottomButtonImage} source={require("../assets/images/settingsEmoji.png")} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTouchableContainer}
              onPress={() => {
                if (userRole === "admin") {
                  navigation.navigate("AdminCompany");
                } else if (userRole === "member") {
                  navigation.navigate("UserCompany");
                } else {
                  navigation.navigate("Company");
                }
              }}
            >
              <View style={styles.bottomButtonsConfig}>
                <Text style={styles.bottomButtonText}>Empresas</Text>
                <Image style={[styles.bottomButtonImage, { marginLeft: 10 }]} source={require("../assets/images/buildingEmoji.png")} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.otherMenuContainer}>
          <TouchableOpacity style={styles.MenuButton} onPress={() => navigation.navigate('Hire')}>
            <View>
              <Text style={styles.titleTextIcon}>Contratar</Text>
              <LottieView autoPlay loop style={[styles.imageIcon, { marginLeft: 2 }]} source={require("../assets/animations/money.json")} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.MenuButton} onPress={() => navigation.navigate('Announce')}>
            <View>
              <Text style={styles.titleTextIcon}>Anunciar</Text>
              <LottieView autoPlay loop style={styles.imageIcon} source={require("../assets/animations/construction.json")} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerImage}></View>
    </View>
  );
};


const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F4F4",

      },
      loadingAnimation: {
        width: 100,  // Tamaño más pequeño
        height: 100, // Tamaño más pequeño
        backgroundColor: 'transparent', // Fondo transparente
        borderRadius: 10, // Bordes redondeados si lo deseas
      },
      
    mainScreenContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },

    mainScreenLogo: {
        flex: 0,
        width: 300,
        height: 200,
        resizeMode: 'contain',
        margin: 0,
        padding: 0,
        marginTop: -50,
    },

    sliderAdsContainer: {
        width: '70%',
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 10,
        margin: 0,
        marginTop: -40,

        alignItems: 'center',
        justifyContent: 'center',
    },

    usernameInfoContainer: {
        width: '90%',
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 0,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
    },

    infoUser: {
        width: '60%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },

    textInfoUser: {
        fontSize: 35,
        fontFamily: 'FigtreeBold',
    },

    userPhoto: {
        width: '40%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },

    userPhotoImage: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
        alignContent: 'center',

        resizeMode: "cover",
    },

    interactiveMenuContainer: {
        width: '90%',
        height: '40%',
        marginTop: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
    },

    mainMenuLeft: {
        width: '60%',
        height: '100%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",

    },

    maestrosSliderContainer: {
        width: '100%',
        
        height: '75%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        
    },

    maestrosTitleText: {
        fontSize: 30,
        fontFamily: 'FigtreeBold',
        textAlign: 'center',
    },

    sliderMaestrosContainer : {
        width: '90%',
        height: '80%',
        borderRadius: 10,

    },

    bottomButtonsContainer: {
        width: '100%',
        height: '24%',
        borderRadius: 0,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    bottomTouchableContainer: {
        width: '100%',
        height: '48%',
        borderRadius: 10,
        backgroundColor: '#FFF',
    },

    bottomButtonsConfig: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#FFF',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        
        padding: 0,
        margin: 0,

    },

    bottomButtonText: {
        fontSize: 20,
        fontFamily: 'FigtreeBold',
        textAlign: "left",
    },


    bottomButtonImage: {
        width: "15%",
        height: "70%",
        resizeMode: 'contain',

        padding: 0,
        margin: 0,
    },

    otherMenuContainer: {
        width: '38%',
        height: '100%',
        borderRadius: 10,
        marginLeft: '2%',
        gap: "2%",
    },

    MenuButton: {
        width: '100%',
        height: '49%',
        backgroundColor: '#FFF',
        borderRadius: 10,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleTextIcon: {
        fontSize: 20,
        fontFamily: 'FigtreeBold',
        textAlign: 'center',
    },

    imageIcon: {
        marginTop: 20,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },

    footerImage: {
        width: "100%",
        height: 50,
        backgroundColor: '#FFD148',
        marginTop: 80,

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    }
});

export default Main;

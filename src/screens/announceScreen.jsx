import React, { useState } from "react";
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AlertPopup from "../components/alertPopPup";

import CategoriesGrid from "../components/categoriesButtonAnnounce";

const Announce = () => {
  const [fontsLoaded] = useFonts({
    Figtree: require("../assets/fonts/Figtree.ttf"),
    FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
  });
  
  if (!fontsLoaded) return null;

  const [presupuesto, setPresupuesto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation();


  const formatToCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue
      ? new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }).format(parseInt(numericValue, 10))
      : "";
  };

  const handlePresupuestoChange = (value) => {
    setPresupuesto(formatToCurrency(value));
  };

  const handleSubmit = () => {

    if (descripcion.trim() === "") {
      setAlertMessage("¡La descripción no puede estar vacía! 😔");
      setIsError(true);
      setShowAlert(true);
      return;
    }

    if (presupuesto.trim() === "") {
      setPresupuesto("0");
    }


    setAlertMessage("¡Datos creados correctamente! 🎉");
    setIsError(false);
    setShowAlert(true);


    setTimeout(() => {
      setShowAlert(false);
      navigation.navigate("Main");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 1000);
  };

  return (
    <View style={styles.announceScreenContainer}>
      <StatusBar hidden={true} />

      <View style={styles.headerElementContainer}>
        <Text style={styles.headerText}>Anunciar</Text>
      </View>

      <View style={styles.categoriesAnnouncementContainer}>
        <Text style={styles.categoriesTitleText}>Categoría</Text>
        <View style={styles.categoriesButtonsContainer}>
          <CategoriesGrid />
        </View>
      </View>

      <View style={styles.infoPresupuestoContainer}>
        <Text style={styles.textPresupuesto}>Valor presupuesto:</Text>
        <TextInput
          style={styles.inputPresupuesto}
          value={presupuesto}
          placeholder="$0"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={handlePresupuestoChange}
        />
      </View>

      <View style={styles.aboutMeContainer}>
        <Text style={styles.aboutMeText}>Sobre ti</Text>
        <TextInput
          style={styles.inputAboutMe}
          placeholder="Escribe una breve descripción"
          multiline
          numberOfLines={4}
          maxLength={200}
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      <TouchableOpacity style={styles.sendInfoButton} onPress={handleSubmit}>
        <Text style={styles.textButton}>Anunciarte!</Text>
      </TouchableOpacity>

      <View style={styles.footerHireScreen}></View>

      {showAlert && <AlertPopup message={alertMessage} onClose={() => setShowAlert(false)} isError={isError} />}
    </View>
  );
};

const styles = StyleSheet.create({
  announceScreenContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerElementContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD148",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "100%",
    height: 150,
  },
  headerText: {
    fontSize: 50,
    color: "black",
    fontFamily: "FigtreeBold",
  },
  categoriesAnnouncementContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    width: "90%",
  },
  categoriesTitleText: {
    fontSize: 20,
    fontFamily: "FigtreeBold",
    color: "black",
    textAlign: "left",
  },
  infoPresupuestoContainer: {
    marginTop: 10,
    width: "90%",
    height: 60,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textPresupuesto: {
    fontSize: 20,
    fontFamily: "FigtreeBold",
    color: "black",
    textAlign: "left",
  },
  inputPresupuesto: {
    width: "40%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
    textAlign: "center",
    borderColor: "#0DC143",
    borderWidth: 2,
    fontFamily: "FigtreeBold",
    color: "black",
  },
  aboutMeContainer: {
    marginTop: 10,
    width: "90%",
    height: 200,
    padding: 10,
    flexDirection: "column",
  },
  aboutMeText: {
    fontSize: 20,
    fontFamily: "FigtreeBold",
    color: "black",
    textAlign: "left",
  },
  inputAboutMe: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    fontFamily: "Figtree",
    color: "black",
    textAlignVertical: "top",
    borderColor: "#482D1C",
    borderWidth: 2,
  },
  sendInfoButton: {
    width: "50%",
    height: 50,
    backgroundColor: "#482D1C",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 17,
    fontFamily: "FigtreeBold",
    color: "white",
  },
  footerHireScreen: {
    flex: 1,
    width: "100%",
  },
});

export default Announce;

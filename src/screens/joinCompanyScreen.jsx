import React, { useState } from "react";
import { View, Text, StatusBar, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore"; // Corregir la importación
import { auth } from "../../Firebase/firebase-config"; // Importar auth desde firebase-config.js

const JoinEmpresas = () => {
  const [codigo, setCodigo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalEmoji, setModalEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Mantener el estado de carga
  const navigation = useNavigation();

  // Función para manejar la validación del código y agregar al usuario a la empresa
  const handleUnirse = async () => {
    if (!codigo) {
      Alert.alert("Error", "Por favor ingresa un código válido.");
      return;
    }

    setIsLoading(true);  // Activamos el estado de cargando

    try {
      // Obtener referencia a Firestore y hacer la consulta
      const db = getFirestore();
      const empresasRef = collection(db, "empresas");
      const q = query(empresasRef, where("codigoUnirseEmpresa", "==", codigo)); // Filtrar por código

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si no se encontró ningún documento con el código ingresado
        setModalMessage("El código ingresado no es válido.");
        setModalEmoji("⚠️");
        setModalVisible(true);
      } else {
        // Si el código es válido, agregar al usuario al array de miembros
        const currentUser = auth.currentUser;
        if (currentUser) {
          const empresaDoc = querySnapshot.docs[0]; // Obtener el primer documento encontrado
          const empresaRef = doc(db, "empresas", empresaDoc.id); // Obtener la referencia al documento de la empresa
          await updateDoc(empresaRef, {
            miembrosEmpresa: arrayUnion(currentUser.uid), // Usar arrayUnion para agregar el UID
          });

          setModalMessage("¡Te has unido a la empresa exitosamente!");
          setModalEmoji("🎉");
          setModalVisible(true);

          // Redirigir al main (cerrando la pantalla actual)
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Main"); // Reemplazar con el nombre de tu pantalla principal
          }, 2000);
        } else {
          setIsLoading(false);
          Alert.alert("Error", "No se pudo encontrar el usuario autenticado.");
        }
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setIsLoading(false);
      Alert.alert("Error", "Hubo un problema al procesar tu solicitud.");
    } finally {
      setIsLoading(false); // Asegurarnos de que siempre se cierre el modal de carga
    }
  };

  return (
    <View style={styles.joinEmpresasScreenContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 25, color: "black", fontFamily: "FigtreeBold" }}>Empresas</Text>
        <Image style={styles.emojiImageConfig} source={require("../assets/images/buildingEmoji.png")} />
      </View>

      <View style={styles.enterCodeInvitationContainer}>
        <Text style={styles.titleText}>Ingresa el código de{"\n"}invitación</Text>
        <TextInput
          style={styles.enterCodeInvitationInput}
          placeholder="#Código"
          value={codigo}
          onChangeText={setCodigo}
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleUnirse} disabled={isLoading}>
        <Text style={styles.sendButtonText}>{isLoading ? "Unirse" : "Unirse"}</Text>
      </TouchableOpacity>

      {/* Modal de mensaje de éxito o error */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>
            {modalEmoji} { } {modalMessage} 
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Cargando */}
      <Modal
        transparent={true}
        visible={isLoading}
        animationType="fade"
      >
        <View style={styles.loadingModalContainer}>
          <View style={styles.loadingModalContent}>
            <ActivityIndicator size="large" color="#FFD148" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  joinEmpresasScreenContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
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
  emojiImageConfig: {
    width: 90,
    height: 90,
    marginTop: 20,
  },
  enterCodeInvitationContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 120,
  },
  titleText: {
    fontSize: 25,
    color: "black",
    fontFamily: "FigtreeBold",
    textAlign: "center",
  },
  enterCodeInvitationInput: {
    width: "65%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    borderColor: "#0DC143",
    borderWidth: 2,
    textAlign: "center",

    fontFamily: "Figtree",
  },
  sendButton: {
    width: "40%",
    height: 50,
    backgroundColor: "#482D1C",
    borderRadius: 10,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    fontSize: 25,
    color: "white",
    fontFamily: "FigtreeBold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalMessage: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginBottom: 20,

    fontFamily: "FigtreeBold",
  },
  closeButton: {
    backgroundColor: "#FFD148",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "FigtreeBold",
  },
  loadingModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingModalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
    fontFamily: "FigtreeBold",
  },
});

export default JoinEmpresas;

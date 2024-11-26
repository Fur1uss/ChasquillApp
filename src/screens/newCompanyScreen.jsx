import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Modal, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AlertPopup from "../components/alertPopPup";
import * as MediaLibrary from 'expo-media-library';

const generateRandomCode = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const NuevaEmpresas = () => {
  const [fontsLoaded] = useFonts({
    Figtree: require("../assets/fonts/Figtree.ttf"),
    FigtreeBold: require("../assets/fonts/FigtreeBold.ttf"),
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [storageError, setStorageError] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "No puedes seleccionar imágenes sin otorgar permisos.");
      return false;
    }
    return true;
  };

  const handleImageUpload = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        alert("No se otorgaron los permisos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Imagen seleccionada:", result.assets[0].uri);
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error seleccionando imagen:", err);
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      setAlertMessage("⚠️El nombre de la empresa es obligatorio.");
      setIsError(true);
      return;
    }

    if (!description.trim()) {
      setAlertMessage("⚠️La descripción de la empresa es obligatoria.");
      setIsError(true);
      return;
    }

    if (description.length > 150) {
      setAlertMessage("⚠️La descripción no debe exceder los 150 caracteres.");
      setIsError(true);
      return;
    }

    setLoading(true);

    const q = query(collection(db, "empresas"), where("nombreEmpresa", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setAlertMessage("⚠️El nombre de la empresa ya está en uso.");
      setIsError(true);
      setLoading(false);
      return;
    }

    const codigoUnirseEmpresa = generateRandomCode(9);

    const usuario = auth.currentUser;
    if (!usuario) {
      console.log("No se ha encontrado un usuario logueado.");
      setAlertMessage("⚠️No hay usuario logueado.");
      setIsError(true);
      setLoading(false);
      return;
    }

    let logoUrl = "";
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        const fileName = `empresas/${auth.currentUser.uid}_${Date.now()}_logo.jpg`;
        const logoRef = ref(storage, fileName);

        const snapshot = await uploadBytes(logoRef, blob);
        logoUrl = await getDownloadURL(snapshot.ref);

        console.log("URL de la imagen subida:", logoUrl);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        setAlertMessage(`⚠️ Error al subir imagen: ${error.message}`);
        setIsError(true);
        setLoading(false);
        return;
      }
    }

    try {
      const empresaRef = await addDoc(collection(db, "empresas"), {
        administradorEmpresa: usuario.uid,
        codigoUnirseEmpresa,
        descripcionEmpresa: description,
        fechaRegistroEmpresa: new Date(),
        logoEmpresa: logoUrl,
        nombreEmpresa: name,
        miembrosEmpresa: [],
        notaEmpresa: 0,
      });
      console.log("Empresa registrada con éxito. ID de la empresa:", empresaRef.id);

      setAlertMessage("💚¡Empresa registrada exitosamente!");
      setIsError(false);

      setShowSuccessMessage(true);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }, 3000);

      setLoading(false);  

    } catch (error) {
      console.error("Error al registrar la empresa:", error);
      setAlertMessage("⚠️Error al registrar la empresa.");
      setIsError(true);
      setLoading(false);  
    }
  };

  useEffect(() => {
    const checkStorageConnection = async () => {
      try {
        console.log("Verificando conexión a Firebase Storage");
        console.log("Storage object:", storage);

        const storageRef = ref(storage);

        console.log("Conexión a Firebase Storage establecida exitosamente");
      } catch (error) {
        console.error("Error en la conexión a Storage:", error);
        setStorageError(`⚠️ No se pudo conectar con Firebase Storage: ${error.message}`);
      }
    };

    checkStorageConnection();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.companyScreenContainer}>

      <View style={styles.headerContainer}>
        <Text style={styles.titleTextHeader}>Empresas</Text>
        <Image
          style={styles.emojiImgConfig}
          source={require("../assets/images/buildingEmoji.png")}
        />
      </View>

      <View style={styles.inputsContainer}>
        <View style={styles.nameInputElement}>
          <Text style={styles.titleTextName}>Nombre de la empresa</Text>
          <TextInput
            style={styles.inputNameStyle}
            value={name}
            onChangeText={setName}
            placeholder="Ingrese el nombre"
          />
        </View>

        <View style={styles.descriptionInputElement}>
          <Text style={styles.titleTextDescription}>Descripción</Text>
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={150}
            style={styles.inputDescriptionStyle}
            value={description}
            onChangeText={setDescription}
            placeholder=" Máximo 150 caracteres"
          />
          <Text style={styles.charCounter}>{description.length}/150</Text>
        </View>
      </View>

      <View style={styles.logoUploadContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.uploadImageText}>Subir logo empresa</Text>
          <Text style={styles.optionalText}>(Opcional)</Text>
        </View>
        
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.uploadImageButton} onPress={handleImageUpload}>
            <Image 
              style={styles.imageUploadConfig} 
              source={require("../assets/images/uploadEmoji.png")}
            />
          </TouchableOpacity>
          
          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.imagePreview} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeImageButton} 
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerTextButton}>Registrar</Text>
      </TouchableOpacity>

      <View style = {styles.footer}></View>

      {alertMessage ? (
        <AlertPopup
          message={alertMessage}
          isError={isError}
          onClose={() => setAlertMessage("")}
        />
      ) : null}

      {loading && (
        <Modal transparent={true} visible={loading}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Registrando empresa...</Text>
            </View>
          </View>
        </Modal>
      )}

      {showSuccessMessage && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>💚¡Empresa registrada exitosamente!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  companyScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#FFD148",

    width: "100%",
    height: 60,
  },
  titleTextHeader: {
    fontSize: 24,
    fontFamily: "FigtreeBold",
  },
  emojiImgConfig: {
    width: 40,
    height: 40,
  },
  inputsContainer: {
    marginBottom: 20,
    width: "90%",
  },
  nameInputElement: {
    marginBottom: 20,
  },
  titleTextName: {
    fontSize: 16,
    fontFamily: "FigtreeBold",
  },
  inputNameStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    fontFamily: "Figtree",
  },
  descriptionInputElement: {
    marginBottom: 20,
    
  },
  titleTextDescription: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputDescriptionStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    height: 100,

    textAlignVertical: "top",

    fontFamily: "Figtree",
  },
  charCounter: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  logoUploadContainer: {
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  uploadImageText: {
    fontSize: 16,
    fontFamily: "FigtreeBold",
  },
  optionalText: {
    fontSize: 14,
    fontFamily: "Figtree",
    color: "#aaa",
  },
  imageUploadContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  uploadImageButton: {
    alignItems: "center",
  },
  imageUploadConfig: {
    width: 40,
    height: 40,
  },
  imagePreviewContainer: {
    marginTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3784C8',
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "FigtreeBold",
  },
  registerButton: {
    backgroundColor: "#482D1C",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  registerTextButton: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "FigtreeBold",
  },

  footer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFD148",
    marginTop: 200,
  },


  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#3784C8",
  },
});

export default NuevaEmpresas;
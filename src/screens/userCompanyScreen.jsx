import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayRemove,getDocs,query,collection,where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import HeaderCompanySessions from "../components/headerCompanySessions";
import EmployeeScrollView from "../components/employeesScrollView";
import RatingCompanyElement from "../components/ratingCompanyElement";
import InvitationCodeSection from "../components/invitationCodeElement";

const UserEmpresas = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  const handleLeaveCompany = async () => {
    const user = auth.currentUser;
    if (!user) {
      return; // Asegúrate de que el usuario esté autenticado.
    }

    try {
      setLoading(true);
      const companyQuery = await getDocs(query(
        collection(db, "empresas"),
        where("miembrosEmpresa", "array-contains", user.uid)
      ));

      if (!companyQuery.empty) {
        const companyId = companyQuery.docs[0].id;
        const companyRef = doc(db, "empresas", companyId);

        // Eliminar el uid del array miembrosEmpresa
        await updateDoc(companyRef, {
          miembrosEmpresa: arrayRemove(user.uid),
        });

        // Cerrar sesión o redirigir al usuario
        setLoading(false);
        setIsModalVisible(false); // Cerrar el modal
        navigation.navigate("Main"); // Redirigir al Main
      }
    } catch (error) {
      console.error("Error leaving company:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.UserEmpresasScreenContainer}>
      <HeaderCompanySessions />

      <Text style={styles.subtitleText}>Empleados</Text>
      <View style={styles.scrollViewContainer}>
        <EmployeeScrollView />
      </View>

      <View style={styles.calificationContainer}>
        <RatingCompanyElement />
      </View>

      <TouchableOpacity
        style={styles.buttonComponent}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Dejar empresa</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¿Estás seguro de dejar la empresa?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#C52528" }]}
                onPress={handleLeaveCompany}
                disabled={loading}
              >
                <Text style={styles.modalButtonText}>
                  {loading ? "Cargando..." : "Sí"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#96CAA5" }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  UserEmpresasScreenContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ECECEC",
  },

  subtitleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 30,
  },

  scrollViewContainer: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },

  calificationContainer: {
    marginTop: 15,
    width: "100%",
    height: 70,
  },

  buttonComponent: {
    width: "40%",
    height: 50,
    backgroundColor: "#C52528",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },

  buttonText: {
    fontSize: 15,
    color: "white",
    fontFamily: "FigtreeBold",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  modalButton: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },

  modalButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default UserEmpresas;

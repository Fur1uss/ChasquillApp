import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Animated } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const InvitationCodeSection = () => {
  const [userId, setUserId] = useState(null);
  const [codigoUnirseEmpresa, setCodigoUnirseEmpresa] = useState("");
  const [copied, setCopied] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchCompanyCode = async () => {
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
          setCodigoUnirseEmpresa(companyDoc.data().codigoUnirseEmpresa);
        } else {
          console.error("No se encontró la empresa asociada al usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
      }
    };

    fetchCompanyCode();
  }, [userId]);

  const handleCopyCode = async () => {

    await Clipboard.setString(codigoUnirseEmpresa);


    setCopied(true);

  
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        delay: 1500,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.invitationCodeContainer}>
      <Text style={styles.titleInvitationText}>Código de invitación</Text>

      <View style = {styles.messageAndCodeContainer}>

        <View style={styles.invitationCodeItem}>
                <TouchableOpacity onPress={handleCopyCode}>
                <Text style={styles.invitationCodeText}>
                    {codigoUnirseEmpresa || "#Cargando..."}
                </Text>
                </TouchableOpacity>
            </View>

            {copied && (
                <Animated.View style={[styles.copiedMessage, { opacity: fadeAnim }]}>
                <Text style={styles.copiedText}>¡Copiado!</Text>
                </Animated.View>
            )}

      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  invitationCodeContainer: {
    marginTop: 35,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  titleInvitationText: {
    fontSize: 12,
    color: "black",
    fontFamily: "FigtreeBold",
    marginLeft: 20,
  },

  invitationCodeItem: {
    width: 150,
    height: 30,
    marginRight: 20,
    borderRadius: 6,
    borderColor: "#0DC143",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  invitationCodeText: {
    fontSize: 15,
    color: "black",
    fontFamily: "Figtree",
    textAlign: "center",
  },

  copiedMessage: {
    alignItems: "center",
    justifyContent: "center",
  },

  copiedText: {
    fontSize: 10,
    fontFamily: "Figtree",
    color: "green",
  },
});

export default InvitationCodeSection;

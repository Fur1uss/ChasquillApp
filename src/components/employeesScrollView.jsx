import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import LottieView from 'lottie-react-native';

const EmployeeScrollView = () => {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const fetchEmployees = async () => {
            const user = auth.currentUser;
            if (!user) {
                return;
            }

            try {
                const userId = user.uid;
                let companyQuery;
                let companySnapshot;


                companyQuery = query(
                    collection(db, 'empresas'),
                    where('administradorEmpresa', '==', userId)
                );
                companySnapshot = await getDocs(companyQuery);

                let companyId = null;

                if (!companySnapshot.empty) {

                    companyId = companySnapshot.docs[0].id;
                } else {

                    companyQuery = query(
                        collection(db, 'empresas'),
                        where('miembrosEmpresa', 'array-contains', userId)
                    );
                    companySnapshot = await getDocs(companyQuery);

                    if (!companySnapshot.empty) {

                        companyId = companySnapshot.docs[0].id;
                    } else {
                        setMessage('No hay empresa asociada al usuario.');
                        setLoading(false);
                        return;
                    }
                }


                const companyDoc = companySnapshot.docs[0].data();
                const members = companyDoc.miembrosEmpresa || [];

                if (members.length === 0) {
                    setMessage('De momento no hay empleados 😔');
                    setLoading(false);
                    return;
                }


                const usersQuery = query(
                    collection(db, 'users'),
                    where('uid', 'in', members)
                );
                const usersSnapshot = await getDocs(usersQuery);

                const employeesData = usersSnapshot.docs.map(doc => {
                    const userData = doc.data();
                    return {
                        uid: userData.uid,
                        userName: userData.userName,
                        profilePicture: userData.profilePicture || 'default',
                    };
                });

                setEmployees(employeesData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error al cargar los empleados.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <View style={styles.warningContainer}>
            {loading ? (
                <LottieView
                    source={require('../assets/animations/loadingAnimation.json')}
                    autoPlay
                    loop
                    style={styles.loadingAnimation}
                />
            ) : message ? (
                <Text style={styles.messageText}>{message}</Text>
            ) : (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    {employees.map((employee, index) => (
                        <View key={index} style={styles.employeeContainer}>
                            {/* Aquí se hace la validación para usar imagen por defecto o la URL */}
                            <Image
                                style={styles.employeeImage}
                                source={employee.profilePicture === 'default' ? require('../assets/images/defaultEmployeesImage.png') : { uri: employee.profilePicture }}
                            />
                            <Text style={styles.employeeName}>{employee.userName}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 150,
    },
    employeeContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        width: 95,
    },
    employeeImage: {
        width: 90,
        height: 100,
        borderRadius: 5,
        marginBottom: 5,
    },
    employeeName: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingAnimation: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },

    warningContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    messageText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'FigtreeBold',
    },
});

export default EmployeeScrollView;

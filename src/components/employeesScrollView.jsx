import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const EmployeeScrollView = () => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {Array.from({ length: 20 }).map((_, index) => (
                <View key={index} style={styles.employeeContainer}>
                    <Image
                        style={styles.employeeImage}
                        source={require('../assets/images/defaultEmployeesImage.png')}
                    />
                    <Text style={styles.employeeName}>@nombreUser{index + 1}</Text>
                </View>
            ))}
        </ScrollView>
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
});

export default EmployeeScrollView;

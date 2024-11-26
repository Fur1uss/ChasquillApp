import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//Screens
import Home from "../screens/homeScreen";
import Login from "../screens/loginScreen";
import Register from "../screens/registerScreen";
import Main from "../screens/mainScreen";

import Settings from "../screens/settingsScreen";
import Empresas from "../screens/companyScreen";
import NuevaEmpresas from "../screens/newCompanyScreen";
import JoinEmpresas from "../screens/joinCompanyScreen";
import UserEmpresas from "../screens/userCompanyScreen";
import AdminEmpresas from "../screens/adminCompanyScreen";

import Hire from "../screens/hireScreen";
import Announce from "../screens/announceScreen";


const Stack = createNativeStackNavigator();


function ContainerRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={ {headerShown: false, navigationBarHidden: true}}/>
                <Stack.Screen name="Login" component={Login} options={ {headerShown: false} } />
                <Stack.Screen name="Main" component={Main} options={ {headerShown: false, navigationBarHidden: true}}/>
                <Stack.Screen name="Register" component={Register} options={ {headerShown: false} } />
                <Stack.Screen name="Settings" component={Settings} options={ {headerShown: false, navigationBarHidden: true}}/>
                <Stack.Screen name="Company" component={Empresas} options={ {headerShown: false} }  />
                <Stack.Screen name="NewCompany" component={NuevaEmpresas} options={ {headerShown: false} } />
                <Stack.Screen name="JoinCompany" component={JoinEmpresas} options={ {headerShown: false} } />
                <Stack.Screen name="UserCompany" component={UserEmpresas} options={ {headerShown: false} } />
                <Stack.Screen name="AdminCompany" component={AdminEmpresas} options={ {headerShown: false} } />
                <Stack.Screen name="Hire" component={Hire} options={ {headerShown: false} } />
                <Stack.Screen name="Announce" component={Announce} options={ {headerShown: false} } />

                
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default ContainerRoutes;
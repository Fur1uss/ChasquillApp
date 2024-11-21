import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//Screens
import Home from "../screens/homeScreen";
import Login from "../screens/loginScreen";
import Register from "../screens/registerScreen";
import Main from "../screens/mainScreen";

import Settings from "../screens/settingsScreen";
import Presupuesto from "../screens/presupuestoScreen";
const Stack = createNativeStackNavigator();


function ContainerRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} options={ {headerShown: false} } />
                <Stack.Screen name="Main" component={Main} options={ {headerShown: false} }  />
                <Stack.Screen name="Register" component={Register} options={ {headerShown: false} } />
                <Stack.Screen name="Settings" component={Settings} options={ {headerShown: false} }  />
                <Stack.Screen name="Presupuesto" component={Presupuesto} options={ {headerShown: false} }  />

                
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default ContainerRoutes;
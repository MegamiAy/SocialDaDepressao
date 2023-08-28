import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateScreen from "./screens/CreateUser";
import LoginScreen from "./screens/LoginUser";
import RecPass from "./screens/RecPass";
import HomeSrc from "./screens/HomeSrc";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeSrc} />
                <Stack.Screen name="Cadastro" component={CreateScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Recuperar" component={RecPass} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
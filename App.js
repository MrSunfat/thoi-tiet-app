import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Info from './screens/Info';
import Find from './screens/Find';
import { AppProvider } from './context';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Find">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen
                        name="Back"
                        component={Info}
                        options={{ header: () => null }}
                    />
                    <Stack.Screen
                        name="Find"
                        component={Find}
                        options={{ header: () => null }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'orange',
    },
});

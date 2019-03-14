import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import LoginScreen from './Screens/LoginScreen'
import AuthScreen from './Screens/AuthScreen';
import FeedScreen from './Screens/FeedScreen';
import Deslogar from './Screens/Deslogar';
import ProfileScreen from './Screens/ProfileScreen';

class SplashScreen extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            const isUserAuthenticated = false
            this.props.navigation
                .navigate(isUserAuthenticated ? 'AreaLogado' : 'AreaDeslogado')
        }, 800)
    }
    render() {

        return (<View style={
            {
                flex: 1, backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }><Animatable.Text
            style={{ color: 'white', fontSize: 40 }}
            animation="tada"
            direction="reverse"
            iterationCount="infinite">
                Instaelum</Animatable.Text></View>)
    }
}

const DeslogadoStack = createStackNavigator({
    Login: { screen: LoginScreen },
}, { initialRouteName: 'Login' });

const LogadoTabNavigation = createBottomTabNavigator({
    Feed: { screen: FeedScreen },
    Profile: { screen: ProfileScreen },
    Logout: {screen: Deslogar }
})

const AppNavigator = createSwitchNavigator({
    AreadeAutenticar: AuthScreen,
    AreaLogado: LogadoTabNavigation,
    AreaDeslogado: DeslogadoStack,
    
}, { initialRouteName: 'AreadeAutenticar' })

export default createAppContainer(AppNavigator)
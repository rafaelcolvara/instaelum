import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import LoginScreen from './Screens/LoginScreen'
import AuthScreen from './Screens/AuthScreen';
import FeedScreen from './Screens/FeedScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PostDetailsScreen from './Screens/PostDetailsScreen';
import { FluidNavigator } from 'react-navigation-fluid-transitions';


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
    Profile: FluidNavigator ({
        ProfileHome: {screen: ProfileScreen},
        PostDetail: {screen: PostDetailsScreen}
    }),
}, { initialRouteName: 'Feed'})

const AppNavigator = createSwitchNavigator({
    AreadeAutenticar: AuthScreen,
    AreaLogado: LogadoTabNavigation,
    AreaDeslogado: DeslogadoStack,
    
}, { initialRouteName: 'AreadeAutenticar' })

export default createAppContainer(AppNavigator)
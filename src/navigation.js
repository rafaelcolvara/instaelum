import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import * as Animatable from 'react-native-animatable'

const FeedScreen = () => (<View><Text>TELA PRINCIPAL</Text></View>)
const Profilecreen = () => (<View><Text>TELA PRINCIPAL</Text></View>)


const LoginScreen = (props) => {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="ir Para home" onPress={() => {
                props.navigation.navigate('Home')
            }}></Button>
        </View>
    )
}

class SplashScreen extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            const isUserAuthenticated = true
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
    Profile: { screen: Profilecreen }
})

const AppNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    AreaLogado: LogadoTabNavigation,
    AreaDeslogado: DeslogadoStack
}, { initialRouteName: 'Splash' })

export default createAppContainer(AppNavigator)
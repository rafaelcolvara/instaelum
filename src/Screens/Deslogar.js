import React from 'react'
import { Text, View, Button, AsyncStorage } from "react-native";


export default class Deslogar extends React.Component 
{
    async componentDidMount() {
        await AsyncStorage.setItem('CW_TOKEN','')
        this.props.navigation.navigate('AreadeAutenticar')       
    }

    render(){
        return(<View>
                    <Text>Bye!</Text>
                </View>)
    }
}
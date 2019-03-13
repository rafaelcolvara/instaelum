import React from 'react'
import { Text, AsyncStorage } from "react-native";


export default class AuthScreen extends React.Component 
{
    componentDidMount() {
        //AsyncStorage.setItem('CW_TOKEN','')
        AsyncStorage.getItem('CW_TOKEN')
        .then((token)=> {
            const isUserAuthenticated = Boolean(token)
            this.props.navigation.navigate(isUserAuthenticated ? 'AreaLogado': 'AreaDeslogado')
        })
    }

    render(){
        return(<Text>Aguarde..</Text>)
    }
}
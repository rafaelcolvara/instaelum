import React from 'react'
import { View,  Text, Button, TextInput, StyleSheet, AsyncStorage } from "react-native";



class LoginScreen extends React.Component {

    state = {
        login: "rafael",
        senha: "123456",
        erroGenerico: '',
        touchgedFields: false
    }

    
    componentDidMount() {
        
        AsyncStorage.getItem('CW_TOKEN')

        //AsyncStorage.getItem('CW_TOKEN').then((result)=>{
        //    console.warn('Token',result)
        //})

    }

    logar =()=>  {
        
        const url = 'https://instalura-api.herokuapp.com/api/public/login'
        
        const dadosDoLogin =  {
            "login": this.state.login,
            "senha": this.state.senha
        }
        const config = {
                method: 'POST',
                body: JSON.stringify(dadosDoLogin),
                headers: {'Content-type': 'Application/JSON'}
        }
        
        this.setState ({
            touchgedFields: {
                login:true,
                senha:true
            }
        })
    
        
        fetch(url, config)
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) return respostaDoServer.text()
            throw new Error("Não foi possível fazer login")
        }).then((token)=> {

            if (token) {
                AsyncStorage.setItem('CW_TOKEN', token).then
                (async () => {
                    AsyncStorage.setItem('CW_USERLOGIN', dadosDoLogin.login)
                    this.props.navigation.navigate('AreadeAutenticar') })
                
            } else
            {throw new Error('Ocorreu um erro no servidor ao tentar fazer o login')}
                    
        })
        .catch((err) => {
            this.setState(this.state.erroGenerico)
        })
    }


    render (props) {

        return (
            <View style={styles.container}>
                
                <Text style={styles.title}>Instaelum</Text>
                {
                    this.state.login.length===0 && this.state.touchgedFields.login
                    ? <Text style={styles.errLabel}>Preencha o usuário</Text>
                    : <Text></Text>
                }
                <TextInput style={styles.formfield} 
                    placeholder="Login" 
                    value ={this.state.login} 
                    onChangeText={login=> this.setState({login})}
                    onBlur={()=> this.setState(
                        { touchgedFields: {...this.state.touchgedFields, login: true}}
                    )}
                    >
                </TextInput >
                {
                    this.state.senha.length===0 && this.state.touchgedFields.senha
                    ? <Text style={styles.errLabel}>Preencha a senha</Text>
                    : <Text></Text>
                }
                <TextInput style={styles.formfield} 
                    placeholder="Senha" 
                    secureTextEntry={true} 
                    value={this.state.senha}  
                    onChangeText={senha=> this.setState({senha})} 
                    onBlur={()=> this.setState(
                        {touchgedFields: {...this.state.touchgedFields, senha: true}}
                    )}
                    >
                </TextInput>
                <Text>{this.state.erroGenerico}</Text>
                <Button
                    style={styles.formBtn}
                    title="Login"
                    onPress={()=> {
                        this.logar()
                    }}
                />
    
            </View>
        )
    }

} 

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        color: 'black'
    },
    formfield : {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15
    },
    formBtn : {
        width: 400,
        backgroundColor: 'red'
    },
    errLabel: {
        color: 'red'
    }
})

export default LoginScreen

import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable'
import FotoService from '../src/services/FotoService';
import { AsyncResource } from 'async_hooks';


export default class CardPost extends Component {


    constructor(props) {
        super()
        this.state = {
            foto: props.foto
        }
    }

    like = () => {
        
        const usuario = await AsyncResource.getItem('CW_USERLOGIN')

        let likersAtualizado = [
            ...this.state.foto.likers
        ]
        if (!this.state.foto.likeada) {
            likersAtualizado.push( { login: usuario } )
        } else {
            likersAtualizado = likersAtualizado.filter((liker) => {
                return liker.login !== usuario
            })
        }
        
        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: likersAtualizado
        }

        this.setState({
            foto: fotoAtualizada
        })

        FotoService.like(this.state.foto.id)
    }

    render() {

        const foto = this.state.foto
        console.log(foto)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.headerAvatar}
                        source={{ uri: foto.urlPerfil }} />
                    <Text style={styles.headerTitle}>@{foto.loginUsuario}</Text>
                    {/*Reservador para o menu*/}
                </View>
                <Image
                    style={styles.CardPostImage}
                    source={{ uri: foto.urlFoto }} />
                <View style={styles.footer}>

                    <LikeButton onPress={this.like} LikeActive={foto.likeada}>

                    </LikeButton>
                    
                    <Text style={styles.fontBold}> {foto.likers.length} Likers, Curtido por: {foto.likers.length && foto.likers[0].login}</Text>
                </View>
            </View>
        )
    }
}

class LikeButton extends Component {
    render() {
        const props = this.props
        return (
            <TouchableOpacity onPress={() => {
                this.imagemDoBotao.bounceIn(1000)
                props.onPress()
            }} >
                <Animatable.Image
                    ref={ (ref) => this.imagemDoBotao = ref } 
                    source={
                        props.LikeActive
                        ? require('../assets/s2-checked.png')
                        : require('../assets/s2.png')
                    }
                    style={styles.likebutton} />

            </TouchableOpacity>
        )
    }
}


const larguraTotal = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    header: { padding: 15, flexDirection: 'row', alignItems: 'center' },
    headerAvatar: { width: 50, height: 50, borderRadius: 100 },
    likebutton: { width: 30, height: 30 },
    headerTitle: { marginLeft: 10 },
    CardPostImage: { width: larguraTotal, height: larguraTotal },
    footer: { padding: 15, alignItems: 'flex-start' },
    fontBold: {fontWeight: 'bold'}
})
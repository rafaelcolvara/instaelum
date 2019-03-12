
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable'


export default class CardPost extends React.Component {


    constructor(props){
        super()
        this.state = {
            foto: props.foto
        }
    }

    like = () => {
        const fotoAtualizada = {
            ...this.state.foto ,
            likeada: !this.state.foto.likeada
        }

        this.setState( {
            foto: fotoAtualizada
        })
    }
    render() {
        
        const foto = this.state.foto

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
                
                    <Text>Descrição da fotinha</Text>
                </View>
            </View>
        )
    }
}

const LikeButton = (props) => {


return (
    <TouchableOpacity onPress={ props.onPress } >
          <Image source={
            props.LikeActive 
            ?require('../assets/s2.png')
            :require('../assets/s2-checked.png') }
         style={styles.likebutton} />
        
       </TouchableOpacity>
       )
}

const larguraTotal = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    header: { padding: 15, flexDirection: 'row', alignItems: 'center' },
    headerAvatar: { width: 50, height: 50, borderRadius: 100 },
    likebutton:{ width: 30, height: 30},
    headerTitle: { marginLeft: 10},
    CardPostImage:{width: larguraTotal, height: larguraTotal },
    footer: { padding: 15, alignItems: 'flex-start' }
})
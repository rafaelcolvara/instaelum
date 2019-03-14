import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { Transition } from 'react-navigation-fluid-transitions'
import UserService from '../services/UserService';


export default class ProfileScreen extends Component {

    state = {
        login: '',
        publicacoes: [],
        userAvatar: '',
        isCarregando: false
    }



    logoutHandler = () => {
        this.props.navigation.navigate('Deslogar')
    }

    async componentDidMount() {
        const userProfileInfo = await UserService.getProfileInfo()
        this.setState({
            login: userProfileInfo.login,
            userAvatar: userProfileInfo.avatar || this.state.avatar,
            publicacoes: userProfileInfo.publicacoes,
            isCarregando: false
        })

    }

    render() {
        return (<View>
            <View style={styles.userInfoContainer}>
                <Image
                    style={styles.userAvatar}
                    source={{ uri: this.state.userAvatar }}
                ></Image>
                <Text style={styles.userLogin}> {this.state.login} </Text>

            </View>
            <View>
                <Button title="Logout" onPress={this.logoutHandler}></Button>
            </View>

         
            {
                this.state.publicacoes.map((foto) => {
                    return (
                    <TouchableOpacity
                        key={foto.id}
                        onPress={()=> {
                            this.props.navigation.navigate('PostDetail',{
                                foto: foto,
                            })
                        }}>
                        <Transition shared={`fotoImage${foto.id}`}>
                            <Image style={styles.userGalleryImage}
                                source={{ uri: foto.urlFoto }}
                                >
                            </Image>
                        </Transition>
                       
                    </TouchableOpacity>
                    )
                    
                })
            }

        </View>)
    }


}

const styles = StyleSheet.create({
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    userLogin: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15
    },
    userAvatar: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    userGalleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    userGalleryImage: {
        width: 120,
        height: 120,
        margin: 1
    }
})
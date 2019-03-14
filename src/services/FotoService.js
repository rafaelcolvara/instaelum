import {AsyncStorage} from 'react-native';
 

const API_URL = 'https://instalura-api.herokuapp.com/api/fotos';
;

export default class FotoService {


    static pegaOFeedComAsFotos() {
        return AsyncStorage.getItem('CW_TOKEN')
            .then(token => {
                return fetch(API_URL, {
                        headers: {
                                'x-auth-token': token
                        }
                })
            })
            .then((resposta) => {
                if(resposta.ok) return resposta.json()
            })
            .catch(() => {

            })
    }



    static async like(id)
    {
        fetch(`${API_URL}/${id}/like`, {
            method: 'POST',
            headers: {
                    'x-auth-token': await AsyncStorage.getItem('CW_TOKEN') }
        })
        .then((respostaDoServer) => {
            console.warn(respostaDoServer)
        })
    } 
}
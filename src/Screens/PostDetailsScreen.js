import React from 'react'
import { Text, ScrollView, Image} from "react-native";
import { Transition } from 'react-navigation-fluid-transitions';


export default class PostDetailsScreen extends React.Component 
{
    
    render(){
        const foto = this.props.navigation.getParam('foto',{})
        return(
                <ScrollView>
                    <Transition shared={`fotoImage${foto.id}`}>
                        <Image
                            style={{flex: 1, height: 500}}
                            source={{uri: foto.urlFoto}}
                        ></Image>
                    </Transition>
                    <Text> saldkjsa{foto.urlFoto}</Text>
                </ScrollView>
        
            )
    }
}
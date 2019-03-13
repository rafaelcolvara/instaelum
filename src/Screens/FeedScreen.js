
import React, {Component} from 'react';
import { ScrollView} from 'react-native';
import CardPost from '../../components/CardPost'
import FotoService from '../services/FotoService';


export default class App extends Component {

  state = {fotos : []}

  componentDidMount()
  {
    FotoService.pegaOFeedComAsFotos()
    .then((respostaConvertidaEmObjeto)=> {
        this.setState({
          fotos: respostaConvertidaEmObjeto
        })
    })
  }
  render() {

    
    const fotos = this.state.fotos
    
    // https:flexfrog.com
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        
        {
          fotos.map(function(foto, indice) {
            return (
                <CardPost key={indice} foto={foto} />
            )
          
          })
        }
        
      </ScrollView>
    );
  }
}
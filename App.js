
import React, {Component} from 'react';
import { ScrollView} from 'react-native';
import CardPost from './components/CardPost'


export default class App extends Component {

  state = {fotos : []}

  componentDidMount()
  {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then((resposta)=> {
        if(resposta.ok) return resposta.json()
    })
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
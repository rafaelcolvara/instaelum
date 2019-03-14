
import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import CardPost from '../../components/CardPost'
import FotoService from '../services/FotoService';
import CommentsArea from '../../components/ComponentArea';



export default class App extends Component {

  state = {fotos : [],
  refreshando: false}

  componentDidMount()
  {
    FotoService.pegaOFeedComAsFotos()
    .then((respostaConvertidaEmObjeto)=> {
        this.setState({
          fotos: respostaConvertidaEmObjeto
        })
    })
  }

  pegaDados()
  {
    FotoService.pegaOFeedComAsFotos()
    .then((fotos)=>{
      console.warn('Refreshow!!')
      this.setState({fotos: fotos})
    })
  }
  render() {

    
    const fotos = this.state.fotos
    
    // https:flexfrog.com
    return (
      <View style={{backgroundColor: 'white'}}>
        <CommentsArea></CommentsArea>
        <FlatList
          data={fotos}
          onRefresh={() => {
            this.setState({
              refreshando: false
            }, ()=> {
              this.pegaDados()
            })
          }}
          refreshing={this.state.refreshando}
          renderItem={({item})=>{
            return(<CardPost foto={item}></CardPost>)
          }}
          keyExtractor={(item, index)=> `item=${item}`}
          >
          
        </FlatList>
        
        
      </View>
    );
  }
}
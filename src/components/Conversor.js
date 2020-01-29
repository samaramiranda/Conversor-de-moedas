import React, { Component } from 'react';
import "./Conversor.css"

export default class Conversor extends Component {
  
  constructor(props) { //para poder acessar as propriedades
    super(props);

    this.state = { //para armazenar valor da moeda
      moedaA_valor:"",
      moedaB_valor:0,
    }

    this.converter = this.converter.bind(this); //bind é usado para passar uma objeto, no caso o this
  }

  converter(){ //converte o valor da moedaA na moedaB
    
    let de_para = `${this.props.moedaA}_${this.props.moedaB}` //de qual moeda para qual moeda irei converter
    let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=464392e29f806452df96` //link da API que converte

    fetch(url)
      .then(res => { //promisse para converter o valor
        
        return res.json() //convertendo a resposta para JSON

      })
      .then(json => {
        let cotacao = json[de_para]; //pego o valor que retornar no meu de_para (valor da cotacao)
        let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)//multiplica o valor da moedaA pela cotação. Pega só 2 casas decimais
        this.setState({moedaB_valor}); //pegando o valor da moedaB
      })
  }
  
  render() {
    return( //todo componente deve retornar apenas uma div 
      <div className="conversor">
        <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
        <input type="text" onChange={(event)=>{this.setState({moedaA_valor:event.target.value})}}></input> {/*Pega o que foi digitado no input como valor da moeda A*/}
        <input className="botao" type="button" value="Converter" onClick={this.converter}></input>
        <h2>{this.state.moedaB_valor}</h2>
      </div>
    )
  }
}

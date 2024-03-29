import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import {perguntas} from "../json/perguntas.json";
import {resultados} from "../json/resultados.json";
// import Navegacao from "./Navegacao"
import Pergunta from "./Pergunta"
import Resultado from "./Resultado"
import Navegacao from "./Navegacao";
import Ajuda from "./Ajuda";

class TelaPerguntas extends Component{

    pergunta_atual;

    constructor(){
        super();
    
        this.state = {
          perguntas,
          resultados,
          pergunta_atual : 0,
          numero_perguntas: 0,
        }

        this.escolheuOpcao = this.escolheuOpcao.bind(this);
        this.recomecar = this.recomecar.bind(this);
        
    }

    chegouFim = (()=>{
        return (this.state.pergunta_atual > 99)? true : false;
    })

    escolheuOpcao(id_proxima_pergunta){
        this.setState({
            pergunta_atual: id_proxima_pergunta,
            numero_perguntas: this.state.numero_perguntas+1
        })
    }
    
    recomecar(){
        this.setState({
            pergunta_atual: 0,
            numero_perguntas: 0,
        })
    }

    buscarResultado(id_resultado){
        let resultadoFinal;
        this.state.resultados.forEach(
            function(resultado, i){
                if(resultado.id === id_resultado){
                    resultadoFinal = resultado;
                }
            }
        )
        return resultadoFinal;
    }


    render(){
        return(
            
            <div className="tela-pergunta d-flex justify-content-center ">
                <Navegacao onRecomecar={this.recomecar} />
                <Ajuda />
                {(this.chegouFim() === true) ?
                    <Resultado resultado={this.buscarResultado(this.state.pergunta_atual)}
                    numeroPerguntas={this.state.numero_perguntas} /> :
                    <Pergunta pergunta={this.state.perguntas[this.state.pergunta_atual]} onAddPergunta={this.escolheuOpcao} />
                }
            </div>
            
        )
    }
    
}



export default TelaPerguntas;
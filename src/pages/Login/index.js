import React, { Component } from 'react';

import Tinta from '../../assets/images/tinta.png';

import './style.css';

class Login extends Component {

    constructor(props){
        super(props);
        
        sessionStorage.removeItem('@Usuario:username');
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        let value = document.getElementById('campoNome').value;

        if(value != undefined && value != ''){
            sessionStorage.setItem('@Usuario:username', value);  
            this.props.history.push('/calculo');
        }else{
            alert('Por Favor Preencha Seu Nome : )')
        }
       

    }

    render() {
        return (
            <div className="areaLogin">
                <div className="componentsLogin">
                   <div>
                       <img src={Tinta} border="0" alrt="Tinta" />
                   </div>
                   <div>
                        <br /><br />
                        <label className="tituloCalculodeTinta">Solução Cálculo de Tinta</label>
                   </div>
                   <div>
                        <form className="formEntrada" onSubmit={this.handleSubmit} >
                            <input type="text" className="campoNome" id="campoNome" placeholder="Qual seu Nome?" /><br/><br />
                            <input type="submit" className="btnEntrar" value="Entrar e fazer Cálculo" /><br/>
                        </form> 
                   </div>
                </div>   
            </div>
        );
    }
}

export default Login;
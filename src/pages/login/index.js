import React, { Component } from 'react';
import '../login/index.css'

class FormLogin extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div class="page">
                <div className="container">
                    <h1 className="titulo"> Infinity </h1>

                    <div className="campo">
                        <label className="labelLogin"> Usuário </label> <br/>
                        <input type="text" placeholder="Usuário" id="userLogin" name="userLogin" className="formLogin"/>
                    </div>

                    <div className="campo">
                        <label className="labelLogin"> Senha </label> <br/>
                        <input type="password" placeholder="Senha" id="userPassword" name="userPassword" className="formLogin"/> <br/>
                        <a href="#" id="forgotPassword"> Esqueceu a senha? </a>
                    </div>

                    <div className="buttons">
                    <button className="btLogin">Entrar</button> <br/>
                    <button className="btLogin">Cadastrar</button>
                    </div>

                </div>
            </div>
        )
    }

}

export default FormLogin;
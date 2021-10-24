import React, { Component } from 'react';
import './index.css'

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "guilherme",
            password: "123"            
        }

        this.trocaEmail = this.trocaEmail.bind(this);
        this.trocaSenha = this.trocaSenha.bind(this);
    }

    trocaEmail(e){
        let valorDigitado = e.target.value;
        this.setState({username: valorDigitado})    
    }

    trocaSenha(e) {
        let valorDigitadoSenha = e.target.value;
        this.setState({password: valorDigitadoSenha})
    }


    render(){
        return(
            <div class="page">
                <div className="container">
                    <h1 className="titulo"> Infinite </h1>

                    <div className="campo">
                        <label className="labelLogin"> Usuário </label> <br/>
                        <input type="text" placeholder="Usuário" id="userLogin" name="username"
                               className="formLogin" value={this.state.username} onChange={this.trocaEmail} />
                    </div>

                    <div className="campo">
                        <label className="labelLogin"> Senha </label> <br/>
                        <input type="text" placeholder="Senha" id="password" name="userPassword" 
                               className="formLogin" value={this.state.password} onChange={this.trocaSenha} /> <br/>
                        <a href="#" id="forgotPassword"> Esqueceu a senha? </a>
                    </div>

                    <button className="btLogin" onClick={this.entrar}>Entrar</button> <br/>
                    <button className="btLogin">Cadastrar</button>

                </div>
            </div>
        )
    }

}

export default Login;
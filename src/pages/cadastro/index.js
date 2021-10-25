import React, { Component } from 'react'
import './index.css'
import './util.css'
import firebase from '../../firebaseConnection';

import {useState, useEffect} from 'react';

class Cadastro extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            form: {
                nome: "",
                email: "",
                username: "",
                password: "",
                checkPassword: "",
                birthDate: ""
            }
        }
        
        this.dadosCadastro = this.dadosCadastro.bind(this);
        this.btCadastroClick = this.btCadastroClick.bind(this);
    }

    dadosCadastro(e){
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form: form});
    }

    btCadastroClick(){
        alert("Teste");
        
        firebase.firestore().collection('cadastro')
        .add({
            username: this.state.form.username,
            password: this.state.form.password,
            nome: this.state.form.nome,
            email: this.state.form.email,
            birthDate: this.state.form.birthDate,
        })
        .then(()=>{
            console.log('DADOS CADASTRADO COM SUCESSO!');
        })
        .catch((error)=>{
            console.log('GEROU ALGUM ERRO: ' + error);
        })
    }

    render(){
        return(
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <div className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-32">
                                INFINITE
                            </span>

                    
                            <span className="txt1 p-b-11">
                                Nome Completo
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Digite nome completo">
                                <input className="input100" type="text" name="nome" placeholder="Nome Completo" id="tName"
                                        value={this.state.form.nome} onChange={this.dadosCadastro}/>
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                E-mail
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Digite e-mail">
                                <input className="input100" type="email" name="email" placeholder="E-mail" id="temail" 
                                        value={this.state.form.email} onChange={this.dadosCadastro}/>
                                <span className="focus-input100"></span>
                            </div>
                            
                            <span className="txt1 p-b-11">
                                Nome de Usuário
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate = "Digite usuário">
                                
                                <input className="input100" type="text" name="username" placeholder="Nome de Usuário" id="tUserName"
                                        value={this.state.form.username} onChange={this.dadosCadastro}/>
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Senha
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Digite a senha">
                                <input className="input100" type="password" name="password" placeholder="Senha" id="tPassword"
                                        value={this.state.form.password} onChange={this.dadosCadastro}/>
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Confirme a Senha
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Confirme a senha">
                                <input className="input100" type="password" name="checkPassword" placeholder="Confirme a Senha" id="tCheckPassword"
                                value={this.state.form.checkPassword} onChange={this.dadosCadastro} />
                                <span className="focus-input100"></span>
                            </div>

                            <span className="txt1 p-b-11">
                                Data de nascimento
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Insira data de nascimento">
                                <input className="input100" type="date" name="birthDate" placeholder="Data de Nascimento" id="tBirthDate"
                                        value={this.state.form.birthDate} onChange={this.dadosCadastro}/>
                                <span className="focus-input100"></span>
                            </div>
                            
                            

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.btCadastroClick} >
                                    Cadastrar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
	        </div>
        )
    }


}

export default Cadastro;
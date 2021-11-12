import React, { Component } from 'react'
import firebase from '../../firebaseConnection';

import infinityLogo from '../../images/infinity_logo.png';
import copy from '../../images/copy-icon.png';

import '../../css/templateHome/animate.css';
import '../../css/templateHome/bootstrap.min.css';
import '../../css/templateHome/jquery.mCustomScrollbar.min.css'
import '../../css/templateHome/responsive.css';
import '../../css/templateHome/style.css';

import '../../css/templateHome/cssFonts/line-awesome.css';
import '../../css/templateHome/cssFonts/line-awesome-font-awesome.min.css';
import '../../css/templateHome/cssFonts/font-awesome.min.css';

import '../../css/templateHome/vendor/fontawesome-free/css/all.min.css';
import '../../css/templateHome/lib/slick/slick.css';
import '../../css/templateHome/lib/slick/slick-theme.css';

class SignUp extends Component {
    
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
        this.gravaBanco = this.gravaBanco.bind(this);
        this.btCadastroClick = this.btCadastroClick.bind(this);
    }

    dadosCadastro(e){
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form: form});
    }

    btCadastroClick(){
        const {nome, email, username, password, checkPassword, birthDate} = this.state.form;

        if(nome !== "" && email !== "" && username !== "" && password !== "" && checkPassword !== "" && birthDate !== "") {
            if(password !== checkPassword) {
                alert("As senhas não correspondem!")
            } else {
                this.gravaBanco();
                window.location = '/';
            }
        } else {
            alert("Preencha todos os campos!")
        }

    }

    gravaBanco(){    
        firebase.auth().createUserWithEmailAndPassword(this.state.form.email, this.state.form.password)
        .then( async (value)=>{
        
        firebase.firestore().collection('users')
        .doc(value.user.uid)
        .set({
            username: this.state.form.username,
            password: this.state.form.password,
            nome: this.state.form.nome,
            email: this.state.form.email,
            birthDate: this.state.form.birthDate,
            seguindo: [],
            curtidas: [],
        })
        .then(()=>{
            console.log('DADOS CADASTRADO COM SUCESSO!');
            alert("Cadastro Realizado! Seja bem-vindo(a)!");
            this.setState({form: {username: ""} });
            this.setState({form: {password: ""} });
            this.setState({form: {nome: ""} });
            this.setState({form: {email: ""} });
            this.setState({form: {birthDate: ""} });
            this.setState({form: {checkPassword: ""} })

        })
        .catch((error)=>{
            if(error.code === 'auth/weak-password'){
                alert('Senha muito fraca..')
              }else if(error.code === 'auth/email-already-in-use'){
                alert('Esse email já existe!');
              }
            console.log('GEROU ALGUM ERRO: ' + error);
            alert("Ops! Algo deu errado. Tente novamente!")
        })
    })
    }


    render(){
        return(
            <div class="sign-in">
                <div class="wrapper">		
                    <div class="sign-in-page">
                        <div class="signin-popup">
                            <div class="signin-pop">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="cmp-info">
                                            <div class="cm-logo">
                                                <img src={infinityLogo}/>
                                                <p>Faça parte das comunidades dos conteúdos que você mais gosta! Junte-se a outros usuários na discussão de filmes, séries e livros!</p>
                                            </div>	
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <div class="login-sec">
                                            <div class="sign_in_sec current" id="tab-1">
                                                <h3 class="instructions-sign-up">Cadastro</h3>
                                                <div class="dff-tab current" id="tab-3">
                                                    <form action="javascript:void(0);">
                                                        <div class="row">
                                                            
                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Seu nome completo: </p>
                                                                <div class="sn-field">
                                                                    <input type="text" name="nome" placeholder="Ex: João Silva" value={this.state.form.nome} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-user"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Sua data de nascimento: </p>
                                                                <div class="sn-field">
                                                                    <input type="date" name="birthDate" value={this.state.form.birthDate} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-calendar-week"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Seu melhor e-mail: </p>
                                                                <div class="sn-field">
                                                                    <input type="text" name="email" placeholder="Ex: exemplo@mail.com" value={this.state.form.email} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-envelope"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Escolha um nome de usuario: </p>
                                                                <div class="sn-field">
                                                                    <input type="text" name="username" placeholder="Ex: joao_silva" value={this.state.form.username} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-user"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Sua senha: </p>
                                                                <div class="sn-field">
                                                                    <input type="password" name="password" placeholder="Senha" value={this.state.form.password} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-lock"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <p>Confirme sua senha: </p>
                                                                <div class="sn-field">
                                                                    <input type="password" name="checkPassword" placeholder="Confirme sua senha" value={this.state.form.checkPassword} onChange={this.dadosCadastro}/>
                                                                    <i class="fas fa-lock"></i>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <div class="checky-sec st2">
                                                                    <div class="fgt-sec">
                                                                        <input type="checkbox" name="cc" id="c2"/>
                                                                        <label for="c2">
                                                                            <span></span>
                                                                        </label>
                                                                        <small>Entendo e estou de acordo com os Termos e Condições de Uso.</small>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-12 no-pdd">
                                                                <button onClick={this.btCadastroClick}>Vamos começar</button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                    </div>
                                </div>		
                            </div>
                        </div>
                        <div class="footy-sec">
                            <div class="container">
                                <ul>
                                    <li><a href="about.html" title="">Sobre nós</a></li>
                                    <li><a href="#" title="">Política de Privacidade</a></li>
                                    <li><a href="#" title="">Política de Cookies</a></li>
                                    <li><a href="#" title="">Idioma</a></li>
                                </ul>
                                <p><img src={copy}/>Copyright 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }


}

export default SignUp;
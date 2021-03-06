import React, { Component } from 'react';

import firebase from 'firebase';

import infinityLogo from '../../images/infinity_logo.png'
import copy from '../../images/copy-icon.png'

import '../../css/templateHome/animate.css';
import '../../css/templateHome/bootstrap.min.css';
import '../../css/templateHome/jquery.mCustomScrollbar.min.css'
import '../../css/templateHome/responsive.css';
import '../../css/templateHome/style.css';

import '../../css/templateHome/cssFonts/line-awesome.css'
import '../../css/templateHome/cssFonts/line-awesome-font-awesome.min.css'
import '../../css/templateHome/cssFonts/font-awesome.min.css'

import '../../css/templateHome/vendor/fontawesome-free/css/all.min.css';
import '../../css/templateHome/lib/slick/slick.css';
import '../../css/templateHome/lib/slick/slick-theme.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            form: {
                username: "",
                password: ""
            }
        }

        this.componentDidMount=()=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    window.location = '/';
                }
            })
        }

        this.loginData = this.loginData.bind(this);
        this.btEntrarClick = this.btEntrarClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        firebase.auth().sendPasswordResetEmail(this.state.form.username)
        .then(() => {
            alert("Verifique sua caixa de entrada")
        })
        .catch((error) => {
            alert("Algo deu errado")
        })

    }

    loginData(e){
        let form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({form: form});
    }

    btEntrarClick(){
        let username = this.state.form.username;
        let password = this.state.form.password;
        
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(async (value)=>{
            await firebase.firestore().collection('users')
            .doc(value.user.uid)
            .get()
            .then((snapshot)=>{
                window.location = '/';
            })
    
    
        })
        .catch((error)=>{
            console.log('ERRO AO LOGAR' + error)
            alert("N??o logou")
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
                                            <div class="cm-logo1">
                                                <img src={infinityLogo}/>
                                                <p>Fa??a parte das comunidades dos conte??dos que voc?? mais gosta! Junte-se a outros usu??rios na discuss??o de filmes, s??ries e livros!</p>
                                            </div>	
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="login-sec">
                                            <div class="sign_in_sec current" id="tab-1">
                                                
                                                <h3>Fa??a o Login</h3>
                                                <form action="javascript:void(0);">
                                                    <div class="row">
                                                        <div class="col-lg-12 no-pdd">
                                                            <div class="sn-field">
                                                                <input type="text" name="username" placeholder="E-mail" name="username"
                                                                        value={this.state.form.username} onChange={this.loginData} />
                                                                <i class="fas fa-user"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12 no-pdd">
                                                            <div class="sn-field">
                                                                <input type="password" name="password" placeholder="Senha" name="password" 
                                                                        value={this.state.form.password} onChange={this.loginData} />
                                                                <i class="fas fa-lock"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12 no-pdd">
                                                            <div class="checky-sec">
                                                                <p onClick={this.handleSubmit} title="" className="forgot">Esqueceu a senha?</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12 no-pdd">
                                                            <div class="btns-signin">
                                                                <button className="bt-entrar" onClick={this.btEntrarClick}>Entrar</button>
                                                                <button className="bt-cadastrar" onClick={() => {window.location = '/signup';}} >Cadastrar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                
                                                <div class="login-resources">
                                                    <h4>Ou entre com suas redes sociais</h4>
                                                    <ul>
                                                        <li><a href="#" title="" class="fb"><i class="fa fa-facebook"></i>Logar Via Facebook</a></li>
                                                        <li><a href="#" title="" class="tw"><i class="fa fa-twitter"></i>Logar Via Twitter</a></li>
                                                    </ul>
                                                </div>

                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>		
                            </div>
                        </div>
                        <div class="footy-sec">
                            <div class="container">
                                <ul>
                                    <li><a href="about.html" title="">Sobre n??s</a></li>
                                    <li><a href="#" title="">Pol??tica de Privacidade</a></li>
                                    <li><a href="#" title="">Pol??tica de Cookies</a></li>
                                    <li><a href="#" title="">Idioma</a></li>
                                </ul>
                                <p><img src={copy}/>Copyright 2021</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }

}

export default Login;
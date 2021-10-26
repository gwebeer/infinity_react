import React, { Component } from 'react';
import './index.css'
import './util.css'
import logo from '../../images/logo.png'
import firebase from '../../firebaseConnection';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            form: {
                username: "",
                password: ""
            }
        }

        this.loginData = this.loginData.bind(this);
        this.btEntrarClick = this.btEntrarClick.bind(this);
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
                alert("Logado")    
            })
    
    
        })
        .catch((error)=>{
            console.log('ERRO AO LOGAR' + error)
            alert("Não logou")
        })
    
    }

    render(){
        return(
<div class="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <div className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-32">
                                <img src={logo} className="imagemLogo"/>
                            </span>

                            <span className="txt1 p-b-11">
                                Usuário
                            </span>
                            <div className="wrap-input100 validate-input m-b-36" data-validate = "Digite o e-mail">
                                <input className="input100" type="text" name="username" placeholder="Usuário" id="tUsername"
                                        value={this.state.form.username} onChange={this.loginData} />
                                <span className="focus-input100"></span>
                            </div>
                            
                            <span className="txt1 p-b-11">
                                Senha
                            </span>
                            <div className="wrap-input100 validate-input m-b-12" data-validate = "Digite a senha">
                                <span className="btn-show-pass">
                                    <i className="fa fa-eye"></i>
                                </span>
                                <input className="input100" type="password" name="password" placeholder="Senha"  id="tPassword"
                                        value={this.state.form.password} onChange={this.loginData} />
                                <span className="focus-input100"></span>
                            </div>
                            
                            <div className="flex-sb-m w-full p-b-48">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                    <label className="label-checkbox100" for="ckb1">
                                        Lembrar-me
                                    </label>
                                </div>

                                <div>
                                    <a href="#" className="txt3">
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn teste" onClick={this.btEntrarClick}>
                                    Entrar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Login;
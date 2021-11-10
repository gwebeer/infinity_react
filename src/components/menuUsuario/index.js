import React, { Component } from 'react'

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

import iconNome from '../../images/icon_nome.png'
import profileGuilherme from '../../images/userProfileGuilherme.jpeg'

import firebase from 'firebase';
import { Link } from 'react-router-dom';

class MenuUsuario extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        
        this.fileUpload = this.fileUpload.bind(this);
        this.deslogar = this.deslogar.bind(this);
    }

    fileUpload(e) {
        let arquivo = e.target.files[0];

        firebase.storage().ref("usuario").child(this.props.userId).put(arquivo)
        .then((e) => {
            console.log("Upload feito!");
        });
    }

    deslogar(){
        firebase.auth().signOut();
        console.log("Deslogou")
    }
    
    render(){
        return(
            <div class="col-lg-3 col-md-4 pd-left-none no-pd">
                <div class="main-left-sidebar no-margin">
                    <div class="user-data full-width">
                        <div class="user-profile">
                            <div class="username-dt">
                                <div class="usr-pic">
                                    <img src={this.props.url}/>
                                </div>

                                <div class="add-dp" id="OpenImgUpload">
                                    <input type="file" id="file" onChange={(e) => {this.fileUpload(e);}} />
                                    <label for="file"><i class="fas fa-camera"></i></label>		
                                    
                                    
                                </div>
                            </div>
                            <div class="user-specs">
                                <h3> {this.props.name} </h3>
                                <span> @{this.props.username} </span>
                            </div>
                        </div>
                        <ul class="user-fw-status">
                            
                            <li>
                                <Link to="/profile"> <a class="com"> <i class="fas fa-user-alt"></i> Meu Perfil </a> </Link>
                            </li>

                            <li>
                                <Link to="/"> <a> Home </a> </Link>
                            </li>
                    
                            <li>
                                <Link to="/feed-livros"> <a> Feed Livros </a> </Link>
                            </li>

                            <li>
                                <Link to="/feed-series"> <a> Feed Séries </a> </Link>
                            </li>
                            
                            <li>
                                <Link to="/feed-filmes"> <a> Feed Filmes </a> </Link>
                            </li>

                            <li>
                                <Link to="/settings"> <a class="com"> <i class="fas fa-cog"></i> Configurações </a> </Link>
                            </li>
                            
                            <li>
                                <a href="" class="com" onClick={this.deslogar}> <i class="fas fa-sign-out-alt"></i> Deslogar </a>
                            </li>
                        </ul>
                    </div> {/* <!--menu lateral acaba-->*/ }
                    
                    { /*<!--infos rede-->*/ }
                    <div class="tags-sec full-width">
                        <ul>
                            <li><a href="#" title="">Sobre</a></li>
                            <li><a href="#" title="">Central de Ajuda</a></li>
                            <li><a href="#" title="">Termos de Serviço</a></li>
                            <li><a href="#" title="">Política de Privacidade</a></li>
                            <li><a href="#" title="">Carreiras</a></li>
                            <li><a href="#" title="">Configurações</a></li>
                        </ul>
                        <div class="cp-sec">
                            <img src={iconNome}/>
                            <p>  &copy; Copyright 2021</p>
                        </div>
                    </div>{/* <!--infos rede acaba--> */}
                </div>
            </div>
        )
    }


}

export default MenuUsuario;
import React, { Component } from 'react';

import iconBarra from '../../images/iconbarra.png'
import fotoPerfil from '../../images/fotoPerfil.jpg'
import user from '../../images/user.png'
import iconNome from '../../images/icon_nome.png'
import usPic from '../../images/us-pic.png'
import profileGuilherme from '../../images/userProfileGuilherme.jpeg'
import luca from '../../images/fotofilme.jpg'

import Post from '../../components/post/posts.js';
import MenuUsuario from '../../components/menuUsuario';
import Header from '../../components/header';
import Titulo from '../../components/titulo';

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


import firebase from 'firebase';
import Locator from '../../components/locator';

class Feed extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userLog: "",
            nameLog: "",
            posts: [
            ]
        }
        
        this.loadPosts = this.loadPosts.bind(this);
    }

    componentDidMount(){

        this.loadPosts();

        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                window.location = '/login';
            } else {
                firebase.firestore().collection('users')
                .doc(user.uid)    
                .get()
                .then((snapshot) => {
                    this.setState({ userLog: snapshot.data().username})
                    this.setState({ nameLog: snapshot.data().nome})
                    })
                .catch(() => {
                    console.log("Algo deu errado!")
                })
            }
        })

        let newPosts = this.state.posts;

        let banco = [
            {nome: "Guilherme",
            user: "gui_webeer",
            conteudo: "Aqui ta o conteudo do post 1",
            curtidas: 10,
            comentarios: 10},
            {nome: "William",
            user: "ferris",
            conteudo: "Aqui ta o conteudo do post 2",
            curtidas: 20,
            comentarios: 20},
            {nome: "Mariana",
            user: "maribove",
            conteudo: "Aqui ta o conteudo do post 3",
            curtidas: 30,
            comentarios: 30}
        ]

        for (let i = 0; i < 3; i++) {
            newPosts.push(<Post nome={banco[i].nome} username={banco[i].user} conteudo={banco[i].conteudo} curtidas={banco[i].curtidas} comentarios={banco[i].comentarios}/>)
          }

        this.setState({
            posts: newPosts
        })
    }

    loadPosts(){
        firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    curtidas: doc.data().curtidas,
                })
            })

            console.log(lista)
        })
    }

    render(){
        return(
            <div className="wrapper">   
                <Header username={this.state.userLog}/>
        
                <main>
                    <div class="main-section">
                        <div class="container">
                            <div class="main-section-data">
                                <div class="row">

                                    { /* <!-- Menu Usuario --> */}
                                    <MenuUsuario name={this.state.nameLog} username={this.state.userLog} />

                                    { /* <!-- Seção de posts --> */}
                                    <div class="col-lg-6 col-md-8 no-pd">
                                        <div class="main-ws-sec">

                                            <Locator nome={this.state.nameLog} feed="filmes, séries e livros"/>

                                            <div class="posts-section">

                                                {this.state.posts}

                                            </div>{/*<!--posts-section end-->*/}
                                        </div>{/*<!--main-ws-sec end-->*/}
                                    </div>
                                </div>
                            </div>{/*<!-- main-section-data end-->*/}
                        </div> 
                    </div>
                </main>
	        </div>

        )
    }

}

export default Feed;
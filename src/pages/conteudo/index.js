import React, { Component } from 'react';

import Post from '../../components/post/posts.js';
import MenuUsuario from '../../components/menuUsuario';
import Header from '../../components/header';

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

import Titulo from '../../components/titulo/index.js';
import Postbar from '../../components/postbar/index.js';

class Conteudo extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            nome: "",
            categoria: "",
            genero: "",
            ano: "",
            duracao: "",
            sinopse: "",
            seguidores: 0,
            posts: [
            ]
        }
    }

    componentDidMount(){

        var url = window.location.href
        var idTitulo = url.substring(url.lastIndexOf('?id=') + 4);

        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                window.location = '/login';
            }
            firebase.firestore().collection('conteudos')
            .doc(idTitulo)
            .get()
            .then((snapshot) => {
                this.setState({
                    nome: snapshot.data().nome,
                    categoria: snapshot.data().categoria,
                    genero: snapshot.data().genero,
                    ano: snapshot.data().ano,
                    duracao: snapshot.data().duracao,
                    sinopse: snapshot.data().sinopse,
                    seguidores: snapshot.data().seguidores
                })
            })             
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

        console.log(newPosts)
    }

    render(){
        return(
            <div className="wrapper">   
                <Header username="gui_webeer"/>
        
                <main>
                    <div class="main-section">
                        <div class="container">
                            <div class="main-section-data">
                                <div class="row">

                                    { /* <!-- Menu Usuario --> */}
                                    <MenuUsuario name="Guilherme" username="gui_webeer" />

                                    { /* <!-- Seção de posts --> */}
                                    <div class="col-lg-6 col-md-8 no-pd">
                                        <div class="main-ws-sec">

                                            <Titulo 
                                            nome={this.state.nome}
                                            categoria={this.state.categoria}
                                            genero={this.state.genero}
                                            ano={this.state.ano}
                                            duracao={this.state.duracao}
                                            sinopse={this.state.sinopse}
                                            seguidores={this.state.seguidores}/>

                                            <Postbar/>

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

export default Conteudo;
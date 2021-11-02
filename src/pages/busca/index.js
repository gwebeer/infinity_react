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
import tituloBusca from '../../components/preview/index.js';
import Preview from '../../components/preview/index.js';

class Busca extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            foundContents: []
        }
    }

    componentDidMount(){

        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                window.location = '/login';
            }
        })

        firebase.firestore().collection('conteudos')
        .get()
        .then((snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    nome: doc.data().nome,
                    categoria: doc.data().categoria,
                    sinopse: doc.data().sinopse,
                    seguidores: doc.data().seguidores,
                    id: doc.id
                })
            })

            let foundPosts = [];
            lista.forEach((doc) => {
                foundPosts.push(<Preview nome={doc.nome} categoria={doc.categoria} 
                                         sinopse={doc.sinopse} seguidores={doc.seguidores} 
                                         capa={doc.nome} link={doc.id} />)
            })
            this.setState({foundContents: foundPosts})
            let resultados = foundPosts.length;
        })
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
                                        <h2 class="busca-title"> Foi encontrado {this.state.foundContents.length} resultado(s) para sua busca</h2>
                                        
                                        {this.state.foundContents}

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

export default Busca;
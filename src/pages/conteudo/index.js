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
import NotFound from '../../components/notFound/posts.js';

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
            loading: true,
            posts: [
            ]
        }
        this.buscaPosts = this.buscaPosts.bind(this);
    }

    componentDidMount(){

        demoAsyncCall().then(() => this.setState({ loading: false }));

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
        this.buscaPosts();
    }

    buscaPosts(){
        var url = window.location.href
        var idTitulo = url.substring(url.lastIndexOf('?id=') + 4);

        firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
            let posts = [];

            snapshot.forEach((doc) => {
                if(doc.data().idConteudo == idTitulo){
                    posts.push({
                        usuario: doc.data().usuario,
                        nome: doc.data().nome,
                        desc: doc.data().desc,
                        curtidas: doc.data().curtidas,
                        idConteudo: doc.data().idConteudo,
                        nomeConteudo: doc.data().nomeConteudo,
                        comentarios: doc.data().comentarios,
                        categoria: doc.data().categoria
                    })
                }
            })

            let foundPosts = [];

            if(posts.length == 0) {
                foundPosts.push(<NotFound/>)
            } else {
                posts.forEach((doc) => {
                foundPosts.push(<Post usuario={doc.usuario} nome={doc.nome} categoria={doc.categoria}
                                         desc={doc.desc} curtidas={doc.curtidas} 
                                         nomeConteudo={doc.nomeConteudo} comentarios={doc.comentarios} />) })
            }
            this.setState({posts: foundPosts})
        })   
    }

    render(){

        const { loading } = this.state;

        if (loading) {
            const teste =
                <div className="wrapper">
                    <Header username="gui_webeer"/>
                    {/* <Helmet title="Entrevistas" /> */}
                    <div style={{ textAlign: "center", marginTop: "10%" }}>
                        {/* <img src={Logo} alt="Logo" width="10%" /> */}
                        <h5 style={{ color: "#de4C4b" }}>Inifnity</h5>
                    </div>
                </div>
            return teste; // render null when 
        }

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

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}
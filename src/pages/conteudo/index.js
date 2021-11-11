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
            userLog: "",
            nameLog: "",
            userId: "",
            listaSeguindo: [],
            url: "https://firebasestorage.googleapis.com/v0/b/infinityreact-80aef.appspot.com/o/usuario%2F3hR4mxD5ORWzjasgCy11qwBIi0K2?alt=media&token=fad1d15d-84ef-48bb-b177-390e6f9bfe5a",

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

        this.componentDidMount = () => {
            // Página de espera
            demoAsyncCall().then(() => this.setState({ loading: false }));

            this.dbValidation();
            
            // this.searchPosts();
        }

        this.componentDidUpdate = () => {
            this.searchPosts();
        }

        this.searchPosts = this.searchPosts.bind(this);
        this.titleId = this.titleId.bind(this);
        this.dbValidation = this.dbValidation.bind(this);
        this.carregarInformações = this.carregarInformações.bind(this);
    }


    titleId() {
        var url = window.location.href
        var idTitulo = url.substring(url.lastIndexOf('?id=') + 4);
        return idTitulo;
    }

    async dbValidation() {
        // Extrai id do conteudo da url
        let idTitulo = this.titleId();

        // Verifica se está logado
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                // Se não tiver encaminha para login
                window.location = '/login';
            }

            // Retorna as informações relevantes do usuário logado
            firebase.firestore().collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {

                firebase.storage().ref('usuario').child(user.uid).getDownloadURL()
                    .then((url) => {
                        this.setState({url: url})
                    })

                // this.state.nomeLogado = snapshot.data().nome;
                this.setState({
                    nameLog: snapshot.data().nome,
                    listaSeguindo: snapshot.data().seguindo,
                    userLog: snapshot.data().username,
                    userId: user.uid
                }, () => {this.carregarInformações()})
            })
            

            // Retorna as informações do conteúdo acessado
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
    }

    carregarInformações() {
        let idTitulo = this.titleId();

        if (this.state.listaSeguindo.indexOf(idTitulo) > -1) {
            this.setState({btSeguir: "Seguindo"})
        }
    }

    async searchPosts(){
        // Extrai id do conteudo da url
        let idTitulo = this.titleId();

        // Retorna itens da coleção posts
        firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
            let posts = [];

            // Percorre os posts adiciona ao array caso for relacionado
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

            // Define o array de componentes 'posts' montados
            let foundPosts = [];

            // Se não encontrar posts, chama o componente <NotFound/>
            if(posts.length == 0) {
                foundPosts.push(<NotFound/>)
            } else { // Se encontrar, monta os posts com as informações do post
                posts.forEach((doc) => {
                    foundPosts.push(<Post usuario={doc.usuario} nome={doc.nome} categoria={doc.categoria} userId={this.state.userId}
                                            desc={doc.desc} curtidas={doc.curtidas} postId={doc.postId}
                                            nomeConteudo={doc.nomeConteudo} comentarios={doc.comentarios} />) })
            }
            
            // Atualiza o state contendo posts montados
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
                <Header username={this.state.userLog}/>
        
                <main>
                    <div class="main-section">
                        <div class="container">
                            <div class="main-section-data">
                                <div class="row">

                                    { /* <!-- Menu Usuario --> */}
                                    <MenuUsuario name={this.state.nameLog} username={this.state.userLog} url={this.state.url} userId={this.state.userId} />

                                    { /* <!-- Seção de posts --> */}
                                    <div class="col-lg-9 col-md-8 no-pd">
                                        <div class="main-ws-sec">

                                            <Titulo 
                                            nome={this.state.nome}
                                            categoria={this.state.categoria}
                                            genero={this.state.genero}
                                            ano={this.state.ano}
                                            duracao={this.state.duracao}
                                            sinopse={this.state.sinopse}
                                            seguidores={this.state.seguidores}
                                            listaSeguindo={this.state.listaSeguindo}
                                            userId={this.state.userId} />

                                            <Postbar
                                            categoria={this.state.categoria}
                                            nomeConteudo={this.state.nome}
                                            nomeUsuario={this.state.nameLog}
                                            userId={this.state.userId}
                                            userLog={this.state.userLog} />

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
import React, { Component } from 'react';

import Post from '../../components/post/posts.js';
import MenuUsuario from '../../components/menuUsuario';
import Header from '../../components/header';
import Locator from '../../components/locator/index.js';
import NotFound from '../../components/notFound/posts.js';

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

class FeedSeries extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userLog: "",
            nameLog: "",
            listaSeguindo: [],
            userId: "",
            url: "",

            posts: [
            ]
        }

        this.componentDidMount = () => {
            
            this.authValidation();

        }

        this.searchPosts = this.searchPosts.bind(this);
        this.authValidation = this.authValidation.bind(this);
    }

    authValidation() {
        // Verifica se está logado
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                window.location = '/login';
            } else {
                // Puxa informações do usuário logado
                firebase.firestore().collection('users')
                .doc(user.uid)    
                .get()
                .then((snapshot) => {

                    firebase.storage().ref('usuario').child(user.uid).getDownloadURL()
                    .then((url) => {
                        this.setState({url: url})
                    })

                    this.setState({ 
                        userLog: snapshot.data().username,
                        nameLog: snapshot.data().nome,
                        listaSeguindo: snapshot.data().seguindo,
                        userId: user.uid
                    }, this.searchPosts);                    
                    })
                .catch(() => {
                    console.log("Algo deu errado!")
                })
            }
        })
    }

    async searchPosts(){
        
        // Retorna itens da coleção posts
        firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
            let posts = [];

            // Percorre os posts adiciona ao array caso for relacionado
            snapshot.forEach((doc) => {
                if(this.state.listaSeguindo.indexOf(doc.data().idConteudo) > -1 && doc.data().categoria === "Série"){
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
        return(
            <div className="wrapper">  
                
                {/* Chama o componente <Header/> com props */} 
                <Header username={this.state.userLog}/>
        
                <main>
                    <div class="main-section">
                        <div class="container">
                            <div class="main-section-data">
                                <div class="row">

                                    { /* Chama o componente <MenuUsuario/> com props */}
                                    <MenuUsuario name={this.state.nameLog} username={this.state.userLog} userId={this.state.userId} url={this.state.url} />

                                    <div class="col-lg-9 col-md-8 no-pd">
                                        <div class="main-ws-sec">

                                            {/* Chama o componente <Locator/> com props (identifica o Feed Atual) */}
                                            <Locator nome={this.state.nameLog} feed="séries"/>

                                            <div class="posts-section">

                                                {/* O state posts contém a lista filtrada de componentes <Posts/> completos */}
                                                {this.state.posts}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </main>
	        </div>
        )
    }

}

export default FeedSeries;
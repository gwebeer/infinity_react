import React, { Component } from 'react';

import Post from '../../components/post/posts.js';
import MenuUsuario from '../../components/menuUsuario';
import Header from '../../components/header';
import ProfileHeader from '../../components/profileHeader';
import Following from '../../components/following/index.js';
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

class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userLog: "",
            nameLog: "",
            listaSeguindo: "",

            posts: [
            ],
            
            profileHeader: "Post",
            profileContent: []
        }

        this.componentDidMount = () => {

            this.authValidation();

            this.loadPosts();

        }
        
        this.contentDefine = this.contentDefine.bind(this);
        this.authValidation = this.authValidation.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    // Altera o conteudo da pagina de acordo com o botao no <ProfileHeader/>
    contentDefine(content) {
        this.setState({profileHeader: content}, () => {
            if(this.state.profileHeader === "Post") {
                this.loadPosts();
            }
            if(this.state.profileHeader === "Following") {
                let followingArray = [];
                followingArray.push(<Following/>)  
                this.setState({profileContent: followingArray})
            }
            if(this.state.profileHeader === "Content") {
                this.setState({profileContent: ["Em desenvolvimento"]})
            }
        })
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
                    this.setState({ 
                        userLog: snapshot.data().username,
                        nameLog: snapshot.data().nome,
                        listaSeguindo: snapshot.data().seguindo
                    }, this.loadPosts);                    
                    })
                .catch(() => {
                    console.log("Algo deu errado!")
                })
            }
        })
    }

    loadPosts() {

        // Retorna itens da coleção posts
        firebase.firestore().collection('posts')
        .get()
        .then((snapshot) => {
            let posts = [];

            // Percorre os posts adiciona ao array caso for relacionado
            snapshot.forEach((doc) => {
                console.log(doc.data().usuario)
                console.log(this.state.userLog)
                if(this.state.listaSeguindo.indexOf(doc.data().idConteudo) > -1 && doc.data().usuario === this.state.userLog){
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
                foundPosts.push(<Post usuario={doc.usuario} nome={doc.nome} categoria={doc.categoria}
                                         desc={doc.desc} curtidas={doc.curtidas} 
                                         nomeConteudo={doc.nomeConteudo} comentarios={doc.comentarios} />) })
            }
            
            // Atualiza o state contendo posts montados
            this.setState({profileContent: foundPosts})
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
                                    <MenuUsuario name={this.state.nameLog} username={this.state.userLog} />

                                    <div class="col-lg-9 col-md-8 no-pd">
                                        <div class="main-ws-sec">

                                            {/* Chama o componente <ProfileHeader/> */}
                                            <ProfileHeader changeContent={this.contentDefine}/>

                                            <div class="posts-section">

                                                {/* O state profileContent contém o conteúdo selecionado no <ProfileHeader/> */}
                                                {this.state.profileContent}

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

export default Profile;
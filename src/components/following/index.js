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

import icone1 from '../../images/ic1.png'
import icone2 from '../../images/ic5.png'

import luca from '../../images/filmeluca.jpg';
import toystory from '../../images/toystory.jpg';
import you from '../../images/you.jpg';
import stranger from '../../images/stranger.jpg';
import alquimista from '../../images/alquimista.jpg';
import brida from '../../images/brida.jpg';

import FollowingItem from '../followingItem';

import firebase from 'firebase';

class Following extends Component {

    constructor(props){
        super(props);
        this.state = {
            userLog: "",
            nameLog: "",
            listaSeguindo: [],
            userId: "",

            posts: [
            ]
        }

        this.componentDidMount= () => {
            
            // Verifica se está logado e extrai infos do usuário
            this.authValidation();

        }
        
        this.authValidation = this.authValidation.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
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
        firebase.firestore().collection('conteudos')
        .get()
        .then((snapshot) => {
            let posts = [];

            // Percorre os posts adiciona ao array caso for relacionado
            snapshot.forEach((doc) => {
                if(this.state.listaSeguindo.indexOf(doc.id) > -1){
                    posts.push({
                        nome: doc.data().nome,
                        categoria: doc.data().categoria,
                        seguidores: doc.data().seguidores,
                        idConteudo: doc.id
                    })
                }
            })

            // Define o array de componentes 'posts' montados
            let foundPosts = [];

            // Se não encontrar posts, chama o componente <NotFound/>
            if(posts.length == 0) {
                
            } else { // Se encontrar, monta os posts com as informações do post
                posts.forEach((doc) => {
                foundPosts.push(<FollowingItem nome={doc.nome} categoria={doc.categoria} seguidores={doc.seguidores}
                                                listaSeguindo={this.state.listaSeguindo} idConteudo={doc.idConteudo} 
                                                userId={this.state.userId} />) })
            }
            
            // Atualiza o state contendo posts montados
            this.setState({posts: foundPosts})
        })   
    }
    
    render(){
        return(
            <div class="product-feed" id="feed-dd">
                <div class="container">
                    <div class="company-title">
                    </div>
                    <div class="companies-list">
                        <div class="row">
                            {this.state.posts}                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Following;
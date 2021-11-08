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
            userLog: "",
            nameLog: "",

            foundContents: []
        }

        this.componentDidMount=() => {
            // Valida se o usuário ta logado
            this.authValidation();

            this.searchAll();
        }

        this.authValidation = this.authValidation.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword () {
        var url = window.location.href
        var keyword = url.substring(url.lastIndexOf('?search=') + 8);
        return keyword;
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
                        userId: ""
                    }, this.searchAll);                    
                    })
                .catch(() => {
                    console.log("Algo deu errado!")
                })
            }
        })
    }

    searchAll() {
        // Retorna todos os conteúdos cadastrados em banco
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

            // Passa as informações para montar o componente <Preview/>
            let foundPosts = [];
            lista.forEach((doc) => {
                foundPosts.push(<Preview nome={doc.nome} categoria={doc.categoria} 
                                         sinopse={doc.sinopse} seguidores={doc.seguidores} 
                                         capa={doc.nome} idConteudo={doc.id} />)
            })

            // Atualiza o state com todos os posts que foram encontrados
            this.setState({foundContents: foundPosts})
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
                                            
                                            {/* Exibe quantidade de resultados encontrados */}
                                            <h2 class="busca-title"> Foi encontrado {this.state.foundContents.length} resultado(s) para sua busca</h2>
                                            
                                            {/* O state posts contém a lista de componentes <Preview/> completos */}
                                            {this.state.foundContents}

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

export default Busca;
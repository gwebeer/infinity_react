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

import profile from '../../images/userProfileGuilherme.jpeg'

import firebase from 'firebase';

class Postbar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            post: "",
            caracteres: 320,
            url: "",
        }

        this.componentDidMount = () => {
            this.carregaImagem()
        }

        this.fAddDatabase = this.fAddDatabase.bind(this);
        this.titleId = this.titleId.bind(this);
        this.carregaImagem = this.carregaImagem.bind(this);
    }

    carregaImagem() {
        firebase.storage().ref('usuario').child(this.props.userId).getDownloadURL()
        .then((url) => {
            this.setState({url: url})
        })
    }

    titleId() {
        var url = window.location.href
        var idTitulo = url.substring(url.lastIndexOf('?id=') + 4);
        return idTitulo;
    }

    fAddDatabase() {
        firebase.firestore().collection('posts')
        .add({
            categoria: this.props.categoria,
            comentarios: 0,
            curtidas: 0,
            desc: this.state.post,
            idConteudo: this.titleId(),
            nome: this.props.nomeUsuario,
            nomeConteudo: this.props.nomeConteudo,
            userId: this.props.userId,
            usuario: this.props.userLog,
        })
        .then(
            this.setState({post: "", caracteres: 320})
        )
    }

    render(){
        return(
            <div className="post-topbar">
                <div className="linha postbar-top-pd">
                    <div className="externa-postbar-img">
                        <img src={this.state.url} className="profile-post"/>
                    </div>

                    <div className="externa-postbar">
                        <textarea placeholder="Digite seu comentário..." className="text-post" 
                        rows="7" maxLength="320" value={this.state.post} onChange={(e) => {
                            let tamanho = this.state.post.length
                            this.setState({post: e.target.value}, ()=>{
                                let tamanho = this.state.post.length;
                                this.setState({caracteres: 320 - tamanho})
                            })
                        }}/>
                        <span> Restam {this.state.caracteres} caracteres </span>
                    </div>

                    <div className="externa-postbar-btn">
                        <div className="post-st">
                            <ul>
                                <li><a className="post-jb active" onClick={this.fAddDatabase} >Publicar!</a></li>
                            </ul>
                        </div>
                    </div>
                
                </div>
            </div>


        )
    }
}

export default Postbar;
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

import Luca from '../../images/fotofilme.jpg'
import Divergente from '../../images/fotolivro.jpg'

import firebase from 'firebase';

class Preview extends Component {

    constructor(props){
        super(props);
        this.state = {
            seguir: "",
            seguidores: props.seguidores,
            idConteudo: props.idConteudo,
            contentUrl: "",

            listaSeguindo: props.listaSeguindo,
        }

        this.componentDidMount = () => {
            this.startState()
            this.carregaImagem();
        }

        this.startState = this.startState.bind(this);
        this.btFollowClick = this.btFollowClick.bind(this);
        this.followingListUpdate = this.followingListUpdate.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.carregaImagem = this.carregaImagem.bind(this);
    }


    startState() {
        firebase.firestore().collection('users')
        .doc("3hR4mxD5ORWzjasgCy11qwBIi0K2")
        .get()
        .then((snapshot)=>{
            this.setState({listaSeguindo: snapshot.data().seguindo}, () => {
                if(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1) {
                    this.setState({seguir: "Seguindo"})
                } else {
                    this.setState({seguir: "Seguir"})
                }
            })
        })
    }

    carregaImagem() {
        firebase.storage().ref('conteudos').child(this.props.idConteudo).getDownloadURL()
        .then((url) => {
        this.setState({contentUrl: url})
        })
    }

    btFollowClick() {
        if(this.state.seguir === "Seguir") {
            this.setState({seguir: "Seguindo"})
            this.state.listaSeguindo.push(this.props.idConteudo)
            console.log(this.state.listaSeguindo)
            this.follow();
        } else {
            this.setState({seguir: "Seguir"})

            let index = this.state.listaSeguindo.indexOf(this.props.idConteudo)
            this.state.listaSeguindo.splice(index, 1)
            console.log(this.state.listaSeguindo)
            this.unfollow();
        }
        this.followingListUpdate();
    }

    followingListUpdate() {
        firebase.firestore().collection('users')
        .doc(this.props.userId)
        .update({
            seguindo: this.state.listaSeguindo
        })
    }

    follow() {
        this.setState({seguidores: this.state.seguidores + 1}, () => {
            firebase.firestore().collection('conteudos')
            .doc(this.props.idConteudo)
            .update({
            seguidores: this.state.seguidores
            })
        })
        
        
    }

    unfollow() {
        this.setState({seguidores: this.state.seguidores - 1}, () => {
            firebase.firestore().collection('conteudos')
            .doc(this.props.idConteudo)
            .update({
                seguidores: this.state.seguidores
            })
        })
    }


    render(){
        return(
            <div className="post-topbar">
                <div className="linha-preview">
                    <div className="externa-capa-preview">
                        <img src={this.state.contentUrl} className="img-preview"/>
                    </div>

                    <div className="externa-info-preview">
                        <a href={"/conteudo?id=" + this.props.idConteudo}> <h3 className="titulo-conteudo"> {this.props.nome} | {this.props.categoria} </h3> </a>
                        <hr/>
                        <label className="info-preview-label">Sinopse: </label>
                        <p className="info-preview-p"> {this.props.sinopse} </p>
                    </div>

                    <div className="externa-follow-preview">
                        <div className="post-st">
                            <ul id="btn-follow-preview">
                                <li><a onClick={()=>{this.btFollowClick()}} className="post-jb active"> {this.state.seguir} </a></li>
                            </ul>
                            <p className="followers"> {this.state.seguidores} seguidores </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
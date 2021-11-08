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

import luca from '../../images/fotofilme.jpg'

import firebase from 'firebase';

class Titulo extends Component {

    constructor(props){
        super(props);
        this.state = {
            seguir: "",

            seguidores: props.seguidores,

            listaSeguindo: props.listaSeguindo
        }

        this.componentDidMount = () => {
            this.teste()
        }

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.titleId = this.titleId.bind(this);
        this.btFollowClick = this.btFollowClick.bind(this);
        this.followingListUpdate = this.followingListUpdate.bind(this);
        this.teste = this.teste.bind(this);
    }

    teste() {
        if(this.state.listaSeguindo.indexOf(this.titleId()) > -1) {
            this.setState({seguir: "Seguindo"})
        } else {
            this.setState({seguir: "Seguir"})
        }
    }

    titleId() {
        var url = window.location.href
        var idTitulo = url.substring(url.lastIndexOf('?id=') + 4);
        return idTitulo;
    }

    btFollowClick() {
        if(this.state.listaSeguindo.indexOf(this.titleId()) > -1) {
            let index = this.state.listaSeguindo.indexOf(this.titleId())
            this.state.listaSeguindo.splice(index, 1)
            this.unfollow();
        } else {
            this.state.listaSeguindo.push(this.titleId())
            this.follow();
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
        firebase.firestore().collection('conteudos')
        .doc(this.titleId())
        .update({
            seguidores: this.state.seguidores + 1
        })
        .then(
            this.setState({
                seguidores: this.state.seguidores + 1,
                seguir: "Seguindo"
            })
        )
    }

    unfollow() {
        firebase.firestore().collection('conteudos')
        .doc(this.titleId())
        .update({
            seguidores: this.state.seguidores - 1
        })
        .then(
            this.setState({
                seguidores: this.state.seguidores - 1,
                seguir: "Seguir"
            })

        )
    }

    render(){
        return(
            <div className="post-topbar">
                
                <div className="linha">
                    <div className="externa-title">
                        <h3 className="titulo-conteudo">{this.props.nome}</h3>
                        <h4 className="categoria">{this.props.categoria}</h4>
                    </div>

                    <div className="externa-title">
                        <div className="post-st">
                            <ul id="btn-follow">
                                <li><a className="post-jb active" onClick={this.btFollowClick}>{this.state.seguir}</a></li>
                            </ul>
                            <p className="followers"> {this.state.seguidores} seguidores </p>
                        </div>
                    </div>
                </div>
               
                <hr/>

                <div className="linha">
                    <div className="externa">
                        <img src={luca} className="img"/>
                    </div>

                    <div className="externa-info">                                              
                        <div className="info">
                        <label> Gênero: </label>
                        <p> {this.props.genero} </p>

                        <label> Ano: </label>
                        <p> {this.props.ano} </p>

                        <label> Duração: </label>
                        <p> {this.props.duracao} </p>

                        <label> Sinopse: </label>
                        <p> {this.props.sinopse} </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Titulo;
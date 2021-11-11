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

import firebase from 'firebase';
import Following from '../following';

class FollowingItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            seguir: "",

            seguidores: props.seguidores,

            listaSeguindo: props.listaSeguindo,

            url: "",
        }

        this.componentDidMount = () => {
            this.imagem();
            this.teste();
        }
        
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.btFollowClick = this.btFollowClick.bind(this);
        this.followingListUpdate = this.followingListUpdate.bind(this);
        this.teste = this.teste.bind(this);
        this.imagem = this.imagem.bind(this);
    }

    imagem() {
        firebase.storage().ref('conteudos').child(this.props.idConteudo).getDownloadURL()
        .then((url) => {
            this.setState({url: url})
        })
    }

    teste() {
        if(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1) {
            this.setState({seguir: "Seguindo"})
        } else {
            this.setState({seguir: "Seguir"})
        }
    }

    btFollowClick() {
        if(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1) {
            let index = this.state.listaSeguindo.indexOf(this.props.idConteudo)
            this.state.listaSeguindo.splice(index, 1)
            this.unfollow();
        } else {
            this.state.listaSeguindo.push(this.props.idConteudo)
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
        .doc(this.props.idConteudo)
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
        .doc(this.props.idConteudo)
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
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="company_profile_info">
                    <div class="company-up-info">
                        <img src={this.state.url}/>
                        <h3> {this.props.nome} </h3>
                        <h3>  {this.props.categoria} </h3>
                        <h4> {this.state.seguidores} seguidores</h4>
                        <ul>
                            <li><a title="" class="follow" onClick={this.btFollowClick}> {this.state.seguir} </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default FollowingItem;
import React, { Component } from 'react'

import usPic from '../../images/us-pic.png'
import profileGuilherme from '../../images/userProfileGuilherme.jpeg'

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

class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            curtidas: props.curtidas,
            curtir: "teste",
            url: "",

            listaCurtidas: []
        }

        this.componentDidMount = () => {
            this.imgPost();
        }

        this.imgPost = this.imgPost.bind(this);
    }

    imgPost() {
        console.log(this.props.userId)
        firebase.storage().ref('usuario').child(this.props.userId).getDownloadURL()
        .then((url) => {
            this.setState({url: url})
        })
    }

    render(){
        return(
            <div class="post-bar">
                <div className="post-locator">
                    <p> Comentando o {this.props.categoria} {this.props.nomeConteudo}</p>
                </div>
                <div class="post_topbar">
                    <div class="usy-dt">
                        <img src={this.state.url} className="img-post"/>
                        <div class="usy-name">
                            <h3> {this.props.nome} | @{this.props.usuario} </h3>
                        </div>
                    </div>
                    <div class="ed-opts">
                        <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
                        <ul class="ed-options">
                            <li><a href="#" title=""> Deletar</a></li>
                            
                        </ul>
                    </div>
                </div>
            
                <div class="job_descp">
                    <p> {this.props.desc} </p>
                </div>
                <div class="job-status-bar">
                    <ul class="like-com">
                        <li class="option-post">
                            <a><i class="fas fa-heart"></i> {this.props.curtidas} Pessoas Curtiram </a>
                        </li> 
                        <li><a href="#" class="com"><i class="fas fa-comment-alt"></i> {this.props.comentarios} Comentários </a></li>
                    </ul>
                    
                </div>
            </div>
        )
    }


}

export default Post;
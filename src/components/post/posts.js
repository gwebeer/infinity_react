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
            curtir: "",

            listaCurtidas: []
        }

        this.componentDidMount = () => {
            this.startState();
        }

        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.startState = this.startState.bind(this);
        this.btLikeClick = this.btLikeClick.bind(this);
        this.likeListUpdate = this.likeListUpdate.bind(this);
    }

    startState() {
        firebase.firestore().collection('users')
        .doc(this.props.userId)
        .get()
        .then((snapshot) => {
            this.setState({listaCurtidas: snapshot.data().curtidas}, () => {
                if(this.state.listaCurtidas.indexOf(this.props.postId) > -1) {
                    this.setState({curtir: "Curtido"})
                } else {
                    this.setState({curtir: "Curtir"})
                }
            })
        })
        
    }

    btLikeClick() {
        if(this.state.curtir === "Curtir") {
            this.setState({curtir: "Curtido"})
            this.state.listaCurtidas.push(this.props.postId)
            console.log(this.state.listaCurtidas)
            this.like();
        } else {
            this.setState({seguir: "Curtir"})

            let index = this.state.listaCurtidas.indexOf(this.props.postId)
            this.state.listaCurtidas.splice(index, 1)
            console.log(this.state.listaCurtidas)
            this.unlike();
        }
        this.likeListUpdate();
    }

    likeListUpdate() {
        firebase.firestore().collection('users')
        .doc(this.props.userId)
        .update({
            curtidas: this.state.listaCurtidas
        })
    }

    unlike() {
        this.setState({curtidas: this.state.curtidas - 1}, () => {
            firebase.firestore().collection('posts')
            .doc(this.props.postId)
            .update({
                curtidas: this.state.curtidas
            })
        })
    }

    like() {
        this.setState({curtidas: this.state.curtidas + 1}, () => {
            firebase.firestore().collection('posts')
            .doc(this.props.postId)
            .update({
                curtidas: this.state.curtidas
            })
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
                        <img src={usPic}/>
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
                        <li>
                            <a onClick={()=>{this.btLikeClick()}}><i class="fas fa-heart"></i> {this.state.curtidas} Pessoas Curtiram </a>
                        </li> 
                        <li><a href="#" class="com"><i class="fas fa-comment-alt"></i> {this.props.comentarios} Comentários </a></li>
                    </ul>
                    
                </div>
            </div>
        )
    }


}

export default Post;
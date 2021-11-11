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
import icone3 from '../../images/ic5.png'

class ProfileHeader extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            classPosts: "active",
            classFollowing: "",
            classMyContents: ""
        }

        this.myPostsClick = this.myPostsClick.bind(this);
        this.followingClick = this.followingClick.bind(this);
        this.myContentClick = this.myContentClick.bind(this);
    }

    // Muda classe do ícone e conteúdo exibido no perfil
    myPostsClick(){
        this.setState({
            classPosts: "active",
            classFollowing: "",
            classMyContents: "" })
        
            this.props.changeContent("Post")
    }

    // Muda classe do ícone e conteúdo exibido no perfil
    followingClick(){
        this.setState({
            classPosts: "",
            classFollowing: "active",
            classMyContents: "" })
        
            this.props.changeContent("Following")
    }

    // Muda classe do ícone e conteúdo exibido no perfil
    myContentClick(){
        this.setState({
            classPosts: "",
            classFollowing: "",
            classMyContents: "active" })
        
        this.props.changeContent("Content")
    }

    render(){
        return(
            <div class="user-tab-sec rewivew">
                <div class="tab-feed st2 settingjb">
                    <ul>

                        {/* Icone Minhas Publicações */}
                        <li data-tab="feed-dd" title="posts" class={this.state.classPosts} onClick={this.myPostsClick}>
                            <a title="">
                                <img src={icone1}/>
                                <span> Minhas publicações </span>
                            </a>
                        </li>

                        {/* Icone Seguindo */}
                        <li data-tab="info-dd" class={this.state.classFollowing} onClick={this.followingClick}>
                            <a title="">
                                <img src={icone2}/>
                                <span> Seguindo </span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;
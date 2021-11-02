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

class Postbar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            post: "",
        }
    }

    render(){
        return(
            <div className="post-topbar">
                <div className="linha postbar-top-pd">
                    <div className="externa-postbar-img">
                        <img src={profile} className="profile-post"/>
                    </div>

                    <div className="externa-postbar">
                        <textarea placeholder="Digite seu comentário..." className="text-post"/>
                    </div>

                    <div className="externa-postbar-btn">
                        <div className="post-st">
                            <ul>
                                <li><a className="post-jb active" href="#" title="">Publicar!</a></li>
                            </ul>
                        </div>
                    </div>
                
                </div>
            </div>


        )
    }
}

export default Postbar;
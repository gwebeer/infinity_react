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

class Locator extends Component {
    
    render(){
        return(
            <div class="post-topbar">
                <p class="topWelcome"> Seja bem-vindo(a) {this.props.nome} </p>
                <p> Você está acessando o feed de {this.props.feed}. </p>
            </div>
        )
    }
}

export default Locator;
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

class NotFound extends Component {
    
    render(){
        return(
            <div className="not-found-info">
                <h3 className="post-not-found">Nenhum post foi encontrado! :(</h3>
                <h3 className="post-not-found">Seja o primeiro a comentar esse conteúdo!</h3>
            </div>
        )
    }


}

export default NotFound;
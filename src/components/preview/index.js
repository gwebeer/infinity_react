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

class Preview extends Component {

    render(){
        return(
            <div className="post-topbar">
                <div className="linha-preview">
                    <div className="externa-capa-preview">
                        <img src={Luca} className="img-preview"/>
                    </div>

                    <div className="externa-info-preview">
                        <a href={"/conteudo?id=" + this.props.link}> <h3 className="titulo-conteudo"> {this.props.nome} | {this.props.categoria} </h3> </a>
                        <hr/>
                        <label className="info-preview-label">Sinopse: </label>
                        <p className="info-preview-p"> {this.props.sinopse} </p>
                    </div>

                    <div className="externa-follow-preview">
                        <div className="post-st">
                            <ul id="btn-follow-preview">
                                <li><a className="post-jb active" href="#" title="">Seguir</a></li>
                            </ul>
                            <p className="followers"> {this.props.seguidores} seguidores </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
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

class Titulo extends Component {
    
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
                                <li><a className="post-jb active" href="#" title="">Seguir</a></li>
                            </ul>
                            <p className="followers"> {this.props.seguidores} seguidores </p>
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
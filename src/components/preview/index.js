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

import firebase from 'firebase';

class Preview extends Component {

    constructor(props){
        super(props);
        this.state = {
            seguir: "",
            seguidores: props.seguidores,
            idConteudo: props.idConteudo,

            listaSeguindo: props.listaSeguindo,
        }

        this.componentDidMount = () => {
            this.setState({listaSeguindo: this.props.listaSeguindo}, this.startState())
        }

        this.startState = this.startState.bind(this);
    }

    startState() {
        if(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1) {
            console.log(true)
            console.log(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1)
        } else {
            console.log(false)
            console.log(this.state.listaSeguindo.indexOf(this.props.idConteudo) > -1)
        }
    }


    render(){
        return(
            <div className="post-topbar">
                <div className="linha-preview">
                    <div className="externa-capa-preview">
                        <img src={Luca} className="img-preview"/>
                    </div>

                    <div className="externa-info-preview">
                        <a href={"/conteudo?id=" + this.props.idConteudo}> <h3 className="titulo-conteudo"> {this.props.nome} | {this.props.categoria} </h3> </a>
                        <hr/>
                        <label className="info-preview-label">Sinopse: </label>
                        <p className="info-preview-p"> {this.props.sinopse} </p>
                    </div>

                    <div className="externa-follow-preview">
                        <div className="post-st">
                            <ul id="btn-follow-preview">
                                <li><a className="post-jb active"> {this.state.seguir} </a></li>
                            </ul>
                            <p className="followers"> {this.state.seguidores} seguidores </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
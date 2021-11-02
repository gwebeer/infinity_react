import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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

import iconBarra from '../../images/iconbarra.png'
import user from '../../images/user.png'

class Header extends Component {
    
    render(){
        return(
            <header>
                {/* <!-- inicio logotipo--> */}
                <div class="container">
                    <div class="header-data">
                        <div class="logo">
                            <a href="paginainicial-feed.html" title=""><img src={iconBarra}/></a>
                        </div>{/* <!--logotipo acaba--> */}
                        
                        {/* <!-- inicio barra de pesquisa--> */}
                        <div class="search-bar">
                            <form>
                                <input type="text" name="search" placeholder="Pesquisar Conteúdo..."/>
                                <Link to="/busca"> <button type="submit"><i class="fas fa-search"></i></button> </Link>
                            </form>
                        </div>{/* <!--barra de pesquisa acaba -->*/ }
                        
                        {/* <!-- inicio botao menu--> */}
                        <div class="menu-btn">
                            <a href="#" title=""><i class="fa fa-bars"></i></a>
                        </div> {/* <!--botao menu acaba--> */}

                        {/* <!--usuário header--> */}
                        <div class="user-account">
                            <div class="user-info">
                                <img src={user}/> <a href="">{this.props.username}</a>
                            </div>
                            
                        </div> {/* <!--usuário header acaba--> */}
                    </div>{/* <!--header-data acaba--> */}
                </div>
            </header>	
        )
    }


}

export default Header;
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

import iconBarra from '../../images/iconbarra.png'
import user from '../../images/user.png'

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchBox: ""
        }

        this.btSearchClick = this.btSearchClick.bind(this);
        this.searchBoxContent = this.searchBoxContent.bind(this);
    }

    // Seta state com conteúdo digitado na SearchBar
    searchBoxContent(e) {
        let valorDigitado = e.target.value;
        this.setState({searchBox: valorDigitado})
    }

    // Encaminha para página de busca com o id na URL
    btSearchClick() {
        window.location = '/busca?search=' + this.state.searchBox;
    }
    
    render(){
        return(
            <header>
                <div class="container">
                    <div class="header-data">
                        
                        {/* Logo pequena na searchBar */}
                        <div class="logo">
                            <a href="paginainicial-feed.html" title=""><img src={iconBarra}/></a>
                        </div>
                        
                        {/* Início da searchBar */}
                        <div class="search-bar">
                            <form action="javascript:void(0);">
                                <input type="text" name="search" placeholder="Pesquisar Conteúdo..."
                                        value={this.state.searchBox} onChange={this.searchBoxContent} />
                                <button onClick={this.btSearchClick} ><i class="fas fa-search"></i></button>
                            </form>
                        </div>
                        
                        {/* Username superior */}
                        <div class="menu-btn">
                            <a href="#" title=""><i class="fa fa-bars"></i></a>
                        </div>

                        {/* User Profile Superior */}
                        <div class="user-account">
                            <div class="user-info">
                                <img src={user}/> <a href="">{this.props.username}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>	
        )
    }
}

export default Header;
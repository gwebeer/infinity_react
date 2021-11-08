import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/login'
import Cadastro from "./pages/cadastro";
import Feed from "./pages/feed";
import FeedFilmes from "./pages/feedFilmes";
import FeedLivros from "./pages/feedLivros";
import FeedSeries from "./pages/feedSeries";
import Conteudo from "./pages/conteudo";
import Busca from "./pages/busca";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";


const Routes = () => {
    return(
        <BrowserRouter>
            <Route exact path="/" component={Feed} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={SignUp} />

            <Route exact path="/feed-filmes" component={FeedFilmes} />
            <Route exact path="/feed-livros" component={FeedLivros} />
            <Route exact path="/feed-series" component={FeedSeries} />

            <Route exact path="/conteudo" component={Conteudo} />

            <Route exact path="/busca" component={Busca} />
        </BrowserRouter>
    )
}

export default Routes;
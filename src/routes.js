import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/login'
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import FeedFilmes from "./pages/feedFilmes";
import FeedLivros from "./pages/feedLivros";
import FeedSeries from "./pages/feedSeries";

const Routes = () => {
    return(
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastro" component={Cadastro} />

            <Route exact path="/feed-filmes" component={FeedFilmes} />
            <Route exact path="/feed-livros" component={FeedLivros} />
            <Route exact path="/feed-series" component={FeedSeries} />
        </BrowserRouter>
    )
}

export default Routes;
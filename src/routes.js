import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/login'
import Cadastro from "./pages/cadastro";

const Routes = () => {
    return(
        <BrowserRouter>
            
            <Route path="/" component={Cadastro} />
        </BrowserRouter>
    )
}

export default Routes;
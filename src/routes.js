import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/Login'

const Routes = () => {
    return(
        <BrowserRouter>
            <Route path="/" component={Login} />
        </BrowserRouter>
    )
}

export default Routes;
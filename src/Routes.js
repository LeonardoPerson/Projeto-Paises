import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Regiao } from "./components/Regiao";
import { Capital } from "./components/Capital";
import { Lingua } from "./components/Lingua";
import { Pais } from "./components/Pais";
import { CodigoLigacao } from "./components/CodigoLicacao";
import { DetalhesPais } from "./components/DetalhesPais";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/regiao" component={Regiao} />
        <Route path="/capital" component={Capital} />
        <Route path="/lingua" component={Lingua} />
        <Route path="/pais" component={Pais} />
        <Route path="/codigo-ligacao" component={CodigoLigacao} />
        <Route path="/detalhes-pais" component={DetalhesPais} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
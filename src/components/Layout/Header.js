import movaLogo from "../../assets/movaLogo.png";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export const Header = () => {
  return (
    <div>
      <div className="header">
        <img src={movaLogo} alt="Logo Mova" className="logo-mova"/>
        <Link to="/" className="header-voltar">
          <KeyboardReturnIcon fontSize="large"/>
          <div className="texto-voltar">Voltar</div>
        </Link>
      </div>
    </div>
  );
}

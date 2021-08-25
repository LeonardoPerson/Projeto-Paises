import movaLogo from "../assets/imagem/movaLogo.png";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export const Header = () => {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <img src={movaLogo} alt="Logo Mova" className="logo-mova" />
      <Link to="/" className="header-voltar d-flex justify-content-around align-items-center">
        <KeyboardReturnIcon fontSize="medium" />
        <div className="texto-voltar">Voltar</div>
      </Link>
    </div>

  );
}

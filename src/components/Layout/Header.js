import movaLogo from "../../assets/movaLogo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="header">
        <img src={movaLogo} alt="Logo Mova" />
      </div>
    </div>
  );
}

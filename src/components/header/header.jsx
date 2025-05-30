import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animate } from "animejs";
import "./Header.less";
import Button from "../Button/button.jsx";
import { AuthContext } from "../../context/authContext";
import { SVGatorCSSOnlyForReactJS } from "../Logo/Logo.jsx";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    animate(".logotipo circle", {
      r: [40, 20],
      alternate: true,
      loop: true,
      easing: "easeInOutSine",
      duration: 1000,
    });
  }, []);

  const handleProfile = () => {
    navigate("/perfil");
  };

  return (
    <header>
      <div>
        <SVGatorCSSOnlyForReactJS />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/times">Times</Link>
          </li>
          <li>
            <Link to="/torneios">Torneios</Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <>
          <Button text="Perfil" onClick={handleProfile} />
        </>
      ) : (
        <Link to="/register">
          <Button text="Cadastrar" />
        </Link>
      )}
    </header>
  );
}

export default Header;

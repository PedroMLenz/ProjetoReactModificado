import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animate } from "animejs";
import "./Header.less";
import Button from "../button/button.jsx";
import { AuthContext } from "../../context/authContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/perfil");
  };

  return (
    <header>
      <span className="logotipo">
        <svg
          width="300"
          height="100"
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#00BFFF"
            stroke-width="5"
            fill="none"
          />
          <text
            x="100"
            y="60"
            font-family="Arial, sans-serif"
            font-size="28"
            fill="#fff"
          >
            OrganizeJá
          </text>
        </svg>
      </span>
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

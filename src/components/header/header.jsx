import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.less';
import Button from '../button/button';
import { AuthContext } from '../../context/authContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/perfil');
  };

  return (
    <header>
      <span className='logotipo'>OrganizeJá</span>
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

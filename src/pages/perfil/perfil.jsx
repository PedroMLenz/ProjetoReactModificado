import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import './perfil.less';

const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthContext();

    useEffect(() => {
        const storedUser = localStorage.getItem('CURRENT_USER');
        if (storedUser) {
            try {
                setUsuario(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data from local storage:', error);
            }
        } else {
            console.log('No user data found in local storage.');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('CURRENT_USER');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="container-perfil">
                <div className="profile-picture">
                    <img src="https://img.freepik.com/vetores-gratis/circulo-azul-com-usuario-branco_78370-4707.jpg" alt="Foto de perfil" />
                </div>
                {usuario.name && usuario.surname ? (
                    <>
                        <h1>@{usuario.name}_{usuario.surname}</h1>
                        <div className="times-capitao">
                            <h2>Informações Pessoais</h2>
                            <p><strong>Nome de Usuário:</strong> {usuario.name} {usuario.surname}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                        </div>
                        <button className="button-logout" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    );
}

export default Perfil;
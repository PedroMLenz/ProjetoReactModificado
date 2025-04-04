import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './torneioDetalhes.less';
import { TorneiosContext } from '../../context/TorneiosProvider';
import { AuthContext } from '../../context/authContext';
import Button from '../../components/Button/button.jsx';
import { TimesContext } from '../../context/TimesProvider'; // Import TimesContext
import axiosClient from '../../utils/axios-client';

const API_URL = import.meta.env.VITE_API_URL;

const TorneioDetalhes = () => {
  const { id } = useParams();
  const { teams, loadAllTimes } = useContext(TimesContext);
  const { data, loadTorneios } = useContext(TorneiosContext);
  const { user, setUser } = useContext(AuthContext);
  const [torneio, setTorneio] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [matchData, setMatchData] = useState({ time1: '', time2: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTorneio = async () => {
      await loadTorneios();
      const foundTorneio = data.find((t) => t.id === parseInt(id));
      setTorneio(foundTorneio);
    };
    fetchTorneio();
  }, [id, loadTorneios]);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const storedUser = localStorage.getItem('CURRENT_USER');
    let user = null;

    try {
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }

    if (!user || !token) {
      console.log('User not authenticated, redirecting to login'); // Log if user is not authenticated
      navigate('/login');
    } else {
      console.log('User authenticated, loading tournaments'); // Log if user is authenticated
      setUser({ ...user, token }); // Set user and token in context
      loadTorneios();
      loadAllTimes();
      console.log('Logged-in user details:', user); // Log all user details
    }
  }, [navigate, setUser]);

  useEffect(() => {
    loadAllTimes(); // Load teams when component mounts
  }, [loadAllTimes]);

  useEffect(() => {
    if (user) {
      console.log('User:', user); // Log para depuração
      console.log('User Email:', user.email); // Log do email do usuário
      console.log('User Token:', user.token); // Log do token do usuário
      console.log('User ID:', user.id); // Log do ID do usuário
    }
  }, [user]);

  if (!torneio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="torneio-detalhes-page">
      <div className="torneio-detalhes-container">
        <h1>{torneio.nome}</h1>
        <p>Esporte: {torneio.esporte}</p>
        <p>Tipo: {torneio.tipo}</p>
        {/* Futuramente, aqui serão exibidas as partidas do torneio */}
        <Button text="Voltar" onClick={() => navigate(-1)} />
      </div>
      <h2>Partidas</h2>
      <table className="matches-table">
        <thead>
          <tr>
            <th>Time 1</th>
            <th>Time 2</th>
          </tr>
        </thead>
        <tbody>
            {console.log('Matches:', matches)} {/* Log matches for debugging */}
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{teams.find((team) => team.id === match.time1_id)?.nome}</td>
              <td>{teams.find((team) => team.id === match.time2_id)?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TorneioDetalhes;

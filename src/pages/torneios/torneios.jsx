import './torneios.less';
import React, { useEffect, useContext, useState } from 'react';
import { TorneiosContext } from '../../context/TorneiosProvider.jsx';
import { AuthContext } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button.jsx';
import Input from '../../components/Input/input.jsx';
import Modal from '../../components/modal/modal.jsx';
import CriarTorneio from '../criarTorneio/criarTorneio.jsx';
import { TimesContext } from '../../context/TimesProvider.jsx'; // Import TimesContext

const Torneios = () => {
  const { data, loadTorneios, editTorneio, addMatch } = useContext(TorneiosContext);
  const { user, setUser } = useContext(AuthContext);
  const { teams, loadAllTimes } = useContext(TimesContext); // Add teams context
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTorneio, setSelectedTorneio] = useState(null);
  const [matchData, setMatchData] = useState({ time1_id: '', time2_id: '' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const loadTeams = async () => {
    try {
      await loadAllTimes();
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

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
      loadTeams();
      console.log('Logged-in user details:', user); // Log all user details
    }
  }, [navigate, setUser]);

  useEffect(() => {
    console.log('Loaded tournaments data:', data); // Add a console log to verify if the data is being loaded by loadTorneios
  }, [loadTorneios]);

  useEffect(() => {
    loadAllTimes(); // Load teams when component mounts
  }, [loadAllTimes]);

  const handleViewDetails = (id) => {
    navigate(`/torneio/${id}`);
  };

  const handleEditTorneio = (torneio) => {
    console.log('Editing tournament:', torneio); // Log the tournament being edited
    setSelectedTorneio({ ...torneio }); // Create a copy of the tournament to edit
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    console.log('Saving changes for tournament:', selectedTorneio); // Log the tournament being saved
    const success = await editTorneio(selectedTorneio.id, selectedTorneio);
    if (success) {
      setIsModalOpen(false);
      const updatedData = data.map((torneio) =>
        torneio.id === selectedTorneio.id ? selectedTorneio : torneio
      );
      setData(updatedData); // Update the state to reflect changes
    }
  };

  const handleAddMatch = async () => {
    const matchPayload = {
      time1_id: matchData.time1_id,
      time2_id: matchData.time2_id,
      torneio_id: selectedTorneio.id, // Define torneio_id before calling addMatch
    };
    console.log('Adding match:', matchPayload); // Log the match data being added with torneio_id
    await addMatch(matchPayload);
    setMatchData({ time1_id: '', time2_id: '' });
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleTeamChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedTeams(selected);
  };

  return (
    <>
      <h1>Torneios</h1>
      <div className="torneios-list">
        {data.map((torneio) => (
          <div key={torneio.id} className="torneio-card">
            <>
              <h2>{torneio.nome}</h2>
              <p>Esporte: {torneio.esporte}</p>
              <p>Tipo: {torneio.tipo}</p>
              <Button text="Ver Detalhes" onClick={() => handleViewDetails(torneio.id)} />
              {JSON.parse(localStorage.getItem('CURRENT_USER'))?.id === torneio.criador_id && (
                <Button text="Editar Torneio" onClick={() => handleEditTorneio(torneio)} />
              )}
            </>
          </div>
        ))}
      </div>
      <Button text="Criar Torneio" onClick={handleOpenCreateModal} />

      {isCreateModalOpen && (
        <Modal onClose={handleCloseCreateModal}>
          <CriarTorneio onClose={handleCloseCreateModal} />
        </Modal>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Editar Torneio</h2>
          <Input
            type="text"
            id="nome"
            value={selectedTorneio?.nome || ''}
            onChange={(e) => setSelectedTorneio({ ...selectedTorneio, nome: e.target.value })}
          />
          <Input
            type="text"
            id="esporte"
            value={selectedTorneio?.esporte || ''}
            onChange={(e) => setSelectedTorneio({ ...selectedTorneio, esporte: e.target.value })}
          />
          <Input
            type="text"
            id="tipo"
            value={selectedTorneio?.tipo || ''}
            onChange={(e) => setSelectedTorneio({ ...selectedTorneio, tipo: e.target.value })}
          />
          <h3>Adicionar Partida</h3>
          <select
            id="time1_id"
            value={matchData.time1_id}
            onChange={(e) => setMatchData({ ...matchData, time1_id: e.target.value })}
          >
            <option value="">Selecione o Time 1</option>
            {teams && teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.nome}
              </option>
            ))}
          </select>
          <select
            id="time2_id"
            value={matchData.time2_id}
            onChange={(e) => setMatchData({ ...matchData, time2_id: e.target.value })}
          >
            <option value="">Selecione o Time 2</option>
            {teams && teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.nome}
              </option>
            ))}
          </select>
          <Button text="Adicionar Partida" onClick={handleAddMatch} />
          <Button text="Salvar Alterações" onClick={handleSaveChanges} />
        </Modal>
      )}
    </>
  );
};

export default Torneios;

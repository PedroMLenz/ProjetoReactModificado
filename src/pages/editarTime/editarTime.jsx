import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editarTime.less';
import Button from '../../components/Button/button.jsx';
import Input from '../../components/Input/input.jsx';
import { TimesContext } from '../../context/TimesProvider';

const EditarTime = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const navigate = useNavigate();
  const { data, loadTimes, editTime } = useContext(TimesContext);

  useEffect(() => {
    const loadTimeData = async () => {
      await loadTimes();
      const time = data.find((time) => time.id === parseInt(id));
      if (time) {
        setNome(time.nome);
        setDescricao(time.descricao);
        setInitialDataLoaded(true);
      }
    };
    if (!initialDataLoaded) {
      loadTimeData();
    }
  }, [id, loadTimes, data, initialDataLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await editTime(id, {
        nome,
        descricao,
      });

      if (success) {
        alert('Team updated successfully');
        navigate('/times');
      } else {
        alert('Failed to update team');
      }
    } catch (error) {
      console.error('Error updating team:', error);
      alert('An error occurred while updating the team');
    }
  };

  return (
    <div className="editar-time-page">
      <div className="editar-time-container">
        <h1>Editar Time</h1>
        <form onSubmit={handleSubmit} className='editar-time-form'>
          <Input
            type="text"
            id="Nome do time"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ariaLabel="Digite o nome do time"
            ariaRequired="true"
          />
          <Input
            type="text"
            id="Descrição do time"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            ariaLabel="Digite a descrição do time"
            ariaRequired="true"
          />
          <Button text="Salvar Alterações" />
        </form>
      </div>
    </div>
  );
};

export default EditarTime;

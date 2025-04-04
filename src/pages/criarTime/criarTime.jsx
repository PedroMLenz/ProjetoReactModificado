import React, { useState, useContext } from 'react';
import Button from '../../components/Button/button.jsx';
import Input from '../../components/Input/input.jsx';
import { TimesContext } from '../../context/TimesProvider.jsx';

const CriarTime = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const { createTime } = useContext(TimesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form with data:', { nome, descricao });
      const success = await createTime({
        nome,
        descricao,
      });

      if (success) {
        alert('Team created successfully');
        onClose();
      } else {
        alert('Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('An error occurred while creating the team');
    }
  };

  return (
    <div className="criar-time-page">
      <div className="criar-time-container">
        <h1>Criar Time</h1>
        <form onSubmit={handleSubmit} className='criar-time-form'>
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
          <Button text="Criar Time" />
        </form>
      </div>
    </div>
  );
};

export default CriarTime;

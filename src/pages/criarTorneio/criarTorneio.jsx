import React, { useState, useContext } from 'react';
import Button from '../../components/Button/button.jsx';
import Input from '../../components/Input/input.jsx';
import { TorneiosContext } from '../../context/TorneiosProvider';

const CriarTorneio = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [esporte, setEsporte] = useState('');
  const [tipo, setTipo] = useState('');
  const { createTorneio } = useContext(TorneiosContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await createTorneio({
        nome,
        esporte,
        tipo,
      });

      if (success) {
        alert('Torneio criado com sucesso');
        onClose();
      } else {
        alert('Falha ao criar torneio');
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('An error occurred while creating the tournament');
    }
  };

  return (
    <div className="criar-torneio-page">
      <div className="criar-torneio-container">
        <h1>Criar Torneio</h1>
        <form onSubmit={handleSubmit} className='criar-torneio-form'>
          <Input
            type="text"
            id="Nome do torneio"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ariaLabel="Digite o nome do torneio"
            ariaRequired="true"
          />
          <Input
            type="text"
            id="Esporte do torneio"
            value={esporte}
            onChange={(e) => setEsporte(e.target.value)}
            ariaLabel="Digite o esporte do torneio"
            ariaRequired="true"
          />
          <Input
            type="text"
            id="Tipo do torneio"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            ariaLabel="Digite o tipo do torneio"
            ariaRequired="true"
          />
          <Button text="Criar Torneio" />
        </form>
      </div>
    </div>
  );
};

export default CriarTorneio;

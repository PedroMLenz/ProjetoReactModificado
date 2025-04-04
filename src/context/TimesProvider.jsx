/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import axiosClient from '../utils/axios-client';
import { AuthContext } from './authContext';

const API_URL = import.meta.env.VITE_API_URL;

export const TimesContext = createContext({
  teams: [],
  loadTimes: () => {},
  setData: () => {},
  editTime: () => {},
  deleteTime: () => {},
  createTime: () => {},
  loadAllTimes: () => {},
});

const TimesProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const { user } = useContext(AuthContext);

  const loadTimes = async () => {    
    if (!user || !user.token) return;
    
    const url = `${API_URL}/times-capitao`;
  
    try {
      const response = await axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const _data = response.data?.data; // Obtém os dados da resposta
      console.log('Loaded teams data:', _data);
  
      if (!_data) throw new Error("Erro ao carregar Times!!");
  
        if (JSON.stringify(_data) !== JSON.stringify(teams)) {
        setTeams(_data);
      }
    } catch (error) {
      console.error('Error loading teams:', error);
      alert('Erro ao carregar Times! Verifique se o endpoint está correto.');
    }
  };

  const loadAllTimes = async () => {
    if (!user || !user.token) return; // Verifica se o usuário e o token estão disponíveis
    
    const url = `${API_URL}/times`;
  
    try {
      const response = await axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      const _data = response.data?.data; // Obtém os dados da resposta
      console.log('Loaded teams data:', _data);
      console.log('teste testando');
  
      if (!_data) throw new Error("Erro ao carregar Times!!");
  
      Array.isArray(_data) && _data.reverse(); // Inverte a ordem dos times, se for um array
  
      // Verifica se os dados mudaram antes de atualizar o estado
      if (JSON.stringify(_data) !== JSON.stringify(teams)) {
        setTeams(_data); // Atualiza os times somente se houve mudanças
      }
    } catch (error) {
      console.error('Error loading teams:', error); // Loga o erro no console
      alert('Erro ao carregar Times! Verifique se o endpoint está correto.'); // Exibe um alerta ao usuário
    }
  };

  const editTime = async (id, data) => {
    if (!user || !user.token) return;
    const url = `${API_URL}/times/${id}`;
    try {
      const payload = {
        nome: data.nome,
        descricao: data.descricao,
      };
      console.log('Updating data at URL:', url); // Log da URL completa
      console.log('Updating data:', payload); // Log dos dados enviados
      const response = await axiosClient.put(url, payload);

      if (response.status === 200) {
        const updatedTeam = response.data;
        setTeams((prevData) => {
          if (!Array.isArray(prevData)) {
            return prevData;
          }
          return prevData.map((time) =>
            time.id === parseInt(id) ? { ...time, ...updatedTeam } : time
          );
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error updating team:', error);
      return false;
    }
  };

  const deleteTime = async (id) => {
    if (!user || !user.token) return;
    const url = `${API_URL}/times/${id}`;
    try {
      console.log('Deleting data from URL:', url); // Log da URL completa
      const response = await axiosClient.delete(url);

      if (response.status === 200) {
        setTeams((prevData) => prevData.filter((time) => time.id !== id));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      return false;
    }
  };

  const createTime = async (team) => {
    if (!user || !user.token) {
      console.error('User or token not available');
      return;
    }
    const url = `${API_URL}/times`;
    try {
      console.log('Sending POST request to:', url); // Log the URL
      console.log('Team data:', team); // Log the team data
      const response = await axiosClient.post(url, team, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 201) {
        console.log('Team created successfully:', response.data); // Log the response data
        setTeams((prevData) => [...prevData, response.data]);
        return true;
      } else {
        console.error('Failed to create team, status code:', response.status); // Log the status code
        return false;
      }
    } catch (error) {
      console.error('Error creating team:', error);
      return false;
    }
  };

  return (
    <TimesContext.Provider
      value={{
        teams,
        loadTimes,
        loadAllTimes,
        setTeams,
        editTime,
        deleteTime,
        createTime,
      }}
    >
      {children}
    </TimesContext.Provider>
  );
};

export default TimesProvider;
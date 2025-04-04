import { createContext, useState, useContext } from "react";
import axiosClient from '../utils/axios-client';
import { AuthContext } from './authContext';

const API_URL = import.meta.env.VITE_API_URL;

export const TorneiosContext = createContext({
  data: null,
  loadTorneios: () => {},
  setData: () => {},
  createTorneio: () => {},
  editTorneio: () => {},
  addMatch: () => {},
});

const TorneiosProvider = ({ children }) => {
  const [data, setData] = useState([]);
const { user } = useContext(AuthContext);

const loadTorneios = async () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const user = JSON.parse(localStorage.getItem('CURRENT_USER'));

  if (!user || !token) return;

  const url = `${API_URL}/torneios`;

  try {
    const response = await axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Erro ao carregar Torneios!!");
    }

    const newData = response.data?.data;
    console.log('Loaded tournaments:', newData); // Log loaded tournaments

    // Verifica se os dados mudaram antes de atualizar o estado
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      setData(Array.isArray(newData) ? newData : []);
    }
  } catch (error) {
    console.error('Error loading tournaments:', error); // Log error
    alert('Erro ao carregar Torneios! Verifique se o endpoint está correto.'); // Show alert to user
  }
};


  const createTorneio = async (data) => {
    if (!user || !user.token) return;
    const url = `${API_URL}/torneios`;
    try {
      const payload = {
        nome: data.nome,
        esporte: data.esporte,
        tipo: data.tipo,
      };
      console.log('Sending data to URL:', url); // Log da URL completa
      console.log('Sending data:', payload); // Log dos dados enviados
      const response = await axiosClient.post(url, payload);

      const responseData = response.data;
      console.log('Response data:', responseData); // Log da resposta do servidor

      if (response.status === 200) {
        setData((prevData) => [...prevData, responseData]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      return false;
    }
  };

  const editTorneio = async (id, torneioData) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) return;

    const url = `${API_URL}/torneios/${id}`;
    try {
      const response = await axiosClient.put(url, torneioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedTorneio = response.data;
        setData((prevData) =>
          prevData.map((torneio) =>
            torneio.id === id ? { ...torneio, ...updatedTorneio } : torneio
          )
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error editing tournament:', error);
      return false;
    }
  };

  const addMatch = async (matchData) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) return;

    const url = `${API_URL}/partidas`;
    try {
      // Ensure matchData includes all required fields
      if (!matchData.time1_id || !matchData.time2_id || !matchData.torneio_id) {
        throw new Error('Missing required fields in matchData');
      }

      const response = await axiosClient.post(url, matchData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        console.log('Match added successfully:', response.data);
        return true;
      } else {
        console.error('Error adding match:', response.data); // Log error response data
        return false;
      }
    } catch (error) {
      console.error('Error adding match:', error.response?.data || error.message); // Log detailed error
      return false;
    }
  };

  return (
    <TorneiosContext.Provider
      value={{
        data,
        loadTorneios,
        setData,
        createTorneio,
        editTorneio,
        addMatch,
      }}
    >
      {children}
    </TorneiosContext.Provider>
  );
};

export default TorneiosProvider;

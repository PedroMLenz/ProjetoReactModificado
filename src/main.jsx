import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.less';
import Home from './pages/home/home.jsx';
import Times from './pages/times/times.jsx';
import Perfil from './pages/perfil/perfil.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Guest from './layouts/guest.jsx';
import { AuthProvider } from './context/authContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import TimesProvider from './context/TimesProvider.jsx';
import EditarTime from './pages/editarTime/editarTime.jsx';
import CriarTorneio from './pages/criarTorneio/criarTorneio.jsx';
import TorneiosProvider from './context/TorneiosProvider.jsx';
import Torneios from './pages/torneios/torneios.jsx';
import TorneioDetalhes from './pages/torneioDetalhes/torneioDetalhes.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Guest />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="times" element={<Times />} />
      <Route path="editar-Time/:id" element={<EditarTime />} />
      <Route path="criar-Torneio" element={<CriarTorneio />} />
      <Route path="torneios" element={<Torneios />} />
      <Route path="torneio/:id" element={<TorneioDetalhes />} />
      <Route path="perfil" element={<Perfil />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <TimesProvider>
        <TorneiosProvider>
          <RouterProvider router={router} />
        </TorneiosProvider>
      </TimesProvider>
    </AuthProvider>
  // </StrictMode>
);
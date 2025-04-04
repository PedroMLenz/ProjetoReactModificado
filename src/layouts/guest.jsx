import '../styles/guest.less';
import Header from '../components/header/header.jsx';
import { Outlet, useLocation } from 'react-router-dom';

function Guest() {
  const location = useLocation();
  
  // Defina a rota de login e home para condicionalmente ocultar o Header e mudar o className do main
  const isLoginPage = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      <div className="full-height">
        <div className="teste">
          <Header />
          <main className={isLoginPage ? 'guest_login' : 'guest_main'}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Guest;

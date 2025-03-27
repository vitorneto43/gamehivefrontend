import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Remove o token e limpa o context
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/">GameHive 🚀</Link>
      </h1>

      <div className={styles.buttonsContainer}>
        {(!auth || !auth.token) ? (
          <>
            <Link to="/login" className={styles.navButton}>Login</Link>
            <Link to="/register" className={styles.navButton}>Cadastro</Link>
          </>
        ) : (
          <>
            <Link to="/minhas-compras" className={styles.navButton}>
              Minhas Compras
            </Link>

            <button
              onClick={() => navigate('/dashboard')}
              className={styles.uploadButton}
            >
              Carregar Jogo
            </button>

            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;





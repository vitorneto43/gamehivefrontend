import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>GameHive 🚀</h2>

      <ul className={styles.links}>
        <li><Link to="/faq">Perguntas Frequentes</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/contato">Contate-nos</Link></li>
        <li><Link to="/diretorio">Diretório</Link></li>
        <li><Link to="/termos">Termos</Link></li>
        <li><Link to="/privacidade">Privacidade</Link></li>
        <li><Link to="/cookies">Cookies</Link></li>
      </ul>

      <p className={styles.copy}>
        &copy; 2025 GameHive. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;

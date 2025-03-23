import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './LoginForm.module.css';

function LoginForm() {
  const { login } = useContext(AuthContext); // Usa o contexto de autenticação
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://game-hive.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); // Chama o contexto para armazenar o token

        alert('Login realizado com sucesso!');
        navigate('/dashboard'); // Redireciona para o dashboard
      } else {
        alert(data.error || 'Erro no login');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Erro no login!');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <p className={styles.linkText}>
          Não tem conta?{' '}
          <a href="/register" className={styles.link}>
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;


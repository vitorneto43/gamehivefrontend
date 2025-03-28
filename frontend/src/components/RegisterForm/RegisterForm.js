import React, { useState } from 'react';
import styles from './RegisterForm.module.css'; // Importando o CSS corretamente

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Cadastro feito com sucesso!');
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error('Erro ao registrar:', err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2 className={styles.title}>Cadastro</h2>

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Cadastrar</button>

        <p className={styles.linkText}>
          Já tem uma conta?{' '}
          <a href="/login" className={styles.link}>Fazer login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;


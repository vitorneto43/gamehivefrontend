import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './MinhasCompras.module.css';

const API_URL = 'https://game-hive.onrender.com';

function MinhasCompras() {
  const { auth } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;

    const fetchCompras = async () => {
      try {
        const res = await fetch(`${API_URL}/purchases/me`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const data = await res.json();
        setCompras(data);
      } catch (err) {
        console.error('Erro ao buscar compras:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [auth]);

  return (
    <div className={styles.container}>
      <h2>Minhas Compras 🎮</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : compras.length === 0 ? (
        <p>Você ainda não comprou nenhum jogo.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Jogo</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={compra.game.imageUrl}
                    alt={compra.game.title}
                    style={{ width: '80px' }}
                  />
                </td>
                <td>{compra.game.title}</td>
                <td>{new Date(compra.purchaseDate).toLocaleDateString()}</td>
                <td>R$ {compra.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MinhasCompras;

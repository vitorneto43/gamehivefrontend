import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './MinhasCompras.module.css';

const API_URL = 'https://game-hive.onrender.com';

function MinhasCompras() {
  const { auth } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const res = await fetch(`${API_URL}/purchases/me`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });

        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setCompras(data);
      } catch (err) {
        console.error('❌ Erro ao buscar compras:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) fetchCompras();
  }, [auth]);

  return (
    <div className={styles.container}>
      <h2>🛒 Minhas Compras</h2>

      {loading ? (
        <p className={styles.loading}>🔄 Carregando suas compras...</p>
      ) : compras.length === 0 ? (
        <p>Você ainda não comprou nenhum jogo.</p>
      ) : (
        <div className={styles.lista}>
          {compras.map((compra, index) => (
            <div key={index} className={styles.card}>
              <img
                src={compra.game.imageUrl}
                alt={compra.game.title}
                className={styles.image}
                onError={(e) => (e.target.src = '/fallback.jpg')}
              />
              <div className={styles.info}>
                <h3>{compra.game.title}</h3>
                <p>{compra.game.description}</p>
                <p><strong>Valor:</strong> R$ {compra.amount.toFixed(2)}</p>
                <p><strong>Data:</strong> {new Date(compra.purchaseDate).toLocaleDateString()}</p>
                <a
                  href={compra.game.gameFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className={styles.downloadButton}
                >
                  ⬇️ Baixar Jogo
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MinhasCompras;



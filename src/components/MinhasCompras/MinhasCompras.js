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
        <p>🔄 Carregando suas compras...</p>
      ) : compras.length === 0 ? (
        <p>Você ainda não comprou nenhum jogo.</p>
      ) : (
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={compra.game.imageUrl}
                    alt={compra.game.title}
                    className={styles.thumb}
                    onError={(e) => (e.target.src = '/fallback.jpg')}
                  />
                </td>
                <td>{compra.game.title}</td>
                <td>{compra.game.description}</td>
                <td>R$ {compra.amount.toFixed(2)}</td>
                <td>{new Date(compra.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <a
                    href={compra.game.gameFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={styles.downloadBtn}
                  >
                    ⬇️ Baixar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MinhasCompras;




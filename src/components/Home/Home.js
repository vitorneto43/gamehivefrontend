import React, { useEffect, useState } from 'react';
import styles from '../../App.module.css';

function Home({ refreshTrigger }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://game-hive.onrender.com/games');
      if (!res.ok) throw new Error('Erro ao buscar jogos da vitrine');

      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [refreshTrigger]);

  const handleBuy = async (gameId) => {
    try {
      const res = await fetch('https://game-hive.onrender.com/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${auth.token}` (se precisar)
        },
        body: JSON.stringify({ gameId }),
      });

      const data = await res.json();
      console.log(data); // Debug pra saber se veio a URL

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Erro ao criar sessão de pagamento');
      }
    } catch (err) {
      console.error('Erro ao iniciar compra:', err);
      alert('Erro ao iniciar compra');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Vitrine de Games 🎮</h2>

        {loading ? (
          <p>Carregando jogos...</p>
        ) : (
          <div className={styles.grid}>
            {games.length === 0 ? (
              <p>🚀 Nenhum jogo publicado ainda!</p>
            ) : (
              games.map((game) => (
                <div key={game._id} className={styles.card}>
                  <img
                    src={`https://game-hive.onrender.com${game.imageUrl}`}
                    alt={game.title}
                    className={styles.image}
                  />
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <p>R$ {game.price}</p>

                  <button onClick={() => handleBuy(game._id)} className={styles.button}>
                    Jogar
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;


export default Home;



import React, { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard';
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
  }, [refreshTrigger]); // Atualiza sempre que refreshTrigger muda

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
                <GameCard
                  key={game._id}
                  title={game.title}
                  description={game.description}
                  image={`http://localhost:5000${game.imageUrl}`}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;



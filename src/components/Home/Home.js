import React, { useEffect, useState, useContext } from 'react';
import GameCard from '../GameCard/GameCard';
import { AuthContext } from '../../context/AuthContext';
import styles from './Home.module.css';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  const fetchGames = async () => {
    try {
      const res = await fetch('https://game-hive-1.onrender.com/games');
      if (!res.ok) throw new Error('Erro ao buscar jogos');

      const data = await res.json();
      console.log('Games recebidos da API:', data); // 👈 Verifica se veio algo aqui
      setGames(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vitrine de Games 🎮</h2>

      {loading ? (
        <p>Carregando jogos...</p>
      ) : (
        <div className={styles.grid}>
          {games.length === 0 ? (
            <p>🚀 Nenhum jogo publicado ainda!</p>
          ) : (
            games.map((game) => (
              <GameCard key={game._id} game={game} auth={auth} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;






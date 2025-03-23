import React, { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard';

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

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <main className="max-w-6xl mx-auto">
        <h2 className="text-center text-purple-500 text-4xl font-bold mb-10">
          🎮 Vitrine de Games
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Carregando jogos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {games.length === 0 ? (
              <p className="text-center text-white">🚀 Nenhum jogo publicado ainda!</p>
            ) : (
              games.map((game) => (
                <GameCard
                  key={game._id}
                  title={game.title}
                  description={game.description}
                  image={`https://game-hive.onrender.com${game.imageUrl}`}
                  onBuy={() => console.log('Comprar game', game._id)}
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






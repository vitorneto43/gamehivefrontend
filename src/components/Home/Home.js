import React, { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard';
import { toast } from 'react-toastify';

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
      toast.error('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async (gameId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Você precisa estar logado para comprar!');
      return;
    }

    try {
      const res = await fetch('https://game-hive.onrender.com/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Erro ao redirecionar para o checkout!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro ao iniciar compra!');
    }
  };

  useEffect(() => {
    fetchGames();
  }, [refreshTrigger]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-500 mb-10">
          Vitrine de Games 🎮
        </h2>

        {loading ? (
          <p className="text-center text-gray-300">Carregando jogos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {games.length === 0 ? (
              <p className="text-center text-white">
                🚀 Nenhum jogo publicado ainda!
              </p>
            ) : (
              games.map((game) => (
                <GameCard
                  key={game._id}
                  title={game.title}
                  description={game.description}
                  image={`https://game-hive.onrender.com${game.imageUrl}`}
                  onPlay={() => handlePlay(game._id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;






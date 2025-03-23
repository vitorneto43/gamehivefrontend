import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UploadGameForm from '../UploadGameForm/UploadGameForm';
import EditGameForm from '../EditGameForm/EditGameForm';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { auth } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const fetchGames = async () => {
    if (!auth?.token) return;

    try {
      const res = await fetch('https://game-hive.onrender.com/games/me', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      if (!res.ok) throw new Error('Erro ao buscar jogos');

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
  }, [auth]);

  // Função para excluir um jogo
  const handleDeleteGame = async (gameId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este jogo?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://game-hive.onrender.com/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao excluir o jogo');
      }

      alert('✅ Jogo excluído com sucesso!');
      fetchGames(); // Atualiza a lista após excluir
    } catch (err) {
      console.error(err);
      alert('❌ Erro ao excluir o jogo!');
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Painel do Desenvolvedor 🎮</h2>

      <button onClick={() => setShowUploadForm(true)} className={styles.uploadButton}>
        Enviar Novo Jogo
      </button>

      {showUploadForm && (
        <UploadGameForm
          auth={auth}
          onClose={() => setShowUploadForm(false)}
          onUploaded={fetchGames}
        />
      )}

      {editingGame && (
        <EditGameForm
          auth={auth}
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onUpdated={fetchGames}
        />
      )}

      {loading ? (
        <p>Carregando dados...</p>
      ) : games.length === 0 ? (
        <p>Você ainda não publicou nenhum jogo.</p>
      ) : (
        <>
          <h3>Seus Jogos Publicados</h3>
          <table className={styles.gameTable}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Jogo</th>
                <th>Preço</th>
                <th>Vendas</th>
                <th>Receita Bruta</th>
                <th>Receita Líquida</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game._id}>
                  <td>
                    <img
                      src={`https://game-hive.onrender.com${game.imageUrl}`}
                      alt={game.title}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>{game.title}</td>
                  <td>R$ {game.price.toFixed(2)}</td>
                  <td>{game.sales || 0}</td>
                  <td>R$ {(game.price * (game.sales || 0)).toFixed(2)}</td>
                  <td>R$ {(game.price * (game.sales || 0) * 0.9).toFixed(2)}</td>
                  <td>
                    <button onClick={() => setEditingGame(game)}>✏️ Editar</button>
                    <button onClick={() => handleDeleteGame(game._id)}>🗑️ Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Dashboard;










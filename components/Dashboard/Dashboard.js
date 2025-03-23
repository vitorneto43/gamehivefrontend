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

  // ✅ Buscar os jogos do usuário logado
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

  // ✅ Onboarding Stripe (Criar conta Connect)
  const handleStripeOnboarding = async () => {
    if (!auth?.token) {
      alert('Você precisa estar logado!');
      return;
    }

    try {
      const res = await fetch('https://game-hive.onrender.com/create-connected-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        // body opcional, caso precise enviar email, username etc.
        body: JSON.stringify({ email: auth.email }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erro ao iniciar cadastro no Stripe Connect!');
      }

    } catch (err) {
      console.error(err);
      alert('Erro ao iniciar cadastro no Stripe Connect!');
    }
  };

  useEffect(() => {
    fetchGames();
  }, [auth]);

  return (
    <div className={styles.dashboardContainer}>
      <h2>Painel do Desenvolvedor 🎮</h2>

      {/* ✅ Botão de Onboarding Stripe */}
      <button
        onClick={handleStripeOnboarding}
        className={styles.uploadButton}
      >
        Cadastrar Conta Stripe para Receber Pagamentos
      </button>

      <button
        onClick={() => setShowUploadForm(true)}
        className={styles.uploadButton}
      >
        Enviar Novo Jogo
      </button>

      {/* Formulário de Upload de Jogo */}
      {showUploadForm && (
        <UploadGameForm
          auth={auth}
          onClose={() => setShowUploadForm(false)}
          onUploaded={fetchGames}
        />
      )}

      {/* Formulário de Edição de Jogo */}
      {editingGame && (
        <EditGameForm
          auth={auth}
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onUpdated={fetchGames}
        />
      )}

      {/* Renderizando a tabela de jogos */}
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
                    <button
                      onClick={() => setEditingGame(game)}
                      className={styles.editButton}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => console.log(`Excluir ${game._id}`)}
                      className={styles.deleteButton}
                    >
                      Excluir
                    </button>
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










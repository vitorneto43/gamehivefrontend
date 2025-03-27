import React from 'react';
import styles from './GameCard.module.css';

const API_URL = 'https://game-hive.onrender.com';

function GameCard({ game, auth }) {
  if (!game) {
    console.warn('⚠️ Game inválido:', game);
    return <p>Erro ao carregar jogo.</p>;
  }

  const handleBuy = async () => {
    if (!auth?.token) {
      alert('⚠️ Você precisa estar logado para comprar!');
      return;
    }

    console.log('🛒 Iniciando compra (PagSeguro) para o jogo:', game.title, 'ID:', game._id);

    try {
      const res = await fetch(`${API_URL}/pagseguro/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ gameId: game._id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao criar sessão no PagSeguro');
      }

      const data = await res.json();
      console.log('✅ URL de pagamento PagSeguro:', data.url);

      window.location.href = data.url; // Redireciona para o PagSeguro

    } catch (err) {
      console.error('❌ Erro ao iniciar o pagamento com PagSeguro:', err);
      alert(err.message || 'Erro ao iniciar o pagamento!');
    }
  };

  const imageUrl = game.imageUrl?.startsWith('http')
    ? game.imageUrl
    : `${API_URL}${game.imageUrl}`;

  return (
    <div className={styles.card}>
      {game.imageUrl ? (
        <img
          src={imageUrl}
          alt={game.title}
          className={styles.cardImage}
        />
      ) : (
        <p>Sem imagem disponível</p>
      )}

      <h3 className={styles.cardTitle}>{game.title}</h3>
      <p className={styles.cardDescription}>{game.description}</p>
      <p className={styles.cardPrice}>R$ {game.price.toFixed(2)}</p>

      <button onClick={handleBuy} className={styles.cardButton}>
        Comprar com PagSeguro
      </button>
    </div>
  );
}

export default GameCard;









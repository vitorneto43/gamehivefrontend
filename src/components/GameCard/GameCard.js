import React from 'react';
import styles from './GameCard.module.css';

function GameCard({ game, auth }) {
  if (!game) {
    console.log('Game inválido:', game);
    return <p>Erro ao carregar jogo.</p>;
  }

  const handleBuy = async () => {
    if (!auth?.token) {
      alert('Você precisa estar logado para comprar!');
      return;
    }

    try {
      const res = await fetch('https://game-hive.onrender.com/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ gameId: game._id }),
      });

      if (!res.ok) {
        throw new Error('Erro ao criar sessão de pagamento');
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert('Erro ao iniciar o pagamento!');
    }
  };

  return (
    <div className={styles.card}>
      {game.imageUrl && (
        <img
          src={`https://game-hive.onrender.com${game.imageUrl}`}
          alt={game.title}
          className={styles.cardImage}
        />
      )}

      <h3 className={styles.cardTitle}>{game.title}</h3>
      <p className={styles.cardDescription}>{game.description}</p>
      <p className={styles.cardPrice}>R$ {game.price.toFixed(2)}</p>

      <button onClick={handleBuy} className={styles.cardButton}>
        Jogar / Comprar
      </button>
    </div>
  );
}

export default GameCard;







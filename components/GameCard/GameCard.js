import React, { useContext } from 'react';
import styles from './GameCard.module.css';
import { AuthContext } from '../../context/AuthContext';

function GameCard({ game }) {
  const { auth } = useContext(AuthContext); // Pega o token do usuário logado!

  const handleBuy = async () => {
    if (!auth?.token) {
      alert('Você precisa estar logado para comprar!');
      return;
    }

    try {
      const res = await fetch('https://game-hive.onrender.com/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          gameId: game._id,
          developerStripeAccountId: game.developerStripeAccountId, // Deve vir do backend!
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redireciona para o Stripe Checkout
      } else {
        alert('Erro ao iniciar o pagamento.');
      }

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao criar a sessão de pagamento');
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={`https://game-hive.onrender.com${game.imageUrl}`}
        alt={game.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{game.title}</h3>
        <p className={styles.description}>{game.description}</p>
        <p className={styles.price}>R$ {game.price.toFixed(2)}</p>

        <button onClick={handleBuy} className={styles.button}>
          Jogar / Comprar 🎮
        </button>
      </div>
    </div>
  );
}

export default GameCard;

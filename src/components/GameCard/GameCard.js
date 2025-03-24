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

    console.log('🛒 Iniciando compra para o jogo:', game.title, 'ID:', game._id);

    try {
      const res = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ gameId: game._id }),
      });

      console.log('📡 Resposta bruta:', res);

      // Se a resposta não for 200 OK
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch (parseError) {
          console.error('❌ Erro ao parsear JSON do erro:', parseError);
        }
        console.error('❌ Erro da API:', errorData);
        throw new Error(errorData.error || 'Erro ao criar sessão de pagamento');
      }

      const data = await res.json();
      console.log('✅ Sessão criada! Redirecionando para:', data.url);

      // Redireciona para o Stripe Checkout
      window.location.href = data.url;

    } catch (err) {
      console.error('❌ Erro ao iniciar o pagamento:', err);
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
        Jogar / Comprar
      </button>
    </div>
  );
}

export default GameCard;








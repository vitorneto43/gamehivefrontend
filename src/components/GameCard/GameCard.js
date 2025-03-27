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
  
    const cpf = prompt('Digite seu CPF (somente números) para gerar a cobrança:');
    if (!cpf) {
      alert('CPF obrigatório!');
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/asaas/cobrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          name: auth.username || 'Usuário GameHive',
          email: auth.email,
          cpf,
          value: game.price,
          description: game.title,
        }),
      });
  
      const data = await res.json();
  
      if (data.link) {
        console.log('🔗 Link da cobrança Asaas:', data.link);
        window.location.href = data.link;
      } else {
        alert('Erro ao gerar link de pagamento!');
      }
    } catch (err) {
      console.error('❌ Erro ao criar cobrança Asaas:', err);
      alert('Erro ao iniciar pagamento!');
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
        Comprar com Asaas
      </button>

    </div>
  );
}

export default GameCard;









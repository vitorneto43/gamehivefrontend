import React from 'react';
import styles from './GameCard.module.css';

function GameCard({ title, description, image, onPlayClick }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <button onClick={onPlayClick} className={styles.button}>
          Jogar Agora 🎮
        </button>
      </div>
    </div>
  );
}

export default GameCard;





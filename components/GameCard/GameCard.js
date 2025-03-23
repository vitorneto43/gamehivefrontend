import React from 'react';
import styles from './GameCard.module.css';

function GameCard({ title, description, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className={styles.playButton}>Jogar</button>
      </div>
    </div>
  );
}

export default GameCard;

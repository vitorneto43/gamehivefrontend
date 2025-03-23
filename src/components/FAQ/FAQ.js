import React from 'react';
import styles from './FAQ.module.css';

function FAQ() {
  return (
    <div className={styles.container}>
      <h1>Perguntas Frequentes ❓</h1>

      <div className={styles.question}>
        <h3>🕹️ Como faço para vender meus jogos?</h3>
        <p>Crie uma conta de desenvolvedor, acesse seu painel e faça o upload do seu jogo diretamente no dashboard.</p>
      </div>

      <div className={styles.question}>
        <h3>💰 Como recebo pelos jogos vendidos?</h3>
        <p>Os pagamentos são processados através do Stripe. Após a venda, o valor (descontando a comissão de 10%) é liberado diretamente para sua conta Stripe.</p>
      </div>

      <div className={styles.question}>
        <h3>🔒 O GameHive é seguro para compras?</h3>
        <p>Sim! Utilizamos o Stripe para pagamentos e protegemos seus dados com criptografia e protocolos de segurança avançados.</p>
      </div>

      <div className={styles.question}>
        <h3>👾 Qual é a comissão do GameHive sobre os jogos vendidos?</h3>
        <p>A comissão padrão é de 10% sobre cada venda realizada.</p>
      </div>

      <div className={styles.question}>
        <h3>📦 Preciso pagar para publicar meus jogos?</h3>
        <p>Não! A publicação de jogos na plataforma é gratuita. Você só paga a comissão sobre as vendas efetuadas.</p>
      </div>

      <div className={styles.question}>
        <h3>📞 Como entro em contato com o suporte?</h3>
        <p>Entre em contato através da nossa <a href="/contato">página de contato</a> ou envie um email para suporte@gamehive.com.</p>
      </div>

    </div>
  );
}

export default FAQ;

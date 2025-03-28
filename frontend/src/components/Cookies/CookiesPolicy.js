import React, { useState } from 'react';

const CookiesPolicy = () => {
  const [accepted, setAccepted] = useState(false);

  const acceptCookies = () => {
    setAccepted(true);
    alert('Você aceitou nossa política de cookies!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Política de Cookies 🍪</h2>
      <p>Usamos cookies para melhorar sua experiência na plataforma.</p>
      {!accepted && <button onClick={acceptCookies}>Aceitar Cookies</button>}
    </div>
  );
};

export default CookiesPolicy;

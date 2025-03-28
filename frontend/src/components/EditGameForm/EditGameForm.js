import React, { useState } from 'react';

function EditGameForm({ game, auth, onClose, onUpdated }) {
  const [title, setTitle] = useState(game.title);
  const [price, setPrice] = useState(game.price);
  const [description, setDescription] = useState(game.description);
  const [image, setImage] = useState(null);
  const [gameFile, setGameFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (gameFile) formData.append('gameFile', gameFile);

    console.log('📤 Enviando dados do form:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const res = await fetch(`https://game-hive.onrender.com/games/${game._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      const text = await res.text();

      if (res.ok) {
        const data = JSON.parse(text);
        alert(data.message || 'Jogo atualizado com sucesso!');
        onUpdated();
        onClose();
      } else {
        console.error('❌ Erro ao atualizar:', text);
        alert('Erro ao atualizar o jogo. Veja o console.');
      }
    } catch (err) {
      console.error('❌ Erro ao editar jogo:', err);
      alert('Erro ao editar jogo. Veja o console.');
    }
  };

  return (
    <div
      style={{
        background: '#222',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        margin: '40px auto',
        color: '#fff',
      }}
    >
      <h2 style={{ color: '#8e44ad', textAlign: 'center' }}>Editando: {game.title}</h2>

      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Preço (R$)</label>
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Descrição</label>
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ ...inputStyle, resize: 'vertical', height: '80px' }}
        />

        <label>Imagem do Jogo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={inputStyle}
        />

        <label>Arquivo do Jogo (exe/zip/rar):</label>
        <input
          type="file"
          accept=".zip,.rar,.exe"
          onChange={(e) => setGameFile(e.target.files[0])}
          style={inputStyle}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            type="submit"
            style={{ ...buttonStyle, backgroundColor: '#8e44ad' }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ ...buttonStyle, backgroundColor: '#666' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  backgroundColor: '#333',
  color: '#fff',
  border: '1px solid #444',
};

const buttonStyle = {
  padding: '10px 20px',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default EditGameForm;



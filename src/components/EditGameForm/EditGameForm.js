import React, { useState } from 'react';

function EditGameForm({ game, auth, onClose, onUpdated }) {
  const [title, setTitle] = useState(game.title);
  const [price, setPrice] = useState(game.price);
  const [description, setDescription] = useState(game.description);
  const [image, setImage] = useState(null);
  const [gameFile, setGameFile] = useState(null); // NOVO ESTADO para o executável

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);

    if (image) formData.append('image', image); // só se trocar a imagem
    if (gameFile) formData.append('gameFile', gameFile); // só se enviar o executável novo

    try {
      const res = await fetch(`https://game-hive-1.onrender.com/games/${game._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        body: formData
      });

      const data = await res.json();
      alert(data.message);

      onUpdated(); // Atualiza a lista
      onClose();   // Fecha o form
    } catch (err) {
      console.error('Erro ao editar jogo:', err);
    }
  };

  return (
    <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
      <h2>Editando: {game.title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        {/* Upload da imagem */}
        <label style={{ color: '#fff' }}>Imagem do jogo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />

        {/* Upload do executável ou arquivo zipado */}
        <label style={{ color: '#fff' }}>Arquivo do jogo (exe/zip/rar):</label>
        <input
          type="file"
          accept=".zip,.rar,.exe"
          onChange={(e) => setGameFile(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditGameForm;


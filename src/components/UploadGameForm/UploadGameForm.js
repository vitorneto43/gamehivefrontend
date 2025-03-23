import React, { useState } from 'react';

function UploadGameForm({ auth, onClose, onUploaded }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [gameFile, setGameFile] = useState(null);

  console.log('🔑 Token disponível no form:', auth?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!auth || !auth.token) {
      alert('Token de autenticação não encontrado!');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    if (imageFile) formData.append('image', imageFile);        // 🔑 Exatamente como no backend!
    if (gameFile) formData.append('gameFile', gameFile);        // 🔑 Exatamente como no backend!
  
    // ✅ Inspeciona o que vai ser enviado
    console.log('➡️ Conteúdo do formData:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const res = await fetch('https://game-hive-1.onrender.com/games/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`, // ✅ Apenas o token vai no header!
        },
        body: formData, // ✅ Nunca coloque 'Content-Type' no header com FormData!
      });
  
      // ✅ Tenta converter a resposta em JSON com segurança
      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('❌ Erro ao converter a resposta em JSON:', jsonError);
        alert('Erro no servidor. Tente novamente mais tarde!');
        return; // 🔥 Impede que o código abaixo execute se der erro
      }
  
      if (res.ok) {
        alert(data.message || 'Jogo enviado com sucesso!');
        onUploaded(); // Atualiza a lista no Dashboard
        onClose();    // Fecha o modal/formulário
      } else {
        console.error('❌ Erro no envio:', data.error);
        alert(data.error || 'Erro ao enviar o jogo!');
      }
  
    } catch (err) {
      console.error('❌ Erro de rede ou servidor caiu:', err);
      alert('Erro de conexão com o servidor!');
    }
  };
  

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-purple-500 mb-4 text-center">Enviar Novo Jogo 🚀</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TÍTULO */}
        <div>
          <label className="block text-purple-400 mb-1">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
          />
        </div>

        {/* PREÇO */}
        <div>
          <label className="block text-purple-400 mb-1">Preço (R$):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
          />
        </div>

        {/* DESCRIÇÃO */}
        <div>
          <label className="block text-purple-400 mb-1">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
          />
        </div>

        {/* IMAGEM */}
        <div>
          <label className="block text-purple-400 mb-1">Imagem do Jogo (PNG/JPG):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
          />
        </div>

        {/* ARQUIVO DO JOGO */}
        <div>
          <label className="block text-purple-400 mb-1">Arquivo do Jogo (ZIP, RAR ou EXE):</label>
          <input
            type="file"
            accept=".zip,.rar,.exe"
            onChange={(e) => setGameFile(e.target.files[0])}
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-500"
          />
        </div>

        {/* BOTÕES */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadGameForm;



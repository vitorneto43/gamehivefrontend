import React from 'react';

const GameCard = ({ title, description, image, onBuy }) => {
  return (
    <div className="bg-[#1b1b1b] rounded-xl border border-[#333] shadow-lg overflow-hidden max-w-sm w-full mx-auto transition-transform hover:scale-105">
      {/* Imagem do jogo */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between h-[230px]">
        {/* Título */}
        <h2 className="text-xl font-bold text-purple-400 text-center mb-2">
          {title}
        </h2>

        {/* Descrição */}
        <p className="text-gray-400 text-sm text-center mb-4 line-clamp-3">
          {description}
        </p>

        {/* Botão Jogar */}
        <button
          onClick={onBuy}
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none"
        >
          Jogar 🎮
        </button>
      </div>
    </div>
  );
};

export default GameCard;




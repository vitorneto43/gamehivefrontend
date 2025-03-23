import React from 'react';

const GameCard = ({ title, description, image, onBuy }) => {
  return (
    <div className="bg-[#111] rounded-xl border border-purple-700 shadow-lg overflow-hidden max-w-sm w-full mx-auto transition-transform hover:scale-105">
      {/* Imagem */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col justify-between h-[240px]">
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-3">{title}</h2>

        <p className="text-gray-300 text-sm text-center mb-4 line-clamp-3">{description}</p>

        <button
          onClick={onBuy}
          className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform hover:scale-105 focus:outline-none"
        >
          Jogar Agora 🎮
        </button>
      </div>
    </div>
  );
};

export default GameCard;




import React from 'react';

const GameCard = ({ title, description, image, onBuy }) => {
  return (
    <div className="bg-[#111] border border-[#333] rounded-2xl shadow-lg p-4 w-[300px] transition transform hover:scale-105 hover:border-purple-600">
      <div className="h-48 rounded-lg overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-purple-500 text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <button
        onClick={onBuy}
        className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
      >
        Jogar / Comprar
      </button>
    </div>
  );
};

export default GameCard;


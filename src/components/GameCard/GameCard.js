import React from 'react';

const GameCard = ({ title, description, image, onBuy }) => {
  return (
    <div className="flex flex-col bg-[#1a1a1a] border border-[#333] rounded-xl shadow-md p-4 w-full max-w-xs mx-auto transition-transform hover:scale-105 hover:border-purple-600">
      <div className="rounded-lg overflow-hidden h-48 mb-4">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      <h3 className="text-purple-400 text-lg font-semibold mb-2 text-center">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 text-center">
        {description}
      </p>

      <button
        onClick={onBuy}
        className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-lg transition-all"
      >
        Jogar / Comprar
      </button>
    </div>
  );
};

export default GameCard;



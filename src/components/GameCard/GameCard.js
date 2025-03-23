import React from 'react';
import { FaGamepad } from 'react-icons/fa';

const GameCard = ({ title, description, image, onPlay }) => {
  return (
    <div className="flex flex-col bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-2 text-center">{title}</h3>
          <p className="text-xs text-gray-300 text-center">{description}</p>
        </div>

        <button
          onClick={onPlay}
          className="flex items-center justify-center mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-3 rounded-lg transition-all text-sm"
        >
          <FaGamepad className="mr-2" /> Jogar Agora
        </button>
      </div>
    </div>
  );
};

export default GameCard;




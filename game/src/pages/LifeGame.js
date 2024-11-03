import React from 'react';

const LifeGame = () => {
  // Initialize cell with a 5x5 grid filled with 0s
  const cell = Array.from({ length: 60 }, () => Array(60).fill(0));

  return (
    <div className="p-4 max-w-3xl w-full mx-auto">
      <div className="grid grid-cols-60 gap-0 border border-gray-300">
        {cell.map((row, rowIndex) => (
          row.map((value, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className="aspect-square border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
            >
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default LifeGame;
import React, { useState } from 'react';

const LifeGame = () => {
  const gridSize = 60;
  // Initialize a 60x60 grid where each cell has its own `active` state
  const [cells, setCells] = useState(
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => false)
    )
  );

  // Toggle the active state of a specific cell
  const toggleCell = (rowIndex, colIndex) => {
    setCells(prevCells => {
      // Create a new grid with the updated state for the selected cell
      const newCells = prevCells.map((row, r) => 
        row.map((cell, c) => 
          r === rowIndex && c === colIndex ? !cell : cell
        )
      );
      return newCells;
    });
  };

  return (
    <div className="p-4 max-w-3xl w-full mx-auto">
      <div className="grid grid-cols-60 gap-0 border border-gray-300">
        {cells.map((row, rowIndex) => (
          row.map((isActive, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
              className={`aspect-square border border-gray-300 flex items-center justify-center 
                ${isActive ? 'bg-blue-500' : 'bg-black'} hover:bg-gray-100 cursor-pointer`}
            >
            </button>
          ))
        ))}
      </div>
    </div>
  );
};

export default LifeGame;

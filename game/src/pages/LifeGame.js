import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

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

  // Start next turn
  const next_turn = () => {
    const liveGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    setCells(prevCells => {
      for (let r = 0; r < prevCells.length; r++) {
        for (let c = 0; c < prevCells.length; c++) {
          if (prevCells[r][c]) {
            if (r>0) {
              liveGrid[r-1][c] ++;
              if (c>0) {liveGrid[r-1][c-1] ++}
              if (c<gridSize-1) {liveGrid[r-1][c+1] ++}
            }if (r<gridSize-1) {
              liveGrid[r+1][c] ++;
              if (c>0) {liveGrid[r+1][c-1] ++}
              if (c<gridSize-1) {liveGrid[r+1][c+1] ++}
            }if (c>0) {
              liveGrid[r][c-1] ++;
            }if (c<gridSize-1) {
              liveGrid[r][c+1] ++;
            }
          }
        }
      }
      const newCells = prevCells.map((row, r) => 
        row.map((cell, c) => {
          if (liveGrid[r][c]<2 || liveGrid[r][c]>3) {
            return false
          } else if (liveGrid[r][c]===3) {
            return true
          } else {
            return cell
          }
        })
      );
      return newCells;
    })
  }

  return (
    <>
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
      <Button variant="primary" className='absolute inset-y-0 right-28' onClick={() => next_turn()}>Next turn</Button>{' '}
    </>
  );
};

export default LifeGame;

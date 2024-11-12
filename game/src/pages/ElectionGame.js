import React, { useEffect } from 'react';
import ToolboxTheory from '../music/ToolboxTheory.mp3';

const ElectionGame = () => {
    useEffect(() => {
        const audio = new Audio(ToolboxTheory);
        
        // Play audio when the component mounts
        audio.play().catch(error => console.error('Error playing audio:', error));

        // Pause audio when the component unmounts
        return () => {
            audio.pause();
        };
    }, []);

    return null; // No visual elements
};

export default ElectionGame;

import React, { useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import ToolboxTheory from '../music/ToolboxTheory.mp3';
import BurgundianLullaby from '../music/BurgundianLullaby.mp3';
import BlankUSMap from './BlankUSMap.js';
import Trump from '../image/Trump.jpg'
import Harris from '../image/Harris.jpg'

const ElectionGame = () => {

    const [gameState, setGameState] = useState(false);

    const start_game = () => {
        var audio = new Audio(BurgundianLullaby);
        audio.play();
        setGameState(true);
    }

    return (
        <>
            <Container>
                <Button variant="primary" className='mt-3 text-xl' onClick={start_game}>Start</Button>
            </Container>
            <Container className='w-full flex justify-center items-center mt-10'>
                <Image className='w-1/12' alt="Harris" src={Harris} thumbnail/>
                <div className='w-1 h-24 bg-stone-100 absolute left-1/2'></div>
                <div className='w-6/12 h-20 bg-stone-500'></div>
                <Image className='w-1/12' alt="Trump" src={Trump} thumbnail/>
            </Container>
            <Container className='w-full'>
            <div id="map-container" className='mt-10 w-full'>
                <div id="usa-map">
                    <BlankUSMap gameState={gameState} />
                </div>
            </div>
            </Container>
            
        </>
    );
}

export default ElectionGame;

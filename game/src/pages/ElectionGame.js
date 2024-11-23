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
                <Container>
                    <Button variant="primary" className='mt-3 text-xl' onClick={start_game}>Start</Button>
                </Container>
                <Container className='flex justify-between mt-10'>
                    <Image alt="Trump" src={Trump} thumbnail width="10%"/>
                    <Image alt="Harris" src={Harris} thumbnail width="10%"/>
                </Container>
            </Container>
            <Container>
            <div id="map-container" className='mt-10'>
                <div id="usa-map">
                    <BlankUSMap gameState={gameState} />
                </div>
            </div>
            </Container>
            
        </>
    );
}

export default ElectionGame;

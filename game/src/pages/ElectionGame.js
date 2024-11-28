import React, { useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import ToolboxTheory from '../music/ToolboxTheory.mp3';
import BurgundianLullaby from '../music/BurgundianLullaby.mp3';
import BlankUSMap from './BlankUSMap.js';
import Trump from '../image/Trump.jpg'
import Harris from '../image/Harris.jpg'

const ElectionGame = () => {

    const electionCollege = {
        "ca": 54,
        "ny": 28,
        "il": 19,
        "nj": 14,
        "va": 13,
        "wa": 12,
        "ma": 11,
        "co": 10,
        "md": 10,
        "mn": 10,
        "or": 8,
        "ct": 7,
        "nm": 5,
        "hi": 4,
        "nh": 4,
        "ri": 4,
        "dc": 3,
        "de": 3,
        "vt": 3,
        "me": 2,
        "ne": 1,
        "pa": 19,
        "ga": 16,
        "nc": 16,
        "mi": 15,
        "az": 11,
        "wi": 10,
        "nv": 6,
        "tx": 40,
        "fl": 30,
        "oh": 17,
        "in": 11,
        "tn": 11,
        "mo": 10,
        "al": 9,
        "sc": 9,
        "ky": 8,
        "la": 8,
        "ok": 7,
        "ar": 6,
        "ia": 6,
        "ks": 6,
        "ms": 6,
        "ut": 6,
        "id": 4,
        "mt": 4,
        "wv": 4,
        "ak": 3,
        "nd": 3,
        "sd": 3,
        "wy": 3,
      };

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
                <div className={`h-20 left-1/4 bg-democratic absolute`}></div>
                <div className='w-6/12 h-20 bg-stone-500'></div>
                <div className={`h-20 right-1/4 bg-republican absolute`}></div>
                <div className='w-1 h-24 bg-stone-100 absolute left-1/2'></div>
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

import React, { useState, useEffect } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import ToolboxTheory from '../music/ToolboxTheory.mp3';
import BurgundianLullaby from '../music/BurgundianLullaby.mp3';
import BlankUSMap from './BlankUSMap.js';
import Trump from '../image/Trump.jpg'
import Harris from '../image/Harris.jpg'

const ElectionGame = () => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [blueBar, setblueBar] = useState(0);
    const [redBar, setredBar] = useState(0);

    const statesResults={ 
        "ca": true, 
        "ny": true,
        "il": true,
        "nj": true,
        "va": true,
        "wa": true,
        "ma": true,
        "co": true,
        "md": true,
        "mn": true,
        "or": true,
        "ct": true,
        "nm": true,
        "hi": true,
        "nh": true,
        "ri": true,
        "dc": true,
        "de": true,
        "vt": true,
        "me": true,
        "ne": false,
        "pa": false,
        "ga": false,
        "nc": false,
        "mi": false,
        "az": false,
        "wi": false,
        "nv": false,
        "tx": false,
        "fl": false,
        "oh": false,
        "in": false,
        "tn": false,
        "mo": false,
        "al": false,
        "sc": false,
        "ky": false,
        "la": false,
        "ok": false,
        "ar": false,
        "ia": false,
        "ks": false,
        "ms": false,
        "ut": false,
        "id": false,
        "mt": false,
        "wv": false,
        "ak": false,
        "nd": false,
        "sd": false,
        "wy": false
      };

    const states = [
        "dc", "wy", "wv", "ok", "id", "nd", "vt", "ar", "md", "ma", 
        "ky", "sd", "al", "hi", "ca", "tn", "ut", "la", "ms", "mt", 
        "wa", "ct", "in", "ny", "ri", "ks", "de", "il", "mo", "nj", 
        "or", "sc", "co", "ak", "me", "oh", "tx", "nm", "ia", "ne", 
        "va", "fl", "nh", "mn", "az", "mi", "nc", "ga", "wi", "pa", "nv"
      ];

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
        "me": 4,
        "ne": 5,
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

    useEffect(() => {
        const executeFunctions = async () => {
            if (gameState) {
                for (let i = 0; i < states.length; i++) {
                    if (statesResults[states[i]]) {
                        setblueBar(prevBlueBar => prevBlueBar + electionCollege[states[i]]*1.5);
                    } else {
                        setredBar(prevRedBar => prevRedBar + electionCollege[states[i]]*1.5);
                    }
                    await sleep(700); // Delay for visualization
                }
            }
        };
        executeFunctions();
    }, [gameState]);

    return (
        <>
            <Container>
                <Button variant="primary" className='mt-3 text-xl' onClick={start_game}>Start</Button>
            </Container>
            <Container className='w-full flex justify-center items-center mt-10'>
                <Image className='w-1/12' alt="Harris" src={Harris} thumbnail/>
                <div className={`h-20 bg-democratic absolute`} 
                    style={{ width: `${blueBar}px`, left: `calc(50% - 403.5px)` }}>
                </div>
                <div className='w-807px h-20 bg-stone-500'></div>
                <div className={`h-20 bg-republican absolute`} 
                    style={{ width: `${redBar}px` , right: `calc(50% - 403.5px)` }}>
                </div>
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

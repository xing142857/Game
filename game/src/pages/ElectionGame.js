import React, { useState, useEffect } from 'react';
import { Button, Container, Image} from 'react-bootstrap';

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

    const [harrisScore, setharrisScore] = useState(0);
    const [trumpScore, settrumpScore] = useState(0);

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

      const [stateColors, setStateColors] = useState(
        Object.fromEntries(
          [
            "dc", "wy", "wv", "ok", "id", "nd", "vt", "ar", "md", "ma", 
            "ky", "sd", "al", "hi", "ca", "tn", "ut", "la", "ms", "mt", 
            "wa", "ct", "in", "ny", "ri", "ks", "de", "il", "mo", "nj", 
            "or", "sc", "co", "ak", "me", "oh", "tx", "nm", "ia", "ne", 
            "va", "fl", "nh", "mn", "az", "mi", "nc", "ga", "wi", "pa", "nv"
          ].map((state) => [state, "#787878"])
        )
      );

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


    const start_game = () => {
        var audio = new Audio(BurgundianLullaby);
        audio.play();

        const executeFunctions = async () => {
            const states = Object.keys(stateColors);
            let color = '#FFFFFF';
            for (let i = 0; i < states.length; i++) {
                // Change bar colour
                if (statesResults[states[i]]) {
                    setblueBar(prevBlueBar => prevBlueBar + electionCollege[states[i]]*1.5);
                    setharrisScore(prevHarrisScore => prevHarrisScore + electionCollege[states[i]])
                } else {
                    setredBar(prevRedBar => prevRedBar + electionCollege[states[i]]*1.5);
                    settrumpScore(prevTrumpScore => prevTrumpScore + electionCollege[states[i]])
                }

                if (statesResults[states[i]]) {
                    color = '#00405b';
                } else {
                    color = '#610a0d';
                }
    
                // Change states colour
                setStateColors(prevColors => ({
                    ...prevColors,
                    [states[i]]: color
                }));
                await sleep(100);
    
                setStateColors(prevColors => ({
                    ...prevColors,
                    [states[i]]: '#FFFFFF'
                }));
                await sleep(100);
        
                setStateColors(prevColors => ({
                    ...prevColors,
                    [states[i]]: color
                }));
                await sleep(100);
    
                setStateColors(prevColors => ({
                    ...prevColors,
                    [states[i]]: '#FFFFFF'
                }));
                await sleep(100);
        
                setStateColors(prevColors => ({
                    ...prevColors,
                    [states[i]]: color
                }));
                await sleep(300);
                }
            }
        executeFunctions();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl mb-4">Are you sure you want to start the game?</h2>
                        <div className="flex justify-center items-center">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    start_game();
                                    setIsModalOpen(false);
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Container className='w-full flex justify-center items-center'>
                <Container className="w-1/12">
                    <h2>{harrisScore}</h2>
                    <Image className="w-full" alt="Harris" src={Harris} thumbnail/>
                </Container>
                <div className={`h-20 mt-20 bg-democratic absolute`} 
                    style={{ width: `${blueBar}px`, left: `calc(50% - 403.5px)` }}>
                </div>
                <div className='w-807px h-20 mt-20 bg-stone-500'></div>
                <div className={`h-20 mt-20 bg-republican absolute`} 
                    style={{ width: `${redBar}px` , right: `calc(50% - 403.5px)` }}>
                </div>
                <div className='w-1 h-24 mt-20 bg-stone-100 absolute left-1/2'></div>
                <Container className="w-1/12">
                    <h2>{trumpScore}</h2>
                    <Image className='w-full' alt="Trump" src={Trump} thumbnail/>
                </Container>
            </Container>
            <Container className='w-full'>
            <div id="map-container" className='mt-10 w-full'>
                <div id="usa-map">
                    <BlankUSMap prop={stateColors} />
                </div>
            </div>
            </Container>
        </>
    );
}

export default ElectionGame;

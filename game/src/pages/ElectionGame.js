import React, {  } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import ToolboxTheory from '../music/ToolboxTheory.mp3';
import BurgundianLullaby from '../music/BurgundianLullaby.mp3';
import { ReactComponent as BlankUSMap } from '../image/BlankUSMap.svg';
import Trump from '../image/Trump.jpg'
import Harris from '../image/Harris.jpg'

const ElectionGame = () => {

    const play_music = () => {
        var audio = new Audio(BurgundianLullaby);
        audio.play();
    }

    return (
        <>
            <Container>
                <Container>
                    <Button variant="primary" className='mt-3 text-xl' onClick={play_music}>Start</Button>
                </Container>
                <Container className='flex justify-between mt-10'>
                    <Image alt="Trump" src={Trump} thumbnail rounded width="10%"/>
                    <Image alt="Harris" src={Harris} thumbnail rounded width="10%"/>
                </Container>
            </Container>
            <Container>
            <div id="map-container" className='mt-10'>
                <div id="usa-map">
                    <BlankUSMap />
                </div>
            </div>
            </Container>
            
        </>
    );
}

export default ElectionGame;

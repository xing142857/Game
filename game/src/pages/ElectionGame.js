import React, {  } from 'react';
import { Button, Container } from 'react-bootstrap';
import ToolboxTheory from '../music/ToolboxTheory.mp3';
import BurgundianLullaby from '../music/BurgundianLullaby.mp3';
import { ReactComponent as BlankUSMap } from '../image/BlankUSMap.svg';

const ElectionGame = () => {

    const play_music = () => {
        var audio = new Audio(BurgundianLullaby);
        audio.play();
    }


    return (
        <>
            <Button variant="primary" className='absolute top-3 text-xl' onClick={play_music}>Start</Button>
            <Container>
            <div id="map-container">
                <div id="usa-map">
                    <BlankUSMap />
                </div>
            </div>
            </Container>
            
        </>
    );
}

export default ElectionGame;

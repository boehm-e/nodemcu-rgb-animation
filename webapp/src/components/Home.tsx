declare var chrome: any;
/*global chrome*/
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Color from 'color';
import axios from 'axios';
import SnakeView from './SnakeView';
import Debug from './Debug';
import Animations from './Animations';
import Games from './Games';
import { Title } from './Elements';
import AudioVis from './AudioVis';


const FullScreenButton = styled.button`
    border: none;
    border-top: 2px solid black;
    background-color: white;
    padding: 2rem;
    font-family: "Ubuntu";
    font-weight: 500;
    font-size: 1.5rem;
`

const Home = () => {
    const handle = useFullScreenHandle();
    return (
        <>
            <Title>Chambre d'Éline</Title>
            <FullScreen handle={handle}>
                <AudioVis />
                <SnakeView />
                <Debug />
                <Animations />
                <Games />
            </FullScreen>

            <FullScreenButton onClick={handle.enter}>
                Plein écran
            </FullScreenButton>
        </>
    )
}

export default Home;
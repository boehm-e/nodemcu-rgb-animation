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



const Home = () => {
    const handle = useFullScreenHandle();
    return (
        <>
            <button onClick={handle.enter}>
                Enter fullscreen
            </button>

            <FullScreen handle={handle}>
                <SnakeView />
                <Debug />
                <Animations />
            </FullScreen>
        </>
    )
}

export default Home;
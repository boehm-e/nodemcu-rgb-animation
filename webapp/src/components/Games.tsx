import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { AnimationsWrapper, AnimationWrapper, Card, SubTitle } from './Elements';
import styled from 'styled-components';
import Color from 'color';

const Games = () => {
    const [color1, setColor1] = useState("#ff0000");
    const [color2, setColor2] = useState("#0000ff");

    const runGame = (name: string) => {
        axios.post('http://192.168.1.136/setAnimation', JSON.stringify({
            "name": name,
        }));
    }

    const setGameColors = () => {
        axios.post('http://192.168.1.136/setAnimationColors', JSON.stringify({
            "color1": Color(color1).rgbNumber(),
            "color2": Color(color2).rgbNumber(),
        }));
    }

    useEffect(() => {
        setGameColors();
    }, [color1, color2])
    return (
        <Card style={{ padding: '2rem 0' }}>
            <SubTitle style={{ paddingLeft: '2rem' }}>Jeux</SubTitle>
            <AnimationsWrapper>
                <AnimationWrapper onClick={() => runGame("game")} color="#fceba1" background="https://i.ibb.co/X2sYRMn/arrows-reverse-transfer-switch-line-icon.jpg">
                    <span className="title">Jeu 1</span>
                </AnimationWrapper>
            </AnimationsWrapper>

            <div style={{ width: '100%', display: 'flex', gap: '1rem', padding: '1rem', boxSizing: 'border-box' }}>
                <div style={{ width: '50%' }}>
                    <HexColorPicker color={color1} onChange={setColor1} />
                </div>
                <div style={{ width: '50%' }}>
                    <HexColorPicker color={color2} onChange={setColor2} />
                </div>
            </div>

        </Card>
    )
}

export default Games;
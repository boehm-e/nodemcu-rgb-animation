import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { Card } from './Elements';
import styled from 'styled-components';
import Color from 'color';

const AnimationsWrapper = styled.div`
    height: 100%;
    gap: 2rem;
    padding: 0 2rem;
    display: flex;
    position: relative;
    overflow: auto;
    white-space: nowrap;
`

interface AnimationWrapperProps {
    background?: string,
    color?: string,
}
const AnimationWrapper = styled.div<AnimationWrapperProps>`
    width: 5rem ;
    min-width: 5rem ;
    height: 8rem;
    position: relative;
    display: flex;
    flex-flow: column;

    &:before {
        content: "";
        width: 5rem ;
        min-width: 5rem ;
        height: 5rem;
        border-radius: 50%;
        background: #f7fbfe;
        border: 2px solid #d8d8da;
        display: inline-block;
        position: relative;
            
        ${props => props.background && `background-image: url("${props.background}");`}
        ${props => props.color && `background-color: ${props.color};`}

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    
    & .title {
        /* position: absolute; */
        /* bottom: -2.5rem; */
        width: 100%;
        text-align: center;
        font-family: "Ubuntu";
        font-weight: 500;
        font-size: 1.5rem;
    }
`


const Animations = () => {
    const [color1, setColor1] = useState("#ff0000");
    const [color2, setColor2] = useState("#0000ff");

    const runAnimation = (name: string) => {
        axios.post('http://192.168.1.136/setAnimation', JSON.stringify({
            "name": name,
        }));
    }

    const setAnimationColors = () => {
        axios.post('http://192.168.1.136/setAnimationColors', JSON.stringify({
            "color1": Color(color1).rgbNumber(),
            "color2": Color(color2).rgbNumber(),
        }));
    }

    useEffect(() => {
        setAnimationColors();
    }, [color1, color2])
    return (
        <Card style={{ padding: '2rem 0' }}>
            <AnimationsWrapper>
                <AnimationWrapper onClick={() => runAnimation("reverse")} color="#fceba1" background="https://i.ibb.co/X2sYRMn/arrows-reverse-transfer-switch-line-icon.jpg">
                    <span className="title">Reverse</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("scanner")} color="#fceba1" background="https://hackster.imgix.net/uploads/attachments/357764/giphy_P5EUwFmXQS.gif?auto=compress&gifq=35&w=600&h=450&fit=min">
                    <span className="title">Scanner</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("fade")} color="#fceba1" background="https://thumbs.gfycat.com/IdenticalDigitalAndeancat-size_restricted.gif">
                    <span className="title">Fade</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("rainbow")} color="#fceba1" background="http://static.skaip.org/img/emoticons/180x180/f6fcff/rainbow.gif">
                    <span className="title">Rainbow</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("twinkle")} background="https://art.pixilart.com/2d841d2d492b932.gif">
                    <span className="title">twinkle</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("theater")} background="https://i.pinimg.com/originals/1c/18/de/1c18de56bb18a86cbecbd8da93fce410.gif">
                    <span className="title">Theater</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("wipe")} background="https://art.pixilart.com/b631903b2d6208c.gif">
                    <span className="title">Wipe</span>
                </AnimationWrapper>

                <AnimationWrapper onClick={() => runAnimation("off")} color="#000000">
                    <span className="title">Off</span>
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

export default Animations;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Card } from './Elements';
import styled from 'styled-components';

const AnimationsWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    gap: 2rem;
    justify-content: center;

`

interface AnimationWrapperProps {
    background?: string,
    color?: string,
}
const AnimationWrapper = styled.div<AnimationWrapperProps>`
    width: calc(50% - 1rem - 4px) ;
    height: calc(100vw / 2 - 4rem - 1rem - 4px);
    border-radius: 50%;
    background: #f7fbfe;
    border: 2px solid #d8d8da;
    display: block;
    float: left;
    position: relative;
    margin-bottom: 2rem;

    ${props => props.background && `background-image: url("${props.background}");`}
    ${props => props.color && `background-color: ${props.color};`}

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    & .title {
        position: absolute;
        bottom: -2.5rem;
        width: 100%;
        text-align: center;
        font-family: "Ubuntu";
        font-weight: 500;
        font-size: 1.5rem;
    }
`

const runAnimation = (name: string) => {
    axios.post('http://192.168.1.136/setAnimation', JSON.stringify({ "name": name }));
}

const Animations = () => {
    const [id, setId] = useState<any>(0);
    useEffect(() => {
        axios.post('http://192.168.1.136/setColor', JSON.stringify({ id: parseInt(id), color: 0xff0000 }))
    }, [id])
    return (
        <Card>
            <AnimationsWrapper>
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
            </AnimationsWrapper>
        </Card>
    )
}

export default Animations;
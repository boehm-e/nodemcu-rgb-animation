import axios from 'axios';
import Color from 'color';
import Switch from "react-switch";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, SubTitle, Title3 } from './Elements';
import { useSelector } from 'react-redux';
import { getUrl } from '../reducers/settings-reducer';
import Slider from 'react-input-slider';

const mapValue = function (curr: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (curr - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


var lastVal = -1;

const AudioVis = () => {
    const url = useSelector(getUrl);

    const [active, setActive] = useState(false);
    const [width, setWidth] = useState(100);
    const [speed, setSpeed] = useState(50);
    const [volumeCoef, setVolumeCoef] = useState(1);
    const widthRef = useRef<any>(width);
    const speedRef = useRef<any>(speed);
    const volumeCoefRef = useRef<any>(volumeCoef);
    useEffect(() => { if(widthRef.current != undefined) widthRef.current = width }, [width])
    useEffect(() => { if(speedRef.current != undefined) speedRef.current = speed }, [speed])
    useEffect(() => { if(volumeCoefRef.current != undefined) volumeCoefRef.current = volumeCoef }, [volumeCoef])

    const updateRibbon = (volume: any) => {
        axios.post(`${url}/setMusic`, JSON.stringify({ width: widthRef.current, speed: 100 - speedRef.current }));
        // setVolume(volume);
    }

    useEffect(() => {
        if (active == true) {
            axios.post(`${url}/setMusic`, JSON.stringify({ width: widthRef.current, speed: 100 - speedRef.current }));
        } else {
            axios.post(`${url}/setAnimation`, JSON.stringify({ name: "off" }));
        }
    }, [active])

    return (
        <Card>
            <SubTitle style={{ display: 'flex', justifyContent: 'space-between', margin: '0' }}>
                Musique
                {/* <br />
                {_volume}
                <br />
                {_volumem} */}
                <Switch onChange={() => setActive(!active)} checked={active} />
            </SubTitle>


            <Title3>Largeur</Title3>
            <Slider axis="x" xmin={20} xstep={20} xmax={400} x={width} onChange={({ x }) => setWidth(x)} />

            <Title3>Vitesse</Title3>
            <Slider axis="x" xmin={0} xstep={1} xmax={100} x={speed} onChange={({ x }) => setSpeed(x)} />

            <Title3>Volume</Title3>
            <Slider axis="x" xmin={0} xstep={0.1} xmax={20} x={volumeCoef} onChange={({ x }) => setVolumeCoef(x)} />
            {/* {audio ? 'Stop microphone' : 'Get microphone input'} */}
        </Card>
    );
}

export default AudioVis;
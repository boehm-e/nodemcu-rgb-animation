import axios from 'axios';
import Color from 'color';
import Switch from "react-switch";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, SubTitle } from './Elements';
import { useSelector } from 'react-redux';
import { getUrl } from '../reducers/settings-reducer';

const mapValue = function (curr: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (curr - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var lastVal = -1;

const AudioVis = () => {
    const [audio, setAudio] = useState<any>(null);

    const [_volume, setVolume] = useState<any>(-1);
    const [_volumem, setVolumem] = useState<any>(-1);

    const url = useSelector(getUrl);

    const updateRibbon = (volume: any) => {
        axios.post(`${url}/setMusic`, JSON.stringify({ volume }));
        // setVolume(volume);
    }


    const getMicrophone = async () => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
            .then(function (stream) {
                setAudio(stream);
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);
                scriptProcessor.onaudioprocess = function () {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    const arraySum = array.reduce((a, value) => a + value, 0);
                    const average = arraySum / array.length;
                    const volume = Math.round(average);
                    const mappedvolume = Math.floor(mapValue(volume, 0, 40, -1, 10));
                    setVolume(volume);
                    setVolumem(mappedvolume);
                    if (mappedvolume != lastVal && mappedvolume > 0) {
                        lastVal = mappedvolume;
                        // console.log("UPDATE RIBBON")
                        updateRibbon(mappedvolume);
                    }
                };
            })
            .catch(function (err) {
                /* handle the error */
                console.error(err);
            });

    }

    const stopMicrophone = () => {
        audio.getTracks().forEach((track: any) => track.stop());
        setAudio(null);
    }


    return (
        <Card>
            <SubTitle style={{ display: 'flex', justifyContent: 'space-between', margin: '0' }}>
                Musique 
                {/* <br />
                {_volume}
                <br />
                {_volumem} */}
                <Switch onChange={() => { !audio ? getMicrophone() : stopMicrophone() }} checked={!!audio} />
            </SubTitle>

            {/* {audio ? 'Stop microphone' : 'Get microphone input'} */}
        </Card>
    );
}

export default AudioVis;
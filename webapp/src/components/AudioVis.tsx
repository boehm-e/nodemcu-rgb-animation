import axios from 'axios';
import Color from 'color';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const mapValue = function (curr: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (curr - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var lastVal = -1;

const AudioVis = () => {
    const [audio, setAudio] = useState<any>(null);


    const updateRibbon = (volume: any) => {
        axios.post('http://192.168.1.136/setMusic', JSON.stringify({ volume }));
    }


    const getMicrophone = async () => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
            .then(function (stream) {
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
                    const mappedvolume = Math.floor(mapValue(volume, 0, 100, -2, 10));
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

    const toggleMicrophone = () => {
        if (audio) {
            stopMicrophone();
        } else {
            getMicrophone();
        }
    }



    return (
        <div className="App">
            <div className="controls">
                <button onClick={toggleMicrophone}>
                    {audio ? 'Stop microphone' : 'Get microphone input'}
                </button>
            </div>
        </div>
    );
}

export default AudioVis;
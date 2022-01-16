import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Card, SubTitle } from './Elements';
import { useDispatch, useSelector } from 'react-redux';
import { getUrl } from '../reducers/settings-reducer';
import useLocalStorage from 'use-local-storage';
import { setUrlIp } from '../actions/settings-actions';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    font-family: "Ubuntu";
    background: white;
    border: 1px solid black;
    padding: 0.5rem 1rem ;
    margin-top: 1rem;
    box-sizing: border-box;
`;

const Debug = () => {
    const [id, setId] = useState<any>(0);

    const [url, setUrl] = useLocalStorage<string>("url", "", { syncData: true });

    useEffect(() => {
        axios.post(`${url}/setColor`, JSON.stringify({ id: parseInt(id), color: 0xff0000 }))
    }, [id])

    const dispatch = useDispatch();

    return (
        <Card>
            <SubTitle>Config</SubTitle>
            <Input type="number" value={id} onChange={(e: any) => setId(e?.target?.value)} />
            <Input type="text" value={url} onChange={(e) => {
                const ip = e.target.value;
                console.log(`SET URLLL : |${ip}|`)
                setUrl(ip);
                dispatch(setUrlIp(ip));
            }} />
        </Card>
    )
}

export default Debug;
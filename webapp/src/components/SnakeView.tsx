declare var chrome: any;
/*global chrome*/
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Color from 'color';
import axios from 'axios';
import { Card, SubTitle } from './Elements';
import useLocalStorage from "use-local-storage";

const SnakeWrapper = styled.div`
    /* display: flex; */
    /* width: 100vw; */
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    /* display: grid; */
    & .row {
        display: block;
        /* width: 100%; */
    }

    & .part {
        width: calc((25vw - 2rem));        
        height: calc((25vw - 2rem));        
        display: block;
        /* outline: 2px solid black; */
        position: relative;
        float: left;
        display: flex;
        justify-content: center;
    } 
    & .topRight:after {
        content: "";
        width: calc((25vw - 2rem) - 1em - 2px);
        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);
        display: block;
        position: absolute;
        float: left;
        border-top-right-radius: calc(100vw / 8);
        border: var(--color) 1em solid;
        background-clip: content-box;
        border-bottom: none;
        border-left: 0;
        top: calc(50% - 0.5rem);
        left: 0;
    } 
    & .bottomRight:after {
        content: "";
        width: calc((25vw - 2rem) - 1em - 2px);
        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);
        display: block;
        position: absolute;
        float: left;
        border-bottom-right-radius: calc(100vw / 8);
        border: var(--color) 1em solid;
        background-clip: content-box;
        border-left: none;
        border-top: none;
        top: 1px;
        left: 0;
    } 
    & .bottomLeft:after {
        content: "";
        width: calc((25vw - 2rem) - 1em - 2px);
        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);
        display: block;
        position: absolute;
        float: left;
        border-bottom-left-radius: calc(100vw / 8);
        border: var(--color) 1em solid;
        background-clip: content-box;
        border-right: none;
        border-top: none;
        left: 0;
        top: 1px;
    } 
    
    & .topLeft:after {
        content: "";
        width: calc((25vw - 2rem) - 1em - 2px);
        height: calc((25vw - 2rem) / 2 - 0.5em - 1px);
        display: block;
        position: absolute;
        float: left;
        border-top-left-radius: calc(100vw / 8);
        border: var(--color) 1em solid;
        background-clip: content-box;
        border-bottom: none;
        border-right: none;
        bottom: calc(-50% + 0.5em);
        left: 0;
        bottom: 1px;
    }
    & .normal:after{
        content: "";
        top: 0;
        left: 0;
        width: calc(100% - 2px);
        height: 1rem;
        background-color: var(--color);
        margin-top: calc(50% - 0.5rem);
        position: absolute;
    }
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
`

const SaveButton = styled.button`
    font-family: "Ubuntu";
    background: white;
    border: 1px solid black;
    padding: 0.5rem 1rem ;
    width: 100%;
    margin-top: 1rem;
`
const ColorProfile = styled.div`
    font-family: "Ubuntu";


    & .colorProfile {
        display: flex;
        justify-content: space-around;
        padding: 1rem 0;
        border-bottom: 1px solid black;
        align-items: center;

        & .name {
            width: 50%;
        }

        & button {
            font-family: "Ubuntu";
            background: white;
            border: 1px solid black;
            padding: 0.5rem 1rem ;
        }
    }

`

const SnakeView = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([
        { selected: false, color: "#ff00ff" },
        { selected: false, color: "#C0C0C0" },
        { selected: false, color: "#808080" },
        { selected: false, color: "#D9E3F0" },
        { selected: false, color: "#F47373" },
        { selected: false, color: "#697689" },
        { selected: false, color: "#37D67A" },
        { selected: false, color: "#2CCCE4" },
        { selected: false, color: "#555555" },
        { selected: false, color: "#dce775" },
        { selected: false, color: "#ff8a65" },
        { selected: false, color: "#ba68c8" },
        { selected: false, color: "#ba68c8" },
        { selected: false, color: "#ba68c8" },
        { selected: false, color: "#ba68c8" },
        { selected: false, color: "#ba68c8" },
    ])

    const setSelected = (idx: number, selected: boolean) => {
        let newData = [...data]
        // newData[idx].selected = !newData[idx].selected;
        newData[idx].selected = selected;
        console.log(newData)
        setData(newData)
    }

    const isSelected = (idx: number) => data[idx].selected;

    const Part = React.memo((props: any) => {
        const { idx, className } = props;


        const selected = isSelected(idx);

        var styleColor: any = { "--color": data[idx].color }

        return (
            <span data-id={idx} key={idx} onClick={() => { setSelected(idx, !selected) }} style={styleColor} className={`part ${selected && "selected"} ${className}`}>
                <CheckBox readOnly data-id={idx} checked={selected} />
            </span>
        )
    })


    const [color, setColor] = useState("#aabbcc");
    const [colorProfiles, setColorProfiles] = useLocalStorage<string>("colorProfiles", "[]");

    const updateRibbon = (newData: any) => {
        const colors = newData.map((part: any) => Color(part.color).rgbNumber());
        axios.post('http://192.168.1.136/setColors', JSON.stringify(colors));
    }
    useEffect(() => {
        const newData = data.map((part) => part.selected ? { ...part, color } : part)
        setData(newData)
        updateRibbon(newData);
    }, [color, colorProfiles])


    const saveColorProfile = () => {
        const profileName = prompt("Nom du profil");
        setColorProfiles(JSON.stringify([...JSON.parse(colorProfiles), { id: colorProfiles.length + 1, name: profileName, data }]))
    }

    const removeColorProfile = (id: any) => {
        setColorProfiles(JSON.stringify([...JSON.parse(colorProfiles).filter((profile: any) => profile.id != id)]))
    }


    return (
        <>
            <Card>
                <SubTitle>Contrôler par parties</SubTitle>
                <SnakeWrapper>
                    <div className="row">
                        <Part idx={0} className="normal"></Part>
                        <Part idx={1} className="normal"></Part>
                        <Part idx={2} className="normal"></Part>
                        <Part idx={3} className="topRight"></Part>
                    </div>
                    <div className="row">
                        <Part idx={7} className="topLeft"></Part>
                        <Part idx={6} className="normal"></Part>
                        <Part idx={5} className="normal"></Part>
                        <Part idx={4} className="bottomRight"></Part>
                    </div>
                    <div className="row">
                        <Part idx={8} className="bottomLeft"></Part>
                        <Part idx={9} className="normal"></Part>
                        <Part idx={10} className="normal"></Part>
                        <Part idx={11} className="topRight"></Part>
                    </div>
                    <div className="row">
                        <Part idx={15} className="normal"></Part>
                        <Part idx={14} className="normal"></Part>
                        <Part idx={13} className="normal"></Part>
                        <Part idx={12} className="bottomRight"></Part>
                    </div>
                </SnakeWrapper>

                <HexColorPicker color={color} onChange={setColor} />
                <SaveButton onClick={saveColorProfile}>Sauvegarder</SaveButton>

                <ColorProfile>
                    {JSON.parse(colorProfiles).map((profile: any) => {
                        return <div className="colorProfile">
                            <div className="name">
                                {profile.name}
                            </div>
                            <button onClick={() => { setData(profile.data); updateRibbon(profile.data); }} className="restore">
                                Appliquer
                            </button>
                            <div onClick={() => removeColorProfile(profile.id)} className="delete">
                                X
                            </div>
                        </div>
                    })}
                </ColorProfile>

            </Card>
        </>
    )
}

export default SnakeView;
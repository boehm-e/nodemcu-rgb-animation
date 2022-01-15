declare var chrome: any;
/*global chrome*/
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Color from 'color';
import axios from 'axios';
import { Card } from './Elements';

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

    useEffect(() => {
        const newData = data.map((part) => part.selected ? { ...part, color } : part)
        setData(newData)
        const colors = newData.map(part => Color(part.color).rgbNumber());
        axios.post('http://192.168.1.136/setColors', JSON.stringify(colors));

        console.log("NEW DATA", colors)
    }, [color])


    console.log("RENDER")
    const handle = useFullScreenHandle();
    return (
        <>
            <Card>
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
            </Card>
        </>
    )
}

export default SnakeView;
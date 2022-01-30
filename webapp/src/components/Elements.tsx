import styled from "styled-components";

export const Card = styled.div`
    width: calc(100% - 4rem);
    margin: 2rem;
    padding: 2rem;
    box-sizing: border-box;
    background: white;
    border-radius: 1rem;
    box-shadow: 10px 9px 17px 8px #0000003d;
`

export const Title = styled.h2`
    font-family: "Ubuntu";
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0;
    color: #673ab7;    
`

export const SubTitle = styled.h2`
    font-family: "Ubuntu";
    font-weight: 500;
    font-size: 1.5rem;
    margin-top: 0; 
    padding-top: 0;
    margin-bottom: 3rem;
    
`

export const Title3 = styled.h3`
    font-family: "Ubuntu";
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 0; 
    padding-top: 0;
    margin-top: 3rem;
    
`

export const AnimationsWrapper = styled.div`
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
export const AnimationWrapper = styled.div<AnimationWrapperProps>`
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

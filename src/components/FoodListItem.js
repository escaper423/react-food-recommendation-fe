import React, {useState, useEffect} from 'react'
import noImage from '../resources/icons/noimage.jpg'
import styled, { keyframes } from 'styled-components';

const barAnim = keyframes`
    from{
        width: 0px;
        background-color: black;
    }
    to{
        width: ${props => props.amount}px;
    }
`

const balloonAnim = keyframes`
    from{
        bottom: -150px;
    }
`
const FoodListBar = styled.div`
    position: relative;
    width: ${props => props.amount}px;
    height: 24px;
    margin-left: 8px;
    margin-top: 12px;
    background-color: rgb(${props => parseInt(255 - (props.ratio * 255))}, ${props => parseInt(props.ratio * 255)}, 0);
    animation: ${barAnim} .7s ease-out;
    &:hover div{
        display: block;
    }
`

const FoodListBalloon = styled.div`
    display: none;
    font-size: .85em;
    position: absolute;
    width: 100px;
    height: 50px;
    left: 50%;
    top: -200%;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 4px 4px #222;
    padding-left: 6px;
    text-align: left;
    color: black;
    z-index: 2;
    transition: .15s;
    animation: ${balloonAnim};
    &:after{
        
        z-index: -1;
        position:absolute;
        content: "";
        left: 50%;
        width: 10px;
        height: 10px;
        bottom: -4px;
        background: white;
        transform: translateX(-50%) rotate(45deg);
    }
`

const FoodListItem = ({fData}) => {

    return (
        <div style={{display: 'flex', 
        lineHeight: '1.3em',
        width: '500px', 
        height: '50px',
        margin: '10px 0',
        marginLeft: '6px'
        }}>
            <div styles={{width: '50px' , height: '50px', position:'relative'}}>
                <img src={noImage} style={{borderRadius: '50%', height: '100%', width: '100%'}}></img>
            </div>

            <div style={{textAlign:'left', marginLeft: '4px'}}>
                <h4>{fData.name}</h4>
                <p style={{fontSize: '14px'}}>{fData.species}</p>
            </div>
            <div>
                <FoodListBar amount={fData.amount} ratio={fData.ratio}>
                    <FoodListBalloon >
                    {
                        <>
                        <p><b>{fData.name}</b></p>
                        <p><b>Ratio: </b>{(fData.ratio * 100).toFixed(2)}%</p>
                        </>
                    }
                    </FoodListBalloon>
                </FoodListBar>
            </div>
        </div>
    )
}

export default FoodListItem

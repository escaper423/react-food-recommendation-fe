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
const FoodListBar = styled.div`
    position: relative;
    width: ${props => props.amount}px;
    height: 24px;
    margin-left: 8px;
    margin-top: 12px;
    background-color: rgb(${props => parseInt(255 - (props.ratio * 255))}, ${props => parseInt(props.ratio * 255)}, 0);
    animation: ${barAnim} .7s ease-out;
    &:hover & + div{
        visibility: visible;
    }
`

const FoodListBalloon = styled.div`
    visibility: hidden;
    position: absolute;
    top: -50px;
    width: 60px;
    height: 50px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid black;
    z-index: 2;

    &:after{
        position:absolute;
        content: "";
        left: 25px;
        width: 10px;
        height: 10px;
        border: 1px black transparent;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
        top: 50px;
        background-color: white;
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
                    <FoodListBalloon />
                </FoodListBar>
            </div>
        </div>
    )
}

export default FoodListItem

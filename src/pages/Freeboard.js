import React from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper } from '../resources/styles'
import styled from 'styled-components'
import {BsPen, BsPencil} from 'react-icons/bs'


const boardHeadStyle = {
    marginTop: '30px',
    marginBottom: '30px',
    textAlign: 'center',

}

const WritePencil = styled(BsPencil)`
    transition: .15s;
    &:hover{
        color: yellow;
        transform: scale(1.15,1.15);
    }
`
const Freeboard = () => {
    return (
        <>
            <Header />
            <div className="app-board-title" style={boardHeadStyle}>
            <h1>Free Board</h1>
            <p>free gesipan do excrete any letters</p>
            </div>
            <div className="app-board-meta" style={{width: '90%', margin: 'auto', paddingBottom: '35px'}}>
                    <a style={{float:'right', color:'inherit', textDecoration:'none'}} href="/login">
                        <WritePencil size='1.6rem'/>
                    </a>
                </div>
            <BlockScreenWrapper>
                <BoardItem />
                <BoardItem />
                <BoardItem />
            </BlockScreenWrapper>
        </>
    )
}

export default Freeboard

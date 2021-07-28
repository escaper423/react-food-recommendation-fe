import React from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper } from '../resources/styles'


const boardHeadStyle = {
    marginTop: '30px',
    marginBottom: '30px',
    textAlign: 'center',

}
const Freeboard = () => {
    return (
        <>
            <Header />
            <div class="app-board-head" style={boardHeadStyle}>
            <h1>Free Board</h1>
            <p>free gesipan do excrete any letters</p>

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

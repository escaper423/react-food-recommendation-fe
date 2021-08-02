import React from 'react'
import Header from '../components/Header'
import { BlockScreenWrapper } from '../resources/styles'

const boardContentStyle = {
    width: '70%',
    minHeight: '50%',
    margin: '40px auto',
    backgroundColor: "#68e",
}

const InBoard = () => {
    return (
        <div>
            <Header />
            <BlockScreenWrapper>
                <div className="app-board-content" style={boardContentStyle}>
                    <div className="app-board-content__title"><h1>제목</h1></div>
                    <div className="app-board-content__meta">
                        
                    </div>
                </div>
            </BlockScreenWrapper>

        </div>
    )
}

export default InBoard

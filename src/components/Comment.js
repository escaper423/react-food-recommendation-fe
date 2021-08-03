import React from 'react'
import { UseDarkTheme } from '../resources/ContextProvider'
import {FiDelete} from 'react-icons/fi'

const CommentWrapperStyle = {
    width: '100%',
    borderTop: '1px solid',
    borderBottom: '1px solid',
    padding: '6px 12px',
}


const Comment = ({props}) => {
    const darkTheme = UseDarkTheme();
    return (
        <div className="app-board-comment" style={CommentWrapperStyle}>
            <div className="app-board_comment__meta" style={{
                
                width: '15%',
                minWidth: '60px',
                padding: '8px',
                
            }}>
                <div style={{display: 'inline', marginRight: '10px', paddingRight: '10px',borderRight: '1px solid'}}>이름</div>
                <div style={{display: 'inline'}}>날짜</div>
                </div>
            <div className="app-board_comment__content" style={{
                
                width: '15%',
                minWidth: '60px',
                padding: '8px',
            }}>내용</div>
            <div className="app-board_comment__option">
                Delete Report
            </div>
        </div>
    )
}

export default Comment

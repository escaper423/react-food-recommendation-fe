import React, {useState} from 'react'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { InputBox, TextArea, StyledButton } from '../resources/styles';
import { GetTimeGap } from '../resources/utils';


const CommentWrapperStyle = {
    width: '100%',
    borderBottom: '1px solid',
    padding: '6px 12px',
}


const Comment = ({data}) => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const [isReplying, setIsReplying] = useState(false);
    const DeleteComment = (e) => {
        e.preventDefault();
        console.log("delete comment id:"+data.id);
    }

    const PostReply = (e) => {
        e.preventDefault();
        console.log("posting reply...");
        setIsReplying(prev => !prev);  
    }
    return (
        <>
        <div className="app-board-comment" style={CommentWrapperStyle}>
            <div className="app-board_comment__meta" style={{
                
                width: '100%',
                minWidth: '60px',
                padding: '8px',
                
            }}>
                <div style={{display: 'inline', marginRight: '10px', paddingRight: '10px',borderRight: '1px solid'}}>{data.writer}</div>
                <div style={{display: 'inline'}}>{GetTimeGap(data.date)}</div>
                </div>
            <div className="app-board_comment__content" style={{
                
                width: '15%',
                minWidth: '60px',
                padding: '8px',
            }}>{data.content}</div>
            <div className="app-board_comment__option">
                <a style={{cursor: 'pointer', marginRight: '10px'}} onClick={DeleteComment}>Delete</a>
                <a style={{cursor: 'pointer'}} onClick={PostReply}>Reply</a>
            </div>
        </div>
        { isReplying &&
            <div className="app-board-comment__reply" style={{
                display: 'table',
                width: '100%',
                margin: 'auto',
                padding: '12px'
            }}>
                <div className="app-board-comment__reply__user" style={{
                    display: 'table-cell',
                    width: '60px',
                    padding: '4px'
                }}>
                    <div><b>Name:</b> {user?user.username:<InputBox darkTheme={darkTheme} width='60px'/>}</div>
                    <div><b>Password:</b> <InputBox darkTheme={darkTheme} type='password' width='60px'/></div>
                </div>
                <div className="app-board-comment__reply__content" style={{
                    display:'table-cell',
                    textAlign: 'center',
                    verticalAlign:'middle',
                }}>
                    <TextArea darkTheme={darkTheme} height='70px' width='90%'/>
                </div>
                <div className="app-board-comment__reply__confirm" style={{
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    width: '20%'
                }}>
                    <StyledButton width='60px'>등록</StyledButton>
                </div>
            </div>
        }
        </>
    )
}

export default Comment

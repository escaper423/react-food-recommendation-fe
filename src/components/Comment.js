import React, { useState, useEffect, useRef } from 'react'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { GetTimeGap } from '../resources/utils';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsReply } from 'react-icons/bs';
import axios from 'axios'
import ModalContainer from './ModalContainer';
import { baseURL } from '../resources/config';
import Reply from './Reply';
import _ from 'lodash';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

import htmlParse from 'html-react-parser'
import editorjsParser from '../resources/editorjsParser';
import { CommentEditor } from '../resources/styles';

const CommentWrapperStyle = {
    width: '100%',
    borderBottom: '1px solid',
}


const Comment = ({ data }) => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const [isReplying, setIsReplying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [replies, setReplies] = useState("");
    const [showReplies, setShowReplies] = useState(false);

    const [replyUser, setReplyUser] = useState("");
    const [replyPass, setReplyPass] = useState("");
    const [replyContent, setReplyContent] = useState("");

    const editorRef = useRef(null);
    async function HandleSave() {
        const savedData = await editorRef.current.save();
        setReplyContent(savedData)
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${baseURL}/reply/${data.cid}`,
        })
            .then(res => {
                setReplies(res.data.replies);
            })
    }, [])

    const DeleteComment = (e) => {
        e.preventDefault();
        console.log("delete comment id:" + data.cid);
        setIsDeleting(true);
    }

    const ToggleReply = (e) => {
        e.preventDefault();
        console.log("posting reply...");
        setIsReplying(prev => !prev);
    }

    const ToggleShowReply = (e) => {
        e.preventDefault();
        console.log("toggle show reply");
        setShowReplies(prev => !prev);
    }

    const PostReply = () => {
        const reply = {
            pid: data.pid,
            cid: data.cid,
            target: data.writer,
            writer: user ? user.username : replyUser,
            password: replyPass,
            content: replyContent,
            date: new Date().toString()
        }

        axios({
            method: 'POST',
            url: `${baseURL}/reply/`,
            data: reply
        }).then(() => {
            setIsReplying(false);
            window.location.reload();
            console.log("created reply");
        }).catch(err => {
            console.log("Failed to create reply");
        })
    }
    return (
        <>
            <ModalContainer isDeleting={isDeleting} setIsDeleting={setIsDeleting} item={data} />
            <div className="board-comment" style={CommentWrapperStyle}>
                <div className="board_comment__meta" style={{

                    width: '100%',
                    minWidth: '60px',
                    padding: '8px',

                }}>
                    <div style={{ display: 'inline', marginRight: '10px', paddingRight: '10px', borderRight: '1px solid' }}>{data.writer}</div>
                    <div style={{ display: 'inline' }}>{GetTimeGap(data.date)}</div>
                </div>
                <div className="board_comment__content" style={{
                    minWidth: '60px',
                    maxWidth: '100%',
                    padding: '8px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',

                }}>
                    {htmlParse(editorjsParser(data.content))}
                </div>
                <div className="board_comment__option">
                    <a style={{ cursor: 'pointer', marginRight: '10px' }} onClick={DeleteComment}>
                        <RiDeleteBinLine size='1.2rem' />
                    </a>
                    {
                        user?
                        <a style={{ cursor: 'pointer', marginRight: '10px' }} onClick={ToggleReply}>
                        <BsReply size='1.2rem' />
                        </a>:null
                    }
                    
                    {
                        replies.length ?
                            <a style={{ cursor: 'pointer' }} onClick={ToggleShowReply}>
                                {showReplies ? <BiUpArrow /> : <BiDownArrow />}
                            </a> : null
                    }
                </div>
            </div>
            {isReplying &&
                <CommentEditor
                    user={user}
                    darkTheme={darkTheme}
                    editorRef={editorRef}
                    setUsername={setReplyUser}
                    setPassword={setReplyPass}
                    commentData={replyContent}
                    saveHandler={HandleSave}
                    postHandler={PostReply} />

            }
            {
                showReplies &&
                _.map(replies, (reply) => {
                    return <Reply key={reply.rid} data={reply} />
                })
            }
        </>
    )
}

export default Comment

/*
    < div className = "app-board-comment__reply" style = {{
    display: 'table',
        width: '100%',
            height: '200px',
                margin: 'auto',
                    padding: '12px'
}}>
                    <div className="app-board-comment__reply__user" style={{
                        display: 'table-cell',
                        width: '60px',
                        padding: '4px'
                    }}>
                        <div><b>Name:</b> {user ? user.username : <InputBox darkTheme={darkTheme} width='60px' onChange={(e) => { setReplyUser(e.target.value) }} />}</div>
                        <div><b>Password:</b> <InputBox darkTheme={darkTheme} type='password' width='60px' onChange={(e) => { setReplyPass(e.target.value) }} /></div>
                    </div>
                    <div className="app-board-comment__reply__content" style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        padding: '12px',
                        height: '200px',
                        overflowX: 'hidden',
                    }}>
                        <ContentEditor saveHandler={handleSave} editorRef={editorRef} data={replyContent} />
                    </div>
                    <div className="app-board-comment__reply__confirm" style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        width: '20%'
                    }}>
                        <StyledButton width='60px' onClick={PostReply}>Submit</StyledButton>
                    </div>
                </div >
*/
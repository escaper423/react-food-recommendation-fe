import React, { useState, useEffect } from 'react'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { InputBox, StyledButton } from '../resources/styles';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CommentWrapperStyle = {
    width: '100%',
    borderBottom: '1px solid',
    padding: '6px 12px',
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

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${baseURL}/reply/${data.cid}`,
        })
            .then(res => {
                setReplies(res.data.replies);
                console.log(replies);
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
            <div className="app-board-comment" style={CommentWrapperStyle}>
                <div className="app-board_comment__meta" style={{

                    width: '100%',
                    minWidth: '60px',
                    padding: '8px',

                }}>
                    <div style={{ display: 'inline', marginRight: '10px', paddingRight: '10px', borderRight: '1px solid' }}>{data.writer}</div>
                    <div style={{ display: 'inline' }}>{GetTimeGap(data.date)}</div>
                </div>
                <div className="app-board_comment__content" style={{
                    minWidth: '60px',
                    maxWidth: '100%',
                    padding: '8px',
                    whiteSpace:'normal',
                    wordBreak:'break-all',
                    color: 'black'

                }}>
                    {htmlParse(data.content)}
                </div>
                <div className="app-board_comment__option">
                    <a style={{ cursor: 'pointer', marginRight: '10px' }} onClick={DeleteComment}>
                        <RiDeleteBinLine size='1.2rem' />
                    </a>
                    <a style={{ cursor: 'pointer', marginRight: '10px' }} onClick={ToggleReply}>
                        <BsReply size='1.2rem' />
                    </a>
                    {
                        replies.length ?
                            <a style={{ cursor: 'pointer' }} onClick={ToggleShowReply}>
                                {showReplies ? <BiUpArrow /> : <BiDownArrow />}
                            </a> : null
                    }
                </div>
            </div>
            {isReplying &&
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
                        <div><b>Name:</b> {user ? user.username : <InputBox darkTheme={darkTheme} width='60px' onChange={(e) => { setReplyUser(e.target.value) }} />}</div>
                        <div><b>Password:</b> <InputBox darkTheme={darkTheme} type='password' width='60px' onChange={(e) => { setReplyPass(e.target.value) }} /></div>
                    </div>
                    <div className="app-board-comment__reply__content" style={{
                        display: 'table-cell',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        overflow: 'auto'
                    }}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={replyContent}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "80px",
                                        editor.editing.view.document.getRoot()
                                    )
                                })
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setReplyContent(data);
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <div className="app-board-comment__reply__confirm" style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        width: '20%'
                    }}>
                        <StyledButton width='60px' onClick={PostReply}>Submit</StyledButton>
                    </div>
                </div>
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

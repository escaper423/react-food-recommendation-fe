import React, { useState, useRef } from 'react'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { InputBox, StyledButton } from '../resources/styles';
import { GetTimeGap } from '../resources/utils';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsReply } from 'react-icons/bs';
import { FaLongArrowAltRight } from 'react-icons/fa';
import axios from 'axios'
import ModalContainer from './ModalContainer';
import { baseURL } from '../resources/config';
import htmlParse from 'html-react-parser'
import { CommentEditor } from '../resources/styles';
import editorjsParser from '../resources/editorjsParser';

const ReplyWrapperStyle = {
    width: '100%',
    borderBottom: '1px solid',
    padding: '6px 12px',
    display: 'table',
}

const Reply = ({ data }) => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const [isReplying, setIsReplying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [replyUser, setReplyUser] = useState("");
    const [replyPassword, setReplyPassword] = useState("");
    const [replyContent, setReplyContent] = useState("");

    const editorRef = useRef(null);
    async function HandleSave() {
        const savedData = await editorRef.current.save();
        setReplyContent(savedData)
    };

    const DeleteReply = (e) => {
        e.preventDefault();
        console.log("delete reply id:" + data.rid);
        setIsDeleting(true);
    }

    const ToggleReply = (e) => {
        e.preventDefault();
        console.log("posting reply...");
        setIsReplying(prev => !prev);
    }

    const CreateReply = () => {
        const reply = {
            pid: data.pid,
            cid: data.cid,
            target: data.writer,
            writer: user ? user.username : replyUser,
            password: replyPassword,
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
            <div className="reply-container" style={ReplyWrapperStyle}>
                <div className="reply-indent" style={{
                    width: '30px',
                    height: '100%',
                    display: 'table-cell',
                }}>
                </div>
                <div className="reply-content">
                    <div className="reply-content__meta" style={{
                        minWidth: '60px',
                        padding: '8px',
                        display: 'table-cell',

                    }}>
                        <div style={{ display: 'inline', marginRight: '10px', paddingRight: '10px', borderRight: '1px solid' }}>
                            {data.writer} <FaLongArrowAltRight /> {data.target}
                        </div>
                        <div style={{ display: 'inline' }}>{GetTimeGap(data.date)}</div>
                    </div>
                    <div className="reply-content__body" style={{
                        minWidth: '60px',
                        maxWidth: '100%',
                        padding: '8px',
                        whiteSpace: 'normal',
                        wordBreak: 'break-all'
                    }}>
                        {htmlParse(editorjsParser(data.content))}
                    </div>
                    <div className="reply-content__option">
                        <a style={{ cursor: 'pointer', marginRight: '10px' }} onClick={DeleteReply} >
                            <RiDeleteBinLine size='1.2rem' />
                        </a>
                        <a style={{ cursor: 'pointer' }} onClick={ToggleReply} >
                            <BsReply size='1.2rem' />
                        </a>
                    </div>
                </div>
            </div>
            {isReplying &&
                <CommentEditor
                user={user}
                darkTheme={darkTheme}
                editorRef={editorRef}
                setUsername={setReplyUser}
                setPassword={setReplyPassword}
                commentData={replyContent}
                saveHandler={HandleSave}
                postHandler={CreateReply} />
            }
        </>
    )
}

export default Reply

/*
                <div className="reply-post-reply" style={{
                    display: 'table',
                    width: '100%',
                    margin: 'auto',
                    padding: '12px'
                }}>
                    <div className="reply-post-reply__meta" style={{
                        display: 'table-cell',
                        width: '60px',
                        padding: '4px'
                    }}>
                        <div><b>Name:</b> {user ? user.username : <InputBox darkTheme={darkTheme} width='60px' onChange={(e) => { setReplyUser(e.target.value) }} />}</div>
                        <div><b>Password:</b> <InputBox darkTheme={darkTheme} type='password' width='60px' onChange={(e) => { setReplyPassword(e.target.value) }} /></div>
                    </div>
                    <div className="reply-post-reply__content" style={{
                        display: 'table-cell',
                        padding: '12px',
                        verticalAlign: 'middle',
                        wordBreak: 'break-all',
                    }}>
                        <ContentEditor saveHandler={handleSave} editorRef={editorRef} data={replyContent} />
                    </div>
                    <div className="reply-post-reply__confirm" style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        width: '20%'
                    }}>
                        <StyledButton width='60px' onClick={CreateReply}>Submit</StyledButton>
                    </div>
                </div>

*/
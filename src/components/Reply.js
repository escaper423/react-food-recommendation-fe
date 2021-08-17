import React, {useState} from 'react'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { InputBox, TextArea, StyledButton } from '../resources/styles';
import { GetTimeGap } from '../resources/utils';
import {RiDeleteBinLine} from 'react-icons/ri';
import {BsReply} from 'react-icons/bs';
import {FaLongArrowAltRight} from 'react-icons/fa';
import axios from 'axios'
import ModalContainer from './ModalContainer';
import { baseURL } from '../resources/config';

const ReplyWrapperStyle = {
    width: '100%',
    borderBottom: '1px solid',
    padding: '6px 12px',
}


const Reply = ({data}) => {
    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const [isReplying, setIsReplying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [replyUser, setReplyUser] = useState("");
    const [replyPass, setReplyPass] = useState("");
    const [replyContent, setReplyContent] = useState("");

    const DeleteReply = (e) => {
        e.preventDefault();
        console.log("delete reply id:"+data.rid);
        setIsDeleting(true);
    }

    const ToggleReply = (e) => {
        e.preventDefault();
        console.log("posting reply...");
        setIsReplying(prev => !prev);
    }

    const CreateReply = () => {
        const reply = {
            cid: data.cid,
            target: data.writer,
            writer: replyUser,
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
        <ModalContainer isDeleting={isDeleting} setIsDeleting={setIsDeleting} item={data}/>
        <div className="app-board-reply" style={ReplyWrapperStyle}>
            <div className="app-board-reply__indent" style={{
                width: '50px',
                height: '100%'
            }}>

            </div>
            <div className="app-board-reply__meta" style={{
                
                width: '100%',
                minWidth: '60px',
                padding: '8px',
                
            }}>
                <div style={{display: 'inline', marginRight: '10px', paddingRight: '10px',borderRight: '1px solid'}}>
                    {data.writer} <FaLongArrowAltRight /> {data.target}
                    </div>
                <div style={{display: 'inline'}}>{GetTimeGap(data.date)}</div>
                </div>
            <div className="app-board_Reply__content" style={{
                
                width: '15%',
                minWidth: '60px',
                padding: '8px',
            }}>{data.content}</div>
            <div className="app-board_Reply__option">
                <a style={{cursor: 'pointer', marginRight: '10px'}} onClick={DeleteReply}>
                    <RiDeleteBinLine size='1.2rem'/>
                </a>
                <a style={{cursor: 'pointer'}} onClick={ToggleReply}>
                    <BsReply size='1.2rem'/>
                </a>
            </div>
        </div>
        { isReplying &&
            <div className="app-board-reply__reply" style={{
                display: 'table',
                width: '100%',
                margin: 'auto',
                padding: '12px'
            }}>
                <div className="app-board-reply__reply__user" style={{
                    display: 'table-cell',
                    width: '60px',
                    padding: '4px'
                }}>
                    <div><b>Name:</b> {user?user.username:<InputBox darkTheme={darkTheme} width='60px'  onChange={(e) => {setReplyUser(e.target.value)}}/>}</div>
                    <div><b>Password:</b> <InputBox darkTheme={darkTheme} type='password' width='60px'  onChange={(e) => {setReplyUser(e.target.value)}}/></div>
                </div>
                <div className="app-board-reply__reply__content" style={{
                    display:'table-cell',
                    textAlign: 'center',
                    verticalAlign:'middle',
                }}>
                    <TextArea darkTheme={darkTheme} height='70px' width='90%'  onChange={(e) => {setReplyUser(e.target.value)}}/>
                </div>
                <div className="app-board-reply__reply__confirm" style={{
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    width: '20%'
                }}>
                    <StyledButton width='60px' onClick={CreateReply}>Submit</StyledButton>
                </div>
            </div>
        }
        </>
    )
}

export default Reply

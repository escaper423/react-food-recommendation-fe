import React, { useState } from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { textDark, textLight } from '../resources/colors'
import { UseDarkTheme, UseAuthUser } from '../resources/ContextProvider'
import { VoteStyle, BoardItemWrapper, Commends, BoardInfo, Thumbnail } from '../resources/styles'
import { GetTimeGap, GetCategory } from '../resources/utils'
import { GrFormView } from 'react-icons/gr'
import axios from 'axios'
import ModalContainer from './ModalContainer'
import {HiOutlinePencilAlt} from 'react-icons/hi';
import {FaTimes} from 'react-icons/fa';

const BoardItem = ({ data }) => {

    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();
    const [commends, setCommends] = useState(data.commends);
    const [isDeleting, setIsDeleting] = useState(false);

    const GetThumbnail = () => {
        if (data.content.blocks){
            for(let elem of data.content.blocks){
                if (elem.type === "image"){
                    return elem.data.url;
                }
            }
        }
        return null;
    }

    const doUpVote = () => {
        setCommends(commends + 1);
        axios({
            method: "PUT",
            url: `http://localhost:3001/board/${data.category}/${data._id}`,
            params: {
                query: "voteup"
            }
        })
    }

    const doDownVote = () => {
        setCommends(commends - 1);
        axios({
            method: "PUT",
            url: `http://localhost:3001/board/${data.category}/${data._id}`,
            params: {
                query: "votedown"
            }
        })
    }

    const UpViews = () => {
        axios({
            method: "PUT",
            url: `http://localhost:3001/board/${data.category}/${data._id}`,
            params: {
                query: "view"
            }
        })
    }

    const DeleteBoardItem = () => {
        console.log("Deleting Board item...");
        setIsDeleting(true);
    }

    const Modify = () => {
        console.log("Modify");
    }
    
    const IsWriter = (user, writer) => {
        if (!user)
            return false;
        if (user.username === writer)
            return true;
        else
            return false;
    }
    
    return (
        <>
            <ModalContainer isDeleting={isDeleting} item={data} setIsDeleting={setIsDeleting} />
            <BoardItemWrapper>
                <Commends>
                    <VoteStyle onClick={doUpVote}><BsCaretUpFill size='1.6rem' /></VoteStyle>
                    <span>{commends}</span>
                    <VoteStyle onClick={doDownVote}><BsCaretDownFill size='1.6rem' /></VoteStyle>
                </Commends>

                <Thumbnail>
                    <img src={GetThumbnail()} width="100%" height="100%"></img>
                </Thumbnail>
                <BoardInfo>
                    <div className="board-option" style={{
                        position: 'relative',
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'space-evenly',
                        fontSize: '1.2rem',
                        float: 'right',
                        marginTop: '-5px',
                    }}>
                    <span className="board-option__modify" onClick={Modify}>{IsWriter(user,data.writer)?
                    <Link
                    onClick={UpViews}
                    style={{ outline: 'none', textDecoration: 'none', color: darkTheme ? textDark : textLight }}
                    to={
                        { pathname: '/board/write', state: { 
                            _id: data._id, 
                            category: data.category, 
                            password: data.password, 
                            title: data.title,
                            content: data.content, 
                            editOption: "modify" } }
                    }
                    params={data}
                >
                    <HiOutlinePencilAlt /> </Link>:null}
                    </span>
                    <span className="board-option__delete" onClick={DeleteBoardItem}><FaTimes /></span>
                    </div>
                    <Link
                        onClick={UpViews}
                        style={{ outline: 'none', textDecoration: 'none', color: darkTheme ? textDark : textLight }}
                        to={
                            { pathname: `/board/${data.category}/${data._id}`, state: { _id: data._id, category: data.category } }
                        }
                        params={data}
                    >

                        <div style={{ paddingLeft: '15px', display: 'block', height: '80%' }}>
                            <h2 style={{ height: "100%", display: 'inline-block' }}>{data.title}</h2>
                            <div style={{ whiteSpace: 'nowrap', display: 'inline-block', width: '100%' }}>
                                <div style={{ display: 'inherit', paddingRight: '6px', borderRight: '1px solid' }}>{GetCategory(data.category)}</div>
                                <div style={{ display: 'inherit', paddingLeft: '8px' }}>{GetTimeGap(data.date)}</div>
                                <div style={{ display: 'inherit', paddingLeft: '8px' }}>{data.writer}</div>
                                <div style={{ float: 'right', right: '20px', bottom: '10px', padding: '0px' }}><GrFormView /> {data.views}</div>
                            </div>
                        </div>

                    </Link>
                </BoardInfo>
            </BoardItemWrapper>
        </>
    )
}

export default BoardItem;

import React, { useState } from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { textDark, textLight } from '../resources/colors';
import { UseDarkTheme } from '../resources/ContextProvider';
import { VoteStyle, BoardItemWrapper, Commends, BoardInfo, Thumbnail } from '../resources/styles'



const BoardItem = ({data}) => {
    const darkTheme = UseDarkTheme();
    const [commends, setCommends] = useState(0);
    const itemData = {
        id: data.id,
        writer: data.writer,
        date: new Date().toUTCString(),
        views: data.views,
        title: data.title,
        categoryId: data.categoryId,
        categoryContent: data.categoryContent,
        content: data.content,
        comments: data.comments,
    }

    function doUpVote() {
        return setCommends(commends + 1);
    }

    function doDownVote() {
        return setCommends(commends - 1);
    }

    function Troll(e) {
        e.preventDefault();
        return console.log(e.target.innerHTML);
    }
    
    return (
        <BoardItemWrapper>
            <Commends>
                <VoteStyle onClick={doUpVote}><BsCaretUpFill size='1.6rem' /></VoteStyle>
                <span>{commends}</span>
                <VoteStyle onClick={doDownVote}><BsCaretDownFill size='1.6rem' /></VoteStyle>
            </Commends>
            
            <Thumbnail>

            </Thumbnail>
            <BoardInfo>
                <Link style={{outline:'none', textDecoration: 'none', color:darkTheme?textDark:textLight}}to={`/board/${itemData.categoryId}/${itemData.id}`}>
                <div style={{paddingLeft: '15px', display:'block', height: '80%'}}>
                    <h2 style={{height: "100%"}}>{itemData.title}</h2>
                
                    <div style={{whiteSpace:'nowrap', display: 'inline-block', width: '100%'}}>
                        <div style={{display:'inherit', paddingRight: '6px', borderRight: '1px solid white'}}>{itemData.categoryContent}</div> 
                        <div style={{display:'inherit', paddingLeft: '8px'}}>{itemData.date}</div>
                        <div style={{display:'inherit', paddingLeft: '8px'}}>{itemData.writer}</div>
                        <div style={{display:'inherit', float:'right', right: '20px'}}>조회 수: {itemData.views}</div>
                    </div>
                    </div>
                </Link>
            </BoardInfo>
        </BoardItemWrapper>
    )
}

export default BoardItem;

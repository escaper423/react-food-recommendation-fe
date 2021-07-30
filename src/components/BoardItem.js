import React, { useState } from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { VoteStyle, BoardItemWrapper, Commends, BoardInfo, Thumbnail } from '../resources/styles'



const BoardItem = () => {
    const [commends, setCommends] = useState(0);
    const itemData = {
        id: 1,
        writer: "Trollman",
        date: new Date().toUTCString(),
        title: "아",
        category: "똥글",

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
                <a onClick={Troll}>
                <div style={{paddingLeft: '15px', display:'block', height: '80%'}}>
                    <h2 style={{height: "100%"}}>Title</h2>
                
                    <div style={{whiteSpace:'nowrap', display: 'inline-block', width: '100%'}}>
                        <div style={{display:'inherit', paddingRight: '6px', borderRight: '1px solid white'}}>{itemData.category}</div> 
                        <div style={{display:'inherit', paddingLeft: '8px'}}>{itemData.date}</div>
                        <div style={{display:'inherit', float:'right', right: '20px'}}>{itemData.writer}</div>
                    </div>
                    </div>
                </a>
            </BoardInfo>
        </BoardItemWrapper>
    )
}

export default BoardItem;

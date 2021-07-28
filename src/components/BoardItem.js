import React, { useState } from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { VoteStyle, BoardItemWrapper, Commends, BoardInfo, Thumbnail } from '../resources/styles'

const BoardItem = () => {
    const [commends, setCommends] = useState(0);

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
                <span style={{ color: 'white' }}>{commends}</span>
                <VoteStyle onClick={doDownVote}><BsCaretDownFill size='1.6rem' /></VoteStyle>
            </Commends>
            <BoardInfo>
                <a onClick={Troll}>
                    <h2>Title</h2>
                    <h4>
                        <ul>
                            <li>Category</li>
                            <li>Category</li>
                            <li>Category</li>
                        </ul>
                    </h4>
                </a>
            </BoardInfo>
            <Thumbnail>
                
            </Thumbnail>
        </BoardItemWrapper>
    )
}

export default BoardItem;

import React, { useEffect, useState } from 'react'
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { textDark, textLight } from '../resources/colors'
import { UseDarkTheme } from '../resources/ContextProvider'
import { VoteStyle, BoardItemWrapper, Commends, BoardInfo, Thumbnail } from '../resources/styles'
import { GetTimeGap, GetCategory } from '../resources/utils'
import {GrFormView} from 'react-icons/gr'
import axios from 'axios'


const BoardItem = ({data}) => {
    
    const darkTheme = UseDarkTheme();
    const [commends, setCommends] = useState(data.commends);

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
                <Link 
                    onClick={UpViews}
                    style={{outline:'none', textDecoration: 'none', color:darkTheme?textDark:textLight}}
                    to={
                        { pathname:`/board/${data.category}/${data._id}`, state: data }
                    }
                    params={data}
                >
                <div style={{paddingLeft: '15px', display:'block', height: '80%'}}>
                    <h2 style={{height: "100%"}}>{data.title}</h2>
                
                    <div style={{whiteSpace:'nowrap', display: 'inline-block', width: '100%'}}>
                        <div style={{display:'inherit', paddingRight: '6px', borderRight: '1px solid'}}>{GetCategory(data.category)}</div> 
                        <div style={{display:'inherit', paddingLeft: '8px'}}>{GetTimeGap(data.date)}</div>
                        <div style={{display:'inherit', paddingLeft: '8px'}}>{data.writer}</div>
                        <div style={{ float:'right', right: '20px', bottom: '10px', padding: '0px'}}><GrFormView /> {data.views}</div>
                    </div>
                    </div>
                </Link>
            </BoardInfo>
        </BoardItemWrapper>
    )
}

export default BoardItem;

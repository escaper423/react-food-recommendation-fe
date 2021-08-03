import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper, SelectStyle } from '../resources/styles'
import styled from 'styled-components'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { screenDark, screenLight, textDark, textLight } from '../resources/colors'
import { UseDarkTheme } from '../resources/ContextProvider'
import { categoryContents, categoryId, searchOption, sortOrder } from '../resources/config'
import _ from 'lodash'



const BoardHeaderStyle = {
    width: '90%',
    height: '30px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
}

const WriteButton = styled(BsPencil)`
    transition: .15s;
    &:hover{
        transform: scale(1.15,1.15);
    }
`

const SearchButton = styled(BsSearch)`
    transition: .15s;
    &:hover{
        transform: scale(1.15, 1.15);
    }
`
//attrs({ type: 'submit' })`

const SearchTextArea = styled.input`

    background-color: ${props => props.darkTheme ? screenDark : screenLight};
    color: ${props => props.darkTheme ? textDark : textLight};
    width: 200px;
    font-size: 1rem;
    border: 0;
    outline: none;
    padding: 5px;
    box-sizing: border-box;
    border-bottom: 1px solid ${props => props.darkTheme ? textDark : textLight};
    margin-right: 15px;
`

const BoardFooterStyle = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
}

const boardItems = [{
    id: 1,
    writer: "TrollMan",
    date: new Date().toUTCString(),
    views: 0,
    title: "아",
    content: "tlqkf",
    categoryId: categoryId[1],
    categoryContent: categoryContents[1],
    commends: 11,
    comments: [],
},
{
    id: 2,
    writer: "userman",
    date: new Date().toUTCString(),
    views: 3,
    title: "개",
    content: "?",
    categoryId: categoryId[2],
    categoryContent: categoryContents[2],
    commends: -33,
    comments: [],
},
{
    id: 3,
    writer: "ncpc",
    date: new Date().toUTCString(),
    views: 333,
    title: "님들",
    content: "모함",
    categoryId: categoryId[3],
    categoryContent: categoryContents[3],
    commends: -37,
    comments: [{
        depth: 0,
        writer: "qt",
        date: "1 hours ago",
        content: "qt아",
    },
    {
        depth: 0,
        writer: "ㅇㅇ",
        date: "just now",
        content: "응-가",
    },
    {
        depth: 0,
        writer: "qt",
        date: "1 hours ago",
        content: "응가가",
    }

],
}

]

const Freeboard = () => {
    const [searchWord, setSearchWord] = useState("");
    const darkTheme = UseDarkTheme();

    function InputSearchWord(e) {
        return setSearchWord(e.target.value);
    }

    const SearchBoard = (e) => {
        e.preventDefault();
        console.log("Searching Board with word " + searchWord);
    }
    return (
        <>
            <Header />
            <div className="app-board-title" style={{ margin: '40px 0', textAlign: 'center' }}>
                <h1>Free Board</h1>
                <p>free gesipan do excrete any letters</p>
            </div>

            <BlockScreenWrapper>
                <div className="app-board-header" style={BoardHeaderStyle}>
                    <div className="app-board-header-dropdown">
                        <SelectStyle width="80px" className="app-board-category-selector">
                            {_.map(categoryContents, (elem) => {
                                return (
                                    <option key={elem} value={elem}>{elem}</option>
                                )
                            })
                            }
                        </SelectStyle>

                        <SelectStyle width="120px" className="app-board-sort-selector" style={{ marginLeft: '10px' }}>
                            {_.map(sortOrder, (elem) => {
                                return (
                                    <option key={elem} value={elem}>{elem}</option>
                                )
                            })
                            }
                        </SelectStyle>
                    </div>
                    <a style={{ float: 'right', color: 'inherit', textDecoration: 'none' }} href="/write">
                        <WriteButton size='1.6rem' />
                    </a>
                </div>
                <BoardItem data={boardItems[0]}/>
                <BoardItem data={boardItems[1]}/>
                <BoardItem data={boardItems[2]}/>
                <div className="app-board-footer" style={BoardFooterStyle}>
                    <SelectStyle width="80px" style={{ marginRight: '10px' }}>
                        {_.map(searchOption, (elem) => {
                            return (
                                <option key={elem} value={elem}>{elem}</option>
                            )
                        })}
                    </SelectStyle>
                    <SearchTextArea onChange={InputSearchWord} darkTheme={darkTheme} placeholder="Search..." />
                    <a>
                        <SearchButton size='1.4rem' style={{ verticalAlign: "middle" }} onClick={SearchBoard} />
                    </a>
                </div>
            </BlockScreenWrapper>

        </>
    )
}

export default Freeboard

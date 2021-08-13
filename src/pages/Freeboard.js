import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper, SelectStyle } from '../resources/styles'
import styled from 'styled-components'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { screenDark, screenLight, textDark, textLight } from '../resources/colors'
import { UseDarkTheme } from '../resources/ContextProvider'
import { baseURL, categoryContents, searchOption, sortOrder } from '../resources/config'
import _ from 'lodash'
import axios from 'axios'
import ModalContainer from '../components/ModalContainer'


const BoardHeaderStyle = {
    width: '98%',
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

const Freeboard = () => {
    const [boardItems, setBoardItems] = useState(null);
    const [searchWord, setSearchWord] = useState("");
    const [searchFilter, setSearchFilter] = useState("title");
    const [category, setCategory] = useState("all");
    const [priority, setPriority] = useState("recent");
    const darkTheme = UseDarkTheme();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${baseURL}/board/${category}`,
            params: {
                page: 1,
                sort: priority
            }
        })
            .then(res => {
                setBoardItems(res.data);
            })
    }, [category, priority])

    const SearchBoard = (e) => {
        console.log("Searching Board with word " + searchWord);
        console.log('qqqq');
        axios({
            method: 'GET',
            url: `${baseURL}/board/${category}`,
            params: {
                page: 1,
                sort: priority,
                filter: searchFilter,
                query: searchWord
            }
        }).then(res => {
            setBoardItems(res.data)
        })
    }
    const ChangeCategory = (e) => {
        console.log("Changing category...");
        const val = e.target.value;
        if (val === "공지") {
            setCategory("notice");
        }
        if (val === "일반") {
            setCategory("general");
        }
        if (val === "질문") {
            setCategory("question");
        }
        if (val === "의견") {
            setCategory("feedback");
        }
        if (val === "모두") {
            setCategory("all");
        }
    }

    const ChangeSortOrder = (e) => {
        console.log("Changing sort order...");
        if (e.target.value === "최근 글 우선") {
            setPriority("recent")
        }
        if (e.target.value === "조회수") {
            setPriority("views")
        }
        if (e.target.value === "추천수") {
            setPriority("commends")
        }
    }

    const ChangeSearchFilter = (e) => {
        const val = e.target.value;
        if (val === "제목"){
            setSearchFilter("title")
        }
        if(val === "글쓴이"){
            setSearchFilter("writer")
        }
    }

    return (
        <>  
            <Header />
            <div className="app-board-title" style={{ margin: '40px 0', textAlign: 'center' }}>
                <h1>Free Board</h1>
                <p>free gesipan do excrete any letters</p>
            </div>
            
            <BlockScreenWrapper>
                <div className="app-board-header" style={BoardHeaderStyle} >
                    <div className="app-board-header-dropdown">
                        <SelectStyle width="80px" className="app-board-category-selector" onChange={ChangeCategory}>
                            {
                                _.map(categoryContents, (elem) => {
                                    return(
                                    <option key={elem} value={elem} >{elem}</option>
                                    )
                                })
                            }
                        </SelectStyle>

                        <SelectStyle width="120px" className="app-board-sort-selector" style={{ marginLeft: '10px' }} onChange={ChangeSortOrder}>
                            {_.map(sortOrder, (elem) => {
                                return (
                                    <option key={elem} value={elem} >{elem}</option>
                                )
                            })
                            }
                        </SelectStyle>
                    </div>
                    <a style={{ float: 'right', color: 'inherit', textDecoration: 'none' }} href="/board/write">
                        <WriteButton size='1.6rem' />
                    </a>
                </div>

                {
                    boardItems &&
                    _.map(boardItems, (item) => {
                        return (<BoardItem key={item._id} data={item} />)
                    })
                }


                <div className="app-board-footer" style={BoardFooterStyle}>
                    <SelectStyle width="80px" style={{ marginRight: '10px' }} onChange={ChangeSearchFilter}>
                        {_.map(searchOption, (elem) => {
                            return (
                                <option key={elem} value={elem}>{elem}</option>
                            )
                        })}
                    </SelectStyle>
                    <SearchTextArea darkTheme={darkTheme} placeholder="Search..." onChange={(e)=>{setSearchWord(e.target.value)}}/>
                    <a style={{ cursor: 'pointer' }} >
                        <SearchButton size='1.4rem' style={{ verticalAlign: "middle" }} onClick={SearchBoard} />
                    </a>
                </div>
            </BlockScreenWrapper>

        </>
    )
}

export default Freeboard

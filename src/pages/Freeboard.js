import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper, PageNumActiveStyle, PageNumButtonStyle, PageSkipButtonStyle, SelectStyle } from '../resources/styles'
import styled from 'styled-components'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { screenDark, screenLight, textDark, textLight } from '../resources/colors'
import {  UseDarkTheme } from '../resources/ContextProvider'
import { baseURL, categoryContents, searchOption, sortOrder } from '../resources/config'
import _ from 'lodash'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'


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
    justifyContent: 'center',
    margin: '20px 0',
}

let boardItemCount;
let endPage;
let endRange;
let boardPageRange;


const Freeboard = () => {
    localStorage.setItem("navIndex", 1);

    const [boardItems, setBoardItems] = useState(null);
    const [searchWord, setSearchWord] = useState("");
    const [searchFilter, setSearchFilter] = useState("title");
    const [category, setCategory] = useState("all");
    const [priority, setPriority] = useState("recent");
    const [boardPage, setBoardPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pageArray, setPageArray] = useState([])
    const darkTheme = UseDarkTheme();

    const limitPerPage = 8;

    useEffect(() => {
        setBoardPage(1);
        axios({
            method: 'GET',
            url: `${baseURL}/board/${category}`,
            params: {
                page: 1,
                sort: priority,
                filter: searchFilter,
                limit: limitPerPage,
                query: searchWord
            }
        })
            .then(res => {
                setBoardItems(res.data.boardItems);
                Pagination(res.data.count);
            }).then(() => {
                setIsLoading(false);
            })
    }, [category, priority])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${baseURL}/board/${category}`,
            params: {
                page: boardPage,
                sort: priority,
                filter: searchFilter,
                limit: limitPerPage,
                query: searchWord
            }
        })
            .then(res => {
                setBoardItems(res.data.boardItems);
                Pagination(res.data.count);
            }).then(() => {
                setIsLoading(false);
            })
    }, [boardPage])
    
    const ChangePage = (e) => {
        const clickedValue = e.target.innerHTML;
        //Show previous page
        if (clickedValue === "Prev"){
            setBoardPage(Math.max(1, ((boardPageRange - 1) * 10) + 10))
        }
        
        //Show next page
        else if (clickedValue === "Next"){
            setBoardPage(Math.min(endPage, (Math.max(1, ((boardPageRange + 1) * 10 + 1)))))
        }
            
        //Show selected page
        else {
            setBoardPage(e.target.innerHTML)
        }
    }



    const Pagination = (count) => {
        boardItemCount = count;
        boardPageRange = boardPage % 10 == 0 ? parseInt((boardPage / 10) - 1) : parseInt(boardPage / 10)
        console.log("Page: " + boardPage + "\nPageRange: " + boardPageRange);
        endPage = parseInt(boardItemCount % limitPerPage) === 0 ? parseInt(boardItemCount / limitPerPage) : parseInt(boardItemCount / limitPerPage) + 1;
        endRange = parseInt(endPage % 10) === 0 ? parseInt(endPage / 10) - 1 : parseInt(endPage / 10);


        let startIdx = (boardPageRange * 10) + 1;
        let tmp = [];
        for (let i = startIdx; i < startIdx + 10; i++) {
            if (i <= endPage) {
                tmp.push(i);
            }
            else {
                break;
            }
        }
        setPageArray(tmp);
    }

    const SearchBoard = () => {
        console.log("Searching Board with word " + searchWord);
        setIsLoading(true);
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
            setBoardItems(res.data.boardItems)
            Pagination(res.data.count);
        }).then(() => {
            setSearchWord("");
            setIsLoading(false);
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

    const ShowSearchFilter = (filter) => {
        if (filter === "title")
            return "제목"
        if (filter === "writer")
            return "작성자"
    }

    if (isLoading)
        return <Header />
    else
        return (
            <>
                <Header />
                <div className="board-title" style={{ margin: '40px 0', textAlign: 'center' }}>
                    <h1>Free Board</h1>
                    <p>free gesipan do excrete any letters</p>
                </div>

                <BlockScreenWrapper>
                    <div className="board-header" style={BoardHeaderStyle} >
                        <div className="board-header-dropdown">
                            <SelectStyle width="80px" className="board-category-selector" onChange={ChangeCategory}>
                                {
                                    _.map(categoryContents, (elem) => {
                                        return (
                                            <option key={elem} value={elem} >{elem}</option>
                                        )
                                    })
                                }
                            </SelectStyle>

                            <SelectStyle width="120px" className="board-sort-selector" style={{ marginLeft: '10px' }} onChange={ChangeSortOrder}>
                                {_.map(sortOrder, (elem) => {
                                    return (
                                        <option key={elem} value={elem} >{elem}</option>
                                    )
                                })
                                }
                            </SelectStyle>
                        </div>
                        <Link style={{ float: 'right', color: 'inherit', textDecoration: 'none' }} to={
                            {
                                pathname: "/board/write", state: {
                                    editOption: "write"
                                }
                            }
                        }>
                            <WriteButton size='1.6rem' />
                        </Link>
                    </div>

                    {
                        boardItems &&
                        _.map(boardItems, (item) => {
                            return (<BoardItem key={item._id} data={item} />)
                        })
                    }


                    <div className="board-footer" style={BoardFooterStyle}>
                        <div className="board-footer__pagination" style={{ marginBottom: '20px' }}>
                            {
                                <PageSkipButtonStyle onClick={ChangePage}>Prev</PageSkipButtonStyle>
                            }
                            {
                                _.map(pageArray, (elem) => {
                                    let cur = elem;
                                    if (cur == boardPage) {
                                        return <PageNumActiveStyle key={cur}>{cur}</PageNumActiveStyle>
                                    }
                                    else if (cur <= endPage) {
                                        return <PageNumButtonStyle key={cur} onClick={(e) => { ChangePage(e) }}>{cur}</PageNumButtonStyle>
                                    }
                                })
                            }
                            {
                                <PageSkipButtonStyle onClick={ChangePage}>Next</PageSkipButtonStyle>
                            }
                        </div>
                        <SelectStyle width="80px" defaultValue={searchFilter} style={{ marginRight: '10px' }} onChange={(e) => { setSearchFilter(e.target.value) }}>
                            {_.map(searchOption, (elem) => {
                                return (
                                        <option key={elem} value={elem}>{ShowSearchFilter(elem)}</option>
                                )
                            })}
                        </SelectStyle>
                        <SearchTextArea darkTheme={darkTheme} placeholder="Search..." onChange={(e) => { setSearchWord(e.target.value) }} />
                        <a style={{ cursor: 'pointer' }} >
                            <SearchButton size='1.4rem' style={{ verticalAlign: "middle" }} onClick={SearchBoard} />
                        </a>
                    </div>
                </BlockScreenWrapper>
                <Footer />
            </>
        )
}

export default Freeboard

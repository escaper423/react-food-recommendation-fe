import React, { useState, useEffect, useCallback } from 'react'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper, PageNumActiveStyle, PageNumButtonStyle, PageSkipButtonStyle, SelectStyle } from '../resources/styles'
import styled from 'styled-components'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { screenDark, screenLight, textDark, textLight } from '../resources/colors'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { baseURL, categoryContents, categoryId, searchOption, sortId, sortOrder } from '../resources/config'
import _ from 'lodash'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'


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
//let endRange;
let boardPageRange;

const Freeboard = () => {
    const navigate = useNavigate()
    const loc = useLocation();

    const queryParams = new URLSearchParams(window.location.search);
    let page = queryParams.get("page") != undefined?queryParams.get("page"):1
    let category = queryParams.get("category") != undefined?queryParams.get("category"):"all"
    let priority = queryParams.get("priority") != undefined?queryParams.get("priority"):"recent"
    let searchFilter = queryParams.get("searchFilter") != undefined?queryParams.get("searchFilter"):"title"
    let target = queryParams.get("target") != undefined?queryParams.get("target"):""

    const [boardItems, setBoardItems] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageArray, setPageArray] = useState([])

    const darkTheme = UseDarkTheme();
    const user = UseAuthUser();

    const limitPerPage = 3;

    useEffect(() => {
        console.log("useEffect loading: "+category != 'all')
        setIsLoading(true)
        
        console.log("URL params:"+queryParams.get("page"))
        axios({
            method: 'GET',
            url: `${baseURL}/board`,
            params: {
                page: page,
                sort: priority,
                category: category,
                filter: searchFilter,
                limit: limitPerPage,
                query: target,
            }
        })
            .then(res => {
                setBoardItems(res.data.boardItems);
                Pagination(res.data.count);
            }).then(() => {
                setIsLoading(false);
            })
    }, [loc])

    const OnEnterPressed = (e) =>{
        e.preventDefault()
        if (e.key === "Enter"){
            HandleSearch()
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', OnEnterPressed)

        return () => {
            window.removeEventListener('keyup',OnEnterPressed)
        }

    },[OnEnterPressed])

    

    const HandleSearch = () => {
        page = 1;
        SearchBoard()
    }

    const ChangePage = (e) => {
        const clickedValue = e.target.innerHTML;
        //Show previous page
        if (clickedValue === "Prev") {
            page = Math.max(1, ((boardPageRange - 1) * 10) + 10)
        }
        //Show next page
        else if (clickedValue === "Next") {
            page = Math.min(endPage, (Math.max(1, ((boardPageRange + 1) * 10 + 1))))
        }
        //Show selected page
        else {
            page = clickedValue
        }
        SearchBoard()
    }

    const Pagination = (count) => {
        boardItemCount = count;
        boardPageRange = page % 10 === 0 ? parseInt((page / 10) - 1) : parseInt(page / 10)
        console.log("Page: " + page + "\nPageRange: " + boardPageRange);
        endPage = parseInt(boardItemCount % limitPerPage) === 0 ? parseInt(boardItemCount / limitPerPage) : parseInt(boardItemCount / limitPerPage) + 1;
        //endRange = parseInt(endPage % 10) === 0 ? parseInt(endPage / 10) - 1 : parseInt(endPage / 10);


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
        console.log("Searching Board with word " + target);
        navigate(`/board?page=${page}&category=${category}&priority=${priority}${searchFilter ? `&searchFilter=${searchFilter}` : ""}${target ? `&target=${target}` : ""}`)
    }

    const ChangeCategory = (e) => {
        console.log("Changing category...");
        const val = e.target.value;
        if (val === "notice") {
            category = "notice"
        }
        if (val === "general") {
            category ="general"
        }
        if (val === "question") {
            category ="question"
        }
        if (val === "feedback") {
            category ="feedback"
        }
        if (val === "all") {
            category ="all"
        }
        page = 1;
        SearchBoard()
    }

    const ChangeSortOrder = (e) => {
        console.log("Changing sort order...");
        if (e.target.value === "recent") {
            priority = "recent";
        }

        if (e.target.value === "views") {
            priority = "views";
        }

        if (e.target.value === "commends") {
            priority = "commends";
        }
        page = 1;
        SearchBoard()
    }

    const ChangeFilter = (val) => {
        console.log("Changing filter...")
        if (ShowSearchFilter(val) === "제목") {
            searchFilter = "title"
        }
        if (ShowSearchFilter(val) === "작성자") {
            searchFilter = "writer"
        }
    }

    const ShowSearchFilter = (filter) => {
        if (filter === "title")
            return "제목"
        if (filter === "writer")
            return "작성자"
    }

    const ShowCategory = (category) => {
        for (let elem in categoryId) {
            if (categoryId[elem] === category) {
                return categoryContents[elem]
            }
        }
    }
    
    const ShowSortOrder = (order) => {
        for (let elem in sortId){
            if (sortId[elem] === order){
                return sortOrder[elem]
            }
        }
    }

    

    if (isLoading)
        return null
    else
        return (
            <>
                <div className="board-title" style={{ margin: '40px 0', textAlign: 'center' }}>
                    <h1>Free Board</h1>
                    <p>아무 글이나 자유롭게 써주세요.</p>
                </div>

                <BlockScreenWrapper>
                    <div className="board-header" style={BoardHeaderStyle} >
                        <div className="board-header-dropdown">
                            <SelectStyle width="80px" className="board-category-selector" onChange={ChangeCategory}>
                                {
                                    _.map(categoryId, (elem) => {
                                        return (
                                            (elem === category) ? <option key={elem} value={elem} selected>{ShowCategory(elem)}</option>
                                                :
                                                <option key={elem} value={elem}>{ShowCategory(elem)}</option>
                                        )
                                    })
                                }
                            </SelectStyle>

                            <SelectStyle width="120px" className="board-sort-selector" style={{ marginLeft: '10px' }} onChange={ChangeSortOrder}>
                                {_.map(sortId, (elem) => {
                                    return (
                                        (elem === priority) ? <option key={elem} value={elem} selected >{ShowSortOrder(elem)}</option>
                                        :
                                        <option key={elem} value={elem} >{ShowSortOrder(elem)}</option>
                                    )
                                })
                                }
                            </SelectStyle>
                        </div>
                        {user ?
                            <Link style={{ float: 'right', color: 'inherit', textDecoration: 'none' }}
                                to={"/board/write"} state={{ editOption: "write" }}
                            >
                                <WriteButton size='1.6rem' />
                            </Link> : null
                        }
                    </div>

                    {
                        boardItems &&
                        _.map(boardItems, (item) => {
                            return (<BoardItem key={item._id} data={item} />)
                        })
                    }


                    <div className="board-footer" style={BoardFooterStyle}>{
                        (boardItemCount) ?
                            <div className="board-footer__pagination" style={{ marginBottom: '20px' }}>
                                {
                                    <PageSkipButtonStyle onClick={ChangePage}>Prev</PageSkipButtonStyle>
                                }
                                {
                                    _.map(pageArray, (elem) => {

                                        if (elem === parseInt(page)) {
                                            return <PageNumActiveStyle key={elem}>{elem}</PageNumActiveStyle>
                                        }
                                        else {
                                            return <PageNumButtonStyle key={elem} onClick={(e) => { ChangePage(e) }}>{elem}</PageNumButtonStyle>
                                        }
                                    })
                                }
                                {
                                    <PageSkipButtonStyle onClick={ChangePage}>Next</PageSkipButtonStyle>
                                }
                            </div> : <p style={{ lineHeight: '6em' }}> 게시된 글이 없습니다.</p>
                    }
                        <SelectStyle width="80px" defaultValue={searchFilter} style={{ marginRight: '10px' }} onChange={(e) => { ChangeFilter(e.target.value) }}>
                            {_.map(searchOption, (elem) => {
                                return (
                                    <option key={elem} value={elem}>{ShowSearchFilter(elem)}</option>
                                )
                            })}
                        </SelectStyle>
                        <SearchTextArea darkTheme={darkTheme} placeholder="Search..." onChange={(e) => { target = e.target.value }} defaultValue={target}/>
                        <a style={{ cursor: 'pointer' }} >
                            <SearchButton size='1.4rem' style={{ verticalAlign: "middle" }} onClick={HandleSearch} />
                        </a>
                    </div>
                </BlockScreenWrapper>
            </>
        )
}

export default Freeboard

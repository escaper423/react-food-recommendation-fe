import React from 'react'
import Header from '../components/Header'
import BoardItem from '../components/BoardItem'
import { BlockScreenWrapper } from '../resources/styles'
import styled from 'styled-components'
import { BsPencil, BsSearch } from 'react-icons/bs'
import { screenDark, screenLight, textDark, textLight } from '../resources/colors'
import { UseDarkTheme } from '../resources/ContextProvider'
import { categories, sortOrder } from '../resources/config'
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
}

const Freeboard = () => {
    const darkTheme = UseDarkTheme();
    return (
        <>
            <Header />
            <div className="app-board-title" style={{ marginTop: '25px', textAlign: 'center' }}>
                <h1>Free Board</h1>
                <p>free gesipan do excrete any letters</p>
            </div>

            <BlockScreenWrapper>
                <div className="app-board-header" style={BoardHeaderStyle}>
                    <div className="app-board-header-dropdown">
                        <select className="app-board-category-selector">
                            {_.map(categories, (elem) => {
                                return (
                                    <option>{elem}</option>
                                )})
                            }
                        </select>

                        <select className="app-board-sort-selector" style={{marginLeft: '10px'}}>
                            {_.map(sortOrder, (elem) => {
                                return (
                                    <option>{elem}</option>
                                )})
                            }
                        </select>
                    </div>
                    <a style={{ float: 'right', color: 'inherit', textDecoration: 'none' }} href="/write">
                        <WriteButton size='1.6rem' />
                    </a>
                </div>
                <BoardItem />
                <BoardItem />
                <BoardItem />
                <div className="app-board-footer" style={BoardFooterStyle}>
                    <form className="app-board-search">
                        <SearchTextArea darkTheme={darkTheme} placeholder="Search..." />
                        <a>
                            <SearchButton size='1.4rem' style={{ verticalAlign: "middle" }} />
                        </a>
                    </form>
                </div>
            </BlockScreenWrapper>

        </>
    )
}

export default Freeboard

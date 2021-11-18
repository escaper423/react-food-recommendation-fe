import React, { useState } from 'react'
import TestData from '../resources/data/testdata.json'
import styled from 'styled-components'
import {textDark, textLight} from '../resources/colors'

const SearchBarStyle = styled.input.attrs({ type: 'text' })`
    width: 192px;
    height: 24px;
    padding: 2px;
    color: ${props => props.darkTheme ? textDark : textLight};
    border: 1px solid ${props => props.darkTheme ? textDark : textLight};
    border-top: 0;
    border-left: 0;
    border-right: 0;
    background: transparent;
    margin: 0 8px;
    @media screen and (max-width: 600px){
        width: 80%;
    }
`
const SearchItem = styled.p`
    cursor: pointer;
`

const SearchItemWrapper = styled.div`
    position: absolute;
    width: 192px;
    max-height: 200px;
    overflow: hidden;

`
const SearchBar = ({ placeholder, darkTheme, data }) => {
    const [inputText, setInputText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const HandleFilter = (e) => {
        e.preventDefault();
        const newWord = e.target.value;
        console.log(newWord);
        setInputText(newWord);

        if (newWord.length > 0) {
            setFilteredData(
                TestData.filter(elem => {
                    return (elem.name.toLowerCase().includes(newWord.toLowerCase()));
                })
            )
        }  
        setIsSearching(true)

        
    }

    const HandleSelection = (e) => {
        setInputText(e.target.innerHTML);
        setIsSearching(false)
    }

    return (
        <>
        <SearchBarStyle darkTheme={darkTheme} placeholder={placeholder} onChange={HandleFilter} value={inputText}/>
        <SearchItemWrapper>
        {
            isSearching && 
            filteredData.map((elem) => {
                return (<SearchItem key={elem.id} onClick={HandleSelection}>{elem.name}</SearchItem>);
            })
            
        }
        </SearchItemWrapper>
        </>
    )
}

export default SearchBar


import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { textDark, textLight } from '../resources/colors'
import axios from 'axios';
import { dbURL } from '../resources/config';

const barWidth = "256px";
const barMargin = "5px 8px";

const SearchBarStyle = styled.input.attrs({ type: 'text' })`
    width: ${barWidth};
    height: 24px;
    color: ${props => props.darkTheme ? textDark : textLight};
    border: 1px solid ${props => props.darkTheme ? textDark : textLight};
    border-top: 0;
    border-left: 0;
    border-right: 0;
    margin: ${barMargin};
    background: transparent;
    @media screen and (max-width: 660px){
        width: 80%;
    }
`
const SearchItem = styled.p`
    cursor: pointer;
    padding: 3px 0;
`

const SearchItemWrapper = styled.div`
    position: absolute;
    left: 0;
    margin-top: 5px;
    width: ${barWidth};
    margin: ${barMargin};
    max-height: 120px;
    overflow-y: scroll;
    border-radius: 2px;
    background-color: white;
    color: black;
    text-align:center;
    &::-webkit-scrollbar{
        width: 4px;
        height: 6px;
        background-color: grey;
    }
    &::-webkit-scrollbar-thumb {
        background: #333;
    }

`
const SearchBar = ({ placeholder, darkTheme, data, forwardedRef }) => {
    const [inputText, setInputText] = useState("");
    const [foodData, setFoodData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const GetValue = () => {
        return inputText;
    }

    useEffect(() => {
        axios({
            url: `${dbURL}/foods`,
            method: 'GET',
        }).then(res =>{
            setFoodData(res.data)
        })

    }, [])
    
    const HandleFilter = (e) => {
        e.preventDefault();
        const newWord = e.target.value;
        setInputText(newWord);
        console.log(filteredData)

        if (newWord.length > 0) {
            setFilteredData(
                foodData.filter(elem => {
                    return (elem.name.toLowerCase().includes(newWord.toLowerCase()));
                })
            )
            setIsSearching(true)
        }
        else{
            setIsSearching(false)
        }
    }

    const HandleSelection = (e) => {
        setInputText(e.target.innerHTML);
        setIsSearching(false)
    }

    return (
        <div style={{ display: 'inline', position: 'relative' }}>
            <SearchBarStyle darkTheme={darkTheme} placeholder={placeholder} onChange={HandleFilter} value={inputText} ref={forwardedRef} />
            {
                isSearching &&
                <SearchItemWrapper>
                    {
                        filteredData.map((elem) => {
                            return (<SearchItem key={elem.id} onClick={HandleSelection}>{elem.name}</SearchItem>);
                        })
                    }
                </SearchItemWrapper>
            }
        </div>
    )
}

export default SearchBar


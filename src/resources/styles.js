import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { UseDarkTheme } from "./ContextProvider";
import React from 'react';
import { EDITOR_JS_TOOLS } from '../resources/config'
import EditorJS from 'react-editor-js';

export const inputWrapperStyle = {
    display: 'flex',
    width: '80%',
    margin: 'auto',
    padding: '2px 0',
    justifyContent: 'space-between'
}

export const confirmWrapperStyle = {
    display: 'flex',
    width: '80%',
    margin: '20px auto',
    padding: '2px 0',
    justifyContent: 'space-around',
}

const FlexScreenWrapperStyle = styled.section`
    width: 100%;
    height: calc(100vh - 60px);
    text-align: center;
    display: flex;
    background-color: ${props => props.darkTheme ? '#333' : '#fff'};
`

const BlockScreenWrapperStyle = styled.section`
    width: 65%;
    display: block;
    margin: auto;
    transform: trasnlateX(-50%) translateY(-50%);
    @media only screen and (max-width: 900px){
        width: 99%;
    }
`


const InputBoxStyle = styled.input`
        width: ${props => props.width ? props.width : '70%'};
        height: 25px;
        fontSize: 15px;
        border: 0;
        border-bottom: 1px solid ${props => props.darkTheme ? 'white' : 'black'};
        background-color:transparent;
        color: ${props => props.darkTheme ? 'white' : 'black'};
        
        &:focus{
            outline:none;
        }
        &:autofill:hover,
        &:autofill:fill,
        &:autofill:active,
        {
            background-color: ${props => props.darkTheme ? '#444' : '#ddd'};
            color: ${props => props.darkTheme ? '#ddd' : '#333'};
        }
    `

const TextAreaStyle = styled.textarea`
    width: ${props => props.width ? props.width : '95%'};
    height: ${props => props.height ? props.height : '90%'};
    font-size: 15px;
    border-radius: 4px;
    box-shadow: ${props => props.darkTheme ? '0 0 4px white' : '0 0 7px black'};
    background-color: transparent;
    outline: none;
    resize: none;
    color: ${props => props.darkTheme ? 'white' : 'black'};
`

const ConfirmButtonStyle = styled.input.attrs({ type: 'submit' })`
        border: 0;
        padding: 10px 16px;
        border-radius: 4px;
        background-color: #888;
        transition : .1s;
        font-size: 1rem;
        color: #fff;
        &:hover{
            transform:scale(1.1,1.1);
            background-color:#02e637;
        }
        &:active{
            background-color:#943b0f;
        }
    `

const ForgetPasswordTextStyle = styled(Link)`
        text-decoration: none;
        color: ${props => props.darkTheme ? 'white' : 'black'};    
        transition: .1s;
        &:hover{
            font-size: 1.1rem;
            transform: scale(1.1,1.1);
        }
    `

const CommendsStyle = styled.div`
    text-align: center;
    display: table-cell;
    width: 26px;
    padding: 2px;
    margin-right: 15px;
    vertical-align: middle;
`

const BoardInfoStyle = styled.div`
    cursor: pointer;
    display: table-cell;
    padding: 2px;
`

const ThumbnailStyle = styled.div`
    display: table-cell;
    width: 115px;
    height: 80px;
    vertical-align: middle;
    padding: 2px;
    margin-left: 18px;
`

export const StyledButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: ${props => props.width ? props.width : '60px'};
height: ${props => props.height ? props.height : '50px'};
border-radius: 4px;
background: #256ce1;
padding: 10px 12px;
color: #fff;
border: none;
outline: none;
cursor: pointer;
transition: all .2s ease-in-out;
text-decoration: none;

&:hover{
    transition: all .2s ease-in-out;
    background: #fff;
    color: #010606;
}
`

export const BoardItemWrapper = styled.article`
    width: 95%;
    min-width: 350px;
    height: 81px;
    
    background-color: #bbb;
    border-radius: 6px;
    display: table;
    z-index: 1;
    padding: 8px;
    margin: 8px auto;
    transition: .1s;
    &:hover{
        background-color: #999;
    }
`

export const VoteStyle = styled.a`
        cursor: pointer;
        color: #eee;
        display: inline-block;
        &:hover{
            color: yellow;
        }
        &:active{
            color: #999;
        }
`

export const SelectStyle = styled.select`
    font-size: 14px;
    padding: 6px;
    width: ${props => props.width};
    border-radius: 4px;
`

//wrapper styles
export const Commends = ({ children }) => {
    return (
        <CommendsStyle>
            {children}
        </CommendsStyle>
    )
}

export const BoardInfo = ({ children }) => {
    return (
        <BoardInfoStyle>
            {children}
        </BoardInfoStyle>
    )
}

export const Thumbnail = ({ children }) => {
    return (
        <ThumbnailStyle>
            {children}
        </ThumbnailStyle>
    )
}

export const FlexScreenWrapper = ({ children }) => {
    const darkTheme = UseDarkTheme();
    return (
        <FlexScreenWrapperStyle darkTheme={darkTheme}>
            {children}
        </FlexScreenWrapperStyle>
    )
}

export const BlockScreenWrapper = ({ children }) => {
    const darkTheme = UseDarkTheme();
    return (
        <BlockScreenWrapperStyle darkTheme={darkTheme}>
            {children}
        </BlockScreenWrapperStyle>
    )
}

//input styles
export const InputBox = ({ darkTheme, type, onChange, val, id, width }) => {
    return (
        <InputBoxStyle darkTheme={darkTheme} type={type} onChange={onChange} value={val} id={id} width={width} />
    )
}
export const ConfirmButton = ({ val }) => {
    return (
        <ConfirmButtonStyle value={val} />
    )
}

export const TextArea = ({ darkTheme, width, height }) => {
    return (
        <TextAreaStyle width={width} height={height} darkTheme={darkTheme}></TextAreaStyle>
    )
}

export const ForgetPasswordText = ({ darkTheme, val }) => {
    return (
        <ForgetPasswordTextStyle to="/forgetpw" darkTheme={darkTheme}>{val}</ForgetPasswordTextStyle>
    )
}

export const ContentEditor = ({ saveHandler, editorRef, data }) => {
    return <EditorJS 
    onChange={saveHandler} 
    instanceRef={instance => editorRef.current = instance}
    data={data}
    tools={EDITOR_JS_TOOLS}
    placeholder="내용을 작성해 주세요." />
}

export const PageNumButtonStyle = styled.button`
    width: 24px;
    height: 24px;
    font-size: .8em;
    border-radius: 16px;
    text-align: center;
    border: none;
    background: #387ff2;
    color: white;
    margin: 0 4px;
    cursor: pointer;
    &:hover{
        background: #31f20f;
    }
    &:active{
        background: #ffe600;
        transform: translate(1px,1px);
    }
`

export const PageNumActiveStyle = styled.button`
    width: 24px;
    height: 24px;
    font-size: .8em;
    text-align: center;
    border-radius: 16px;
    border: none;
    background: #de3a3a;
    color: white;
    margin: 0 4px;
`

export const PageSkipButtonStyle = styled.button`
    width: 60px;
    height: 32px;
    font-size: 1em;
    border-radius: 6px;
    text-align: center;
    border: none;
    background: #387ff2;
    color: white;
    margin: 0 20px;
    cursor: pointer;
    &:hover{
        background: #31f20f;
    }
    &:active{
        background: #ffe600;
        transform: translate(1px,1px);
    }
`

const CommentUserStyle = {
    marginRight: '10px',
    width: '15%',
    minWidth: '90px',
}

const CommentContentStyle = {
    alignItems: 'center',
    width: '90%',
    height: '200px',
    overflowX: 'hidden',
}

const CommentConfirmStyle = {
    width: '15%',
    paddingLeft: '10px',
    alignItems: 'center',
    display: 'flex',
}

const LoadingAnim = keyframes`
    0%{
      transform: rotate(0deg);
    }
    50%{
      transform: rotate(180deg);
    }
    100%{
      transform: rotate(360deg);
    }
`

export const LoadingStyle = styled.div`
    border: 4px solid transparent;
    width: 24px;
    height: 24px;
    margin: 12px auto;
    border-radius: 50%;
    border-top: 3px solid #666;
    animation: ${LoadingAnim} 1s linear infinite;
`

export const CommentEditor = ({
    darkTheme, setUsername, setPassword,
    editorRef, saveHandler, commentData,
    postHandler, user }) => {

    const CommentStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '30px auto',
        borderRadius: '3px',
        width: '90%',
        padding: '12px',
        backgroundColor: '#666',
        boxShadow: `${darkTheme ? '0 0 10px white' : '0 0 10px black'}`,
    }
    
    return (
        <>
            <div className="board-content__comments" style={CommentStyle} darkTheme={darkTheme}>
                <div className="board-content__comments__user" style={CommentUserStyle}>
                    <div className="board-content__comments__user__name" style={{
                        marginBottom: '30px',
                    }}>
                        <div><b>Name:</b></div>
                        <div>{user ? user.username : <InputBox width="80%" darkTheme={darkTheme} onChange={(e) => { setUsername(e.target.value) }} />}</div>
                    </div>
                    <div className="board-content__comments__user__pass" >
                        <div><b>Password:</b></div>
                        <div><InputBox type="password" width="80%" darkTheme={darkTheme} onChange={(e) => { setPassword(e.target.value) }} /></div>
                    </div>
                </div>
                <div className="board-content__comments__content" style={CommentContentStyle}>
                    <ContentEditor saveHandler={saveHandler} editorRef={editorRef} data={commentData} />
                </div>
                <div className="board-content__comments__confirm" style={CommentConfirmStyle}>
                    <StyledButton onClick={postHandler} width='100px'>Submit</StyledButton>
                </div>
            </div>
        </>
    )
}
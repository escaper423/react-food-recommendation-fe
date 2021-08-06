import React, {useState} from 'react'
import Header from '../components/Header'
import { categoryContents } from '../resources/config'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, ConfirmButton, InputBox, SelectStyle, TextArea } from '../resources/styles'
import _ from 'lodash'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { GetCategory } from '../resources/utils'


const TmpStyle = {
    verticalAlign:'middle',
    display: 'table-cell',
    width: '80px',
    padding: '5px 3px',
}

const FlexDiv = {
    display: 'table',
    width: '100%',
    margin: 'auto',
}

const Wrtie = () => {
    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
    const history = useHistory();

    const [category, setCategory] = useState("일반");
    const [username, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    
    const PostBoard = (e) =>{
        e.preventDefault();
        const boardItem = {
            writer: (user)?user.username:username,
            password: password,
            date: new Date().toString(),
            title: title,
            content: content,
            views: 0,
            commends: 0,
            category: GetCategory(category)
        }

        console.log(boardItem);
        axios({
            method: "POST",
            url: "http://localhost:3001/board",
            data: boardItem,
        }).then(res => {
            history.push('/board')
        }).catch(err => {

        })
    }
    return (
        <>
            <Header />
            <BlockScreenWrapper>
                <div className="app-board-write-head" style={{
                    margin: '40px 0',
                    textAlign: 'center',
                }}>
                    <h1>글 쓰기</h1>
                    <p>아무 글이나 써주세요.</p>
                </div>
                <div className="app-board-write-body" style={{
                    width: '70%',
                    margin: 'auto'

                }}>
                    <form onSubmit={PostBoard}>
                        <div className="app-board-write__category" style={FlexDiv}>
                            <div style={TmpStyle}>종류:</div>
                            <SelectStyle width="60px" onChange={(e) => {setCategory(e.target.value)}}>
                                {_.map(categoryContents.filter(item => item !== "모두"), (elem) => {
                                    return (
                                        <option value={elem}>{elem}</option>
                                    )
                                })
                                }
                            </SelectStyle>
                        </div>
                        <div className="app-board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>작성자:</div>
                            {(user) ? <span style={{fontSize:'18px', display:'table-cell',verticalAlign:'middle'}}>{user.username}</span>
                            : 
                            <InputBox darkTheme={darkTheme} width='200px' onChange={(e) => {setUserName(e.target.value)}}/>}
                        </div>
                        <div className="app-board-write__password" style={FlexDiv}>
                            <div style={TmpStyle}>비밀번호:</div><InputBox type="password" darkTheme={darkTheme} width='200px' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <div className="app-board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>제목:</div><InputBox darkTheme={darkTheme} width='60%'  onChange={(e) => {setTitle(e.target.value)}} />
                        </div>
                        <div className="app-board-write__content" style={FlexDiv}>
                            <div style={TmpStyle}>내용:</div><TextArea darkTheme={darkTheme} width='100%' height='300px' onChange={(e)=>{setContent(e.target.value)}}/>
                        </div>
                        <div className="app-board-write__confirm" style={{
                            float: 'right',
                            marginTop: '18px',
                            marginRight: '20px',
                        }}>
                            <ConfirmButton val="글 쓰기" />
                        </div>
                    </form>

                </div>
            </BlockScreenWrapper>
        </>
    )
}

export default Wrtie

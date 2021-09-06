import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import { categoryContents } from '../resources/config'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, ConfirmButton, InputBox, SelectStyle } from '../resources/styles'
import _ from 'lodash'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { GetCategory } from '../resources/utils'
import { baseURL } from '../resources/config'
import { textDark, textLight } from '../resources/colors'
import { ContentEditor } from '../resources/styles'

const TmpStyle = {
    verticalAlign: 'middle',
    display: 'table-cell',
    width: '100px',
    padding: '5px 3px',
}

const FlexDiv = {
    display: 'table',
    width: '100%',
}

const Write = () => {
    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
    const history = useHistory();

    const location = useLocation();
    const boardData = location.state;

    const [category, setCategory] = useState("일반");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const editorRef = useRef(null);


    useEffect(()  => {
        console.log(boardData.editOption);
        if (boardData.editOption === "modify"){
            setCategory(boardData.category);
            setPassword(boardData.password);
            setTitle(boardData.title);
            setContent(boardData.content);
        }

        setIsLoading(false);
    }, [])

    async function handleSave() {
        const savedData = await editorRef.current.save();
        setContent(savedData)
    };

    const ContentStyle = {
        alignItems: 'middle',
        width: '100%',
        color: darkTheme?textDark:textLight,
    }

    const PostBoard = (e) => {
        e.preventDefault();
        const boardItem = {
            writer: (user) ? user.username : username,
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
            method: (boardData.editOption === "write")?"POST":"PUT",
            url: (boardData.editOption === "write")?`${baseURL}/board`
            :
            `${baseURL}/board/${boardData.category}/${boardData._id}`,
            data: boardItem,
            params: {
                query: (boardData.editOption === "modify")?"modify":null
            }
        }).then(res => {
            history.push('/board')
        }).catch(err => {

        })
    }
    if (isLoading)
        return null;
    else
    return (
        <>
            <Header />
            <BlockScreenWrapper>
                <div className="board-write-head" style={{
                    height: '100%',
                    margin: '40px 0',
                    textAlign: 'center',
                }}>
                    <h1>글 쓰기</h1>
                    <p>아무 글이나 써주세요.</p>
                </div>
                <div className="board-write-body" style={{
                    width: '70%',
                    margin: 'auto',
                }}>
                    <form onSubmit={PostBoard}>
                        <div className="board-write__category" style={FlexDiv}>
                            <div style={TmpStyle}>종류:</div>
                            <SelectStyle width="60px" onChange={(e) => { setCategory(e.target.value) }}>
                                {_.map(categoryContents.filter(item => item !== "모두"), (elem) => {
                                    return (
                                        <option key={elem} value={elem}>{elem}</option>
                                    )
                                })
                                }
                            </SelectStyle>
                        </div>
                        <div className="board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>작성자:</div>
                            {(user) ? <span style={{ fontSize: '18px', display: 'table-cell', verticalAlign: 'middle' }}>{user.username}</span>
                                :
                                <InputBox darkTheme={darkTheme} width='300px' onChange={(e) => { setUserName(e.target.value) }} />}
                        </div>
                        <div className="board-write__password" style={FlexDiv}>
                            <div style={TmpStyle}>비밀번호:</div><InputBox type="password" darkTheme={darkTheme} width='300px' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>제목:</div><InputBox darkTheme={darkTheme} width='300px' onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                        <div className="board-write__content" style={ContentStyle}>
                            <ContentEditor saveHandler={handleSave} editorRef={editorRef} data={content} />
                        </div>
                        <div className="board-write__confirm" style={{
                                position: 'fixed',
                                width: '100%',
                                height: '60px',
                                float: 'left',
                                left: 'calc(80%)',
                                bottom: '40px',
                                marginTop: '18px',
                                marginRight: '20px',

                                }}>
                                    <ConfirmButton val={(boardData.editOption) === "write"?"글 쓰기":"글 수정" }/>
                                </div>
                    </form>
                </div>
            </BlockScreenWrapper>
        </>
    )
}

export default Write

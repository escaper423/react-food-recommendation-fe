import React, { useState, useRef, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import { categoryId } from '../resources/config'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, ConfirmButton, InputBox, SelectStyle } from '../resources/styles'
import _ from 'lodash'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
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
    const navigate = useNavigate();

    const location = useLocation();
    const LinkedState = location.state;
    
    const [category, setCategory] = useState("general");
    const [boardId, setBoardId] = useState(-1);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [editType, setEditType] = useState("write");
    const editorRef = useRef(null);


    useEffect(() => {
        console.log(LinkedState);
        if (LinkedState.editOption === "modify") {
            setEditType("modify")
            setBoardId(LinkedState._id);
            setPassword(LinkedState.password)
            setCategory(LinkedState.category);
            setTitle(LinkedState.title);
            setContent(LinkedState.content);
        }
        setIsLoading(false);
    }, [])

     async function handleSave(){
        const savedData = await editorRef.current.save();
        setContent(savedData);
    };

    const ContentStyle = {
        alignItems: 'middle',
        width: '100%',
        color: darkTheme ? textDark : textLight,
    }

    const PostBoard = (e) => {
        e.preventDefault();

        const boardItemToPut = {
            writer: (user) ? user.username : username,
            date: new Date().toString(),
            password: password,
            title: title,
            content: content,
            views: 0,
            commends: 0,
            category: category
        }

        
        axios({
            method: (editType === "write") ? "POST" : "PUT",
            url: (editType === "write") ? `${baseURL}/board`
                :
                `${baseURL}/board/${category}/${boardId}`,
            data: boardItemToPut,
            params: {
                query: (editType === "modify") ? "modify" : null
            }
        }).then(res => {
            navigate('/board')
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
                                    {_.map(categoryId.filter(item => item !== "all"), (elem) => {
                                        if (GetCategory(elem) === category)
                                            return (
                                                <option key={elem} value={elem} selected>{GetCategory(elem)}</option>
                                            )
                                        else
                                            return (
                                                <option key={elem} value={elem}>{GetCategory(elem)}</option>
                                            )
                                    })
                                    }
                                </SelectStyle>
                            </div>
                            <div className="board-write__title" style={FlexDiv}>
                                <div style={TmpStyle}>작성자:</div>
                                {(user) ? <span style={{ fontSize: '18px', display: 'table-cell', verticalAlign: 'middle' }}>{user.username}</span>
                                    :
                                    <InputBox darkTheme={darkTheme} width='300px' val={username} onChange={(e) => { setUserName(e.target.value) }} />}
                            </div>
                            <div className="board-write__password" style={FlexDiv}>
                                <div style={TmpStyle}>비밀번호:</div><InputBox type="password" darkTheme={darkTheme} val={password} width='300px' onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="board-write__title" style={FlexDiv}>
                                <div style={TmpStyle}>제목:</div><InputBox darkTheme={darkTheme} width='300px' val={title} onChange={(e) => { setTitle(e.target.value) }} />
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
                                <ConfirmButton val={editType === 'write'?"글 쓰기":"글 수정"} />
                            </div>
                        </form>
                    </div>
                </BlockScreenWrapper>
            </>
        )
}

export default Write

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Comment from '../components/Comment'
import Header from '../components/Header'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, InputBox, StyledButton } from '../resources/styles'
import _ from 'lodash'
import { GetTimeGap, GetCategory } from '../resources/utils'
import axios from 'axios'
import { baseURL } from '../resources/config'
import htmlParse from 'html-react-parser'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const boardContentStyle = {
    width: '85%',
    minHeight: '50%',
    margin: '40px auto',
}

const CommentStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px auto',
    width: '100%',
    padding: '12px',
    backgroundColor: 'grey'
}

const CommentUserStyle = {
    marginRight: '10px',
    width: '15%',
    minWidth: '90px'
}

const CommentContentStyle = {
    alignItems: 'center',
    width: '95%',
    overflow: 'auto',
}

const CommentConfirmStyle = {
    width: '15%',
    alignItems: 'center',
    display: 'flex',
}

const InBoard = () => {
    const location = useLocation();
    const itemState = location.state;
    const itemID = itemState._id;
    const itemCategory = itemState.category;

    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
    const [commentUser, setCommentUser] = useState(user ? user.username : "");
    const [commentPass, setCommentPass] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState("");
    const [itemInfo, setItemInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Getting an item
        axios({
            method: 'GET',
            url: `${baseURL}/board/${itemCategory}/${itemID}`
        }).then(res => {
            setItemInfo(res.data[0]);
        }).then(() => {
            console.log(itemInfo.content)
        }).then(() => {
            //Getting Comments
            axios({
                method: 'GET',
                url: `${baseURL}/comment/${itemID}`,
            })
                .then(res => {
                    setComments(res.data);
                })
                .then( () => {
                    setIsLoading(false);
                }) 
            })
        }

        
        , [])

    const PostComment = () => {
        console.log("Post Comment Function.")

        const comment = {
            pid: itemID,
            writer: user ? user.username : commentUser,
            password: commentPass,
            content: commentContent,
            date: new Date().toString()
        }

        axios({
            method: 'POST',
            url: `${baseURL}/comment`,
            data: comment
        }).then(() => {
            console.log("Comment created.");
            window.location.reload();
        }).catch(err => {
            console.log("Cannot create comment.\n" + err);
        })
    }

    if (isLoading)
        return null

    else return (
        <>
            <Header />
            {!isLoading &&
                <div>
                    <BlockScreenWrapper>
                        <div className="app-board-content" style={boardContentStyle}>
                            <div className="app-board-content__title"><h1>{itemInfo.title}</h1></div>
                            <div className="app-board-content__meta" style={
                                { display: 'table', textAlign: 'center', marginTop: '20px', padding: '10px 0', borderRadius: '4px' }}>
                                <div style={{ display: 'table-cell', paddingRight: '12px', borderRight: 'solid 1px', minWidth: '40px' }}>{GetCategory(itemInfo.category)}</div>
                                <div style={{ display: 'table-cell', padding: '0 12px', borderRight: 'solid 1px' }}>{GetTimeGap(itemInfo.date)}</div>
                                <div style={{ display: 'table-cell', padding: '0 12px', borderRight: 'solid 1px', minWidth: '60px' }}>{itemInfo.writer}</div>
                                <div style={{ display: 'table-cell', padding: '0 12px', borderRight: 'solid 1px', minWidth: '40px' }}>조회: {itemInfo.views}</div>
                                <div style={{ display: 'table-cell', padding: '0 12px', borderRight: 'solid 1px', minWidth: '40px' }}>추천: {itemInfo.commends}</div>
                            </div>
                            <div className="app-board-content__body" style={{
                                marginTop: '30px',
                                padding: '12px',
                                width: '100%',
                                borderTop: '1px solid',

                            }}>
                                {htmlParse(itemInfo.content)}
                            </div>
                            <div className="app-board-content__comments" style={CommentStyle}>
                                <div className="app-board-content__comments__user" style={CommentUserStyle}>
                                    <div><b>Name:</b></div>
                                    <div>{user ? user.username : <InputBox width="80%" darkTheme={darkTheme} onChange={(e) => { setCommentUser(e.target.value) }} />}</div>
                                    <div><b>Password:</b></div>
                                    <div><InputBox type="password" width="80%" darkTheme={darkTheme} onChange={(e) => { setCommentPass(e.target.value) }} /></div>
                                </div>
                                <div className="app-board-content__comments__content" style={CommentContentStyle}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={commentContent}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setCommentContent(data);
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                        plugins
                                    />
                                </div>
                                <div className="app-board-content__comments__confirm" style={CommentConfirmStyle}>
                                    <StyledButton onClick={PostComment} width='100px'>Submit</StyledButton>
                                </div>
                            </div>
                            <div style={{ width: '100%', padding: '12px', borderBottom: '1px solid' }}>

                            </div>

                            {
                                _.map(comments, (comment) => {
                                    return <Comment key={comment.cid} data={comment} />
                                })
                            }

                        </div>
                    </BlockScreenWrapper>

                </div>
            }
        </>
    )
}
export default InBoard

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import Header from '../components/Header'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, LoadingStyle } from '../resources/styles'
import _ from 'lodash'
import { GetTimeGap, GetCategory } from '../resources/utils'
import axios from 'axios'
import { baseURL } from '../resources/config'
import editorjsParser from '../resources/editorjsParser'
import HTMLParser from 'html-react-parser'
import { CommentEditor } from '../resources/styles'
import styled from 'styled-components'

const boardContentStyle = {
    width: '99%',
    minHeight: '50%',
    margin: '10px auto',
}

const MoreCommentButton = styled.button`
    width: 100%;
    height: 48px;
    transition: .1s;
    border: 0;
    background: transparent;
    margin: auto;
    color: inherit;
    font-size: 1em;
    cursor: pointer;
    &:hover{
        background-color: #ccc;
    }
`


const InBoard = () => {
    const itemParam = useParams()

    const itemID = itemParam.id;
    const itemCategory = itemParam.category;

    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();

    const [commentUser, setCommentUser] = useState(user ? user.username : "");
    const [commentPass, setCommentPass] = useState("");
    const [commentContent, setCommentContent] = useState("");
    
    //const [contentView, setContentView] = useState(null)

    const [comments, setComments] = useState("");
    const [itemInfo, setItemInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isCommentLoading, setIsCommentLoading] = useState(false);

    const editorRef = useRef(null);
    const commentPage = useRef(1);
    const commentCount = useRef(0);
    const commentsPerPage = 3;

    async function HandleSave() {
        const savedData = await editorRef.current.save();
        setCommentContent(savedData)
    };
    
    useEffect(() => {
        console.log("ItemInfo: "+itemInfo.content)
        if (itemInfo){
            itemInfo.content = HTMLParser(editorjsParser(itemInfo.content))
        }
    }, [itemInfo])


    useEffect(() => {
        console.log(comments)
    }, [comments])
    useEffect(() => {
        console.log("ID: "+itemID)
        console.log("Category: "+itemCategory)
        commentPage.current = 1;
        //Getting an item
        axios({
            method: 'GET',
            url: `${baseURL}/board/${itemCategory}/${itemID}`
        }).then(res => {
            setItemInfo(res.data[0]);
        }).then(() => {
            //Getting Comments
            axios({
                method: 'GET',
                url: `${baseURL}/comment/${itemID}`,
                params: {
                    limit: commentsPerPage,
                    page: commentPage.current
                },
            })
                .then(res => {
                    setComments(res.data.comments);
                    commentCount.current = res.data.count;
                })
                .then(() => {
                    console.log("commentPage: ", commentPage.current);
                    console.log("commentCount: ", commentCount.current);
                    setIsLoading(false);
                })
        })
    }, [])

    const AddComment = () => {
        console.log("Iteminfo: "+itemInfo)
        setIsCommentLoading(true)
        commentPage.current += 1;
        axios({
            method: 'GET',
            url: `${baseURL}/comment/${itemID}`,
            params: {
                limit: commentsPerPage,
                page: commentPage.current
            },
        }).then((res) => {
            setComments(prev => [...prev, res.data.comments].flat());
            setIsCommentLoading(false)
        })
    }
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
                        <div className="board-content" style={boardContentStyle}>
                            <div className="board-content__title"><h1>{itemInfo.title}</h1></div>
                            <div className="board-content__meta" style={
                                { display: 'table', textAlign: 'center', marginTop: '20px', borderRadius: '4px' }}>
                                <div style={{ display: 'table-cell', paddingRight: '10px', borderRight: 'solid 1px', minWidth: '40px' }}>{GetCategory(itemInfo.category)}</div>
                                <div style={{ display: 'table-cell', padding: '0 10px', borderRight: 'solid 1px' }}>{GetTimeGap(itemInfo.date)}</div>
                                <div style={{ display: 'table-cell', padding: '0 10px', borderRight: 'solid 1px', minWidth: '60px' }}>{itemInfo.writer}</div>
                                <div style={{ display: 'table-cell', padding: '0 10px', borderRight: 'solid 1px', minWidth: '40px' }}>조회: {itemInfo.views}</div>
                                <div style={{ display: 'table-cell', padding: '0 10px', borderRight: 'solid 1px', minWidth: '40px' }}>추천: {itemInfo.commends}</div>
                            </div>
                            <div className="board-content__body" style={{
                                marginTop: '30px',
                                paddingTop: '18px',
                                width: '100%',
                                borderTop: '1px solid',
                                wordBreak: 'break-all'

                            }}>
                                {itemInfo.content}
                            </div>

                            <div style={{ width: '100%', borderBottom: '1px solid' }}>
                                <CommentEditor
                                    user={user}
                                    darkTheme={darkTheme}
                                    editorRef={editorRef}
                                    setUsername={setCommentUser}
                                    setPassword={setCommentPass}
                                    commentData={commentContent}
                                    saveHandler={HandleSave}
                                    postHandler={PostComment} />
                            </div>

                            {
                                _.map(comments, (comment) => {
                                    return <Comment key={comment.cid} data={comment} />
                                })
                            }
                            
                            {
                                (commentCount.current > (commentPage.current * commentsPerPage)) &&
                                <MoreCommentButton onClick={AddComment}>See other comments...</MoreCommentButton>
                            }
                            {
                                isCommentLoading &&
                                <LoadingStyle />
                            }


                        </div>

                    </BlockScreenWrapper>

                </div>
            }
        </>
    )
}
export default InBoard
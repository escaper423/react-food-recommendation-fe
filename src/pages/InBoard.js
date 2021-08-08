import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import Header from '../components/Header'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper,InputBox,StyledButton,TextArea } from '../resources/styles'
import _ from 'lodash'
import { GetTimeGap, GetCategory } from '../resources/utils'
import axios from 'axios'
import {baseURL} from '../resources/config'

const boardContentStyle = {
    width: '85%',
    minHeight: '50%',
    margin: '40px auto',
}

const CommentStyle = {
    display: 'flex',
    justifyContent:'center',
    margin: '30px auto',
    width: '100%',
    padding: '12px',
    backgroundColor:'grey'
}

const CommentUserStyle = {
    marginRight: '10px',
    width: '15%',
    minWidth: '90px'
}

const CommentContentStyle = {
    alignItems: 'center',
    width: '70%'   
}

const CommentConfirmStyle = {
    width: '15%',
    alignItems: 'center',
    display: 'flex',
}

const InBoard = () => {
    //const userInfo = useParams();
    const location = useLocation();
    const itemInfo = location.state;

    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
    const [commentUser, setCommentUser] = useState(user?user.username:"");
    const [commentPass, setCommentPass] = useState("");
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        axios({
            method: 'GET',
            url:`${baseURL}/comment`,
            params: {
                parentId: itemInfo._id
            }
        })
    },[])

    const PostComment = () => {
        console.log("Post Comment Function.")
        console.log("UserId: "+commentUser+ "\nUserPw: "+commentPass);

        const comment = {
            parentId: itemInfo._id,
            target: null,
            writer: commentUser,
            password: commentPass,
            content: commentContent,
            date: new Date().toString()
        }

        axios({
            method: 'POST',
            url: `${baseURL}/comment`,
            data: comment
        }).then(() =>{
            console.log("Comment created.");
        }).catch(err => {
            console.log("Cannot create comment.\n"+err);
        })
    }

    return (
        <div>
            <Header />
            <BlockScreenWrapper>
                <div className="app-board-content" style={boardContentStyle}>
                    <div className="app-board-content__title"><h1>{itemInfo.title}</h1></div>
                    <div className="app-board-content__meta" style={
                        {display: 'table', textAlign: 'center', marginTop:'20px', padding:'10px 0', borderRadius:'4px'}}>
                        <div style={{display: 'table-cell',  paddingRight: '12px', borderRight: 'solid 1px', minWidth:'40px'}}>{GetCategory(itemInfo.category)}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px'}}>{GetTimeGap(itemInfo.date)}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px', minWidth:'60px'}}>{itemInfo.writer}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px',minWidth:'40px'}}>조회: {itemInfo.views}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px',minWidth:'40px'}}>추천: {itemInfo.commends}</div>
                    </div>
                    <div className="app-board-content__body" style={{
                        marginTop: '30px',
                        padding: '12px',
                        width: '100%',
                        borderTop: '1px solid',

                    }}>
                        {itemInfo.content}
                    </div>
                    <div className="app-board-content__comments" style={CommentStyle}>
                        <div className="app-board-content__comments__user" style={CommentUserStyle}>
                            <div>Name:</div>
                            <div>{user?user.username:<InputBox width="80%" darkTheme={darkTheme} onChange={(e) => {setCommentUser(e.target.value)}}/>}</div>
                            <div>Password:</div>
                            <div><InputBox type="password" width="80%" darkTheme={darkTheme} onChange={(e) => {setCommentPass(e.target.value)}}/></div>
                        </div>
                        <div className="app-board-content__comments__content" style={CommentContentStyle}>
                            <TextArea darkTheme={darkTheme} onChange={(e) => {setCommentContent(e.target.value)}} />
                        </div>
                        <div className="app-board-content__comments__confirm" style={CommentConfirmStyle}>
                            <StyledButton onClick={PostComment} width='100px'>등록</StyledButton>
                        </div>
                    </div>
                    <div style={{width: '100%', padding: '12px', borderBottom: '1px solid'}}>
                    
                    </div>
                    
                    {
                        _.map(itemInfo.comments, (comment) => {
                            return <Comment key={comment.id} data={comment}/>
                        })
                    }
                    
                </div>
            </BlockScreenWrapper>

        </div>
    )
}

export default InBoard

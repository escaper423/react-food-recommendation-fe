import React, {useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import Header from '../components/Header'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper,InputBox,StyledButton,TextArea } from '../resources/styles'
import _ from 'lodash'

const boardContentStyle = {
    width: '85%',
    minHeight: '50%',
    margin: '40px auto',
}

const CommentStyle = {
    display: 'flex',
    justifyContent:'center',
    margin: '30px auto',
    width: '95%',
    padding: '12px',
    borderRadius: '4px',
    backgroundColor:'grey'
}

const CommentUserStyle = {
    marginRight: '30px',
    width: '10%',
    minWidth: '80px'
}

const CommentContentStyle = {
    alignItems: 'center',
    width: '80%'   
}

const CommentConfirmStyle = {
    width: '10%',
    alignItems: 'center',
    display: 'flex',
}


/*
id: 3,
    writer: "ncpc",
    date: new Date().toUTCString(),
    views: 333,
    title: "님들",
    content: "모함",
    categoryId: categoryId[3],
    categoryContent: categoryContents[3],
    comments: [],
*/

const InBoard = () => {
    //const userInfo = useParams();
    const location = useLocation();
    const itemInfo = location.state;

    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
    const [commentUser, setCommentUser] = useState(user?user.username:"");
    const [commentPass, setCommentPass] = useState("");

    const postComment = () => {
        console.log("Post Comment Function.")
        console.log("UserId: "+commentUser+ "\nUserPw: "+commentPass);
    }

    return (
        <div>
            <Header />
            <BlockScreenWrapper>
                <div className="app-board-content" style={boardContentStyle}>
                    <div className="app-board-content__title"><h1>{itemInfo.title}</h1></div>
                    <div className="app-board-content__meta" style={
                        {display: 'table', textAlign: 'center', marginTop:'20px', padding:'10px 10px', borderRadius:'4px'}}>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px', minWidth:'40px'}}>{itemInfo.categoryContent}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px'}}>{itemInfo.date}</div>
                        <div style={{display: 'table-cell',  padding: '0 12px', borderRight: 'solid 1px', minWidth:'100px'}}>{itemInfo.writer}</div>
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
                            <div>{user?user.username:<InputBox width="100%" darkTheme={darkTheme} onChange={(e) => {setCommentUser(e.target.value)}}/>}</div>
                            <div>Password:</div>
                            <div><InputBox type="password" width="100%" darkTheme={darkTheme} onChange={(e) => {setCommentPass(e.target.value)}}/></div>
                        </div>
                        <div className="app-board-content__comments__content" style={CommentContentStyle}>
                            <TextArea darkTheme={darkTheme} />
                        </div>
                        <div className="app-board-content__comments__confirm" style={CommentConfirmStyle}>
                            <StyledButton onClick={postComment} width='100px'>등록</StyledButton>
                        </div>
                    </div>
                    {
                        _.map(itemInfo.comments, (comment) => {
                            return <Comment data={comment}/>
                        })
                    }
                    
                </div>
            </BlockScreenWrapper>

        </div>
    )
}

export default InBoard

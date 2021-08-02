import React from 'react'
import Header from '../components/Header'
import { categoryContents } from '../resources/config'
import { UseAuthUser, UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, ConfirmButton, InputBox, SelectStyle } from '../resources/styles'
import _ from 'lodash'
import styled from 'styled-components'


const TmpStyle = {
    display: 'table-cell',
    width: '80px',
    padding: '5px 3px',
}

const FlexDiv = {
    display: 'table',
    width: '80%',
    margin: 'auto 0',
}

const Wrtie = () => {
    const user = UseAuthUser();
    const darkTheme = UseDarkTheme();
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
                    <form>
                        <div className="app-board-write__category" style={FlexDiv}>
                            <div style={TmpStyle}>종류:</div>
                            <SelectStyle width="60px">
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
                            <InputBox darkTheme={darkTheme} width='200px' />}
                        </div>
                        <div className="app-board-write__password" style={FlexDiv}>
                            <div style={TmpStyle}>비밀번호:</div><InputBox type="password" darkTheme={darkTheme} width='200px' />
                        </div>
                        <div className="app-board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>제목:</div><InputBox darkTheme={darkTheme} width='60%' />
                        </div>
                        <div className="app-board-write__content" style={FlexDiv}>
                            <div style={TmpStyle}>내용:</div><InputBox darkTheme={darkTheme} />
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

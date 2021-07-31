import React from 'react'
import Header from '../components/Header'
import { categories } from '../resources/config'
import { UseDarkTheme } from '../resources/ContextProvider'
import { BlockScreenWrapper, ConfirmButton, InputBox } from '../resources/styles'
import _ from 'lodash'
const TmpStyle = {
    width: '80px',
    padding: '5px 3px',
}

const FlexDiv = {
    display: 'flex'
}
const Wrtie = () => {
    const darkTheme = UseDarkTheme();
    return (
        <>
            <Header />
            <BlockScreenWrapper>
                <div className="app-board-write-head" style={{
                    marginTop: '60px',
                    textAlign: 'center',
                }}>
                    <h1>글 싸기</h1>
                    <p>아무 글이나 싸주세요.</p>
                </div>
                <div className="app-board-write-body" style={{
                    width: '90%',
                    margin: 'auto'

                }}>
                    <form>
                        <div className="app-board-write__category" style={FlexDiv}>
                            <div style={TmpStyle}>종류:</div>
                            <select>
                                {_.map(categories, (elem) => {
                                    return (
                                        <option value={elem}>{elem}</option>
                                    )
                                })  
                                }
                            </select>
                        </div>
                        <div className="app-board-write__title" style={FlexDiv}>
                            <div style={TmpStyle}>제목:</div><InputBox darkTheme={darkTheme} width='60%' />
                        </div>
                        <div className="app-board-write__password" style={FlexDiv}>
                            <div style={TmpStyle}>비밀번호:</div><InputBox darkTheme={darkTheme} width='30%' />
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

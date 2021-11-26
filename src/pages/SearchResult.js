import React from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chart from 'react-google-charts'
import { LoadingStyle } from '../resources/styles'
import { UseDarkTheme } from '../resources/ContextProvider'
import { textDark, textLight } from '../resources/colors'
import BarChart from './BarChart'
import noImage from '../resources/icons/noimage.jpg'
import FoodListItem from '../components/FoodListItem'

const dummyData = {
}

const SearchResult = () => {
    const navigate = useNavigate();
    const darkTheme = UseDarkTheme();
    const queryParams = new URLSearchParams(window.location.search);
    const twoTimesAgo = queryParams.get('twoTimesAgo')
    const oneTimeAgo = queryParams.get('oneTimeAgo')
    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
                lineHeight: '2.6em'
            }}>
                <div>
                    <h1>메뉴 추천 결과</h1>
                    <p>추천 우선순위는 현재 가장 많은 표본을 가진 데이터 수 입니다. &nbsp;추후 다른 기준을 적용할 예정입니다.</p>
                    <p>가장 최근에 먹은 음식</p>
                    <div style={{width: '192px', height: '192px', margin: 'auto'}}>
                        <img style={{borderRadius: '50%', width: '100%', height:'100%'}}
                            src={noImage}/>
                    </div>
                    
                    <FoodListItem />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult

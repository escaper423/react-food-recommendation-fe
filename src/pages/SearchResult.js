import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { LoadingStyle } from '../resources/styles'
import { UseDarkTheme } from '../resources/ContextProvider'
import { textDark, textLight } from '../resources/colors'
import noImage from '../resources/icons/noimage.jpg'
import FoodListItem from '../components/FoodListItem'
import _ from 'lodash'
import axios from 'axios'
import { dbURL } from '../resources/config'

const barWidth = 390;

const SearchResult = () => {
    const [sumAmount, setSumAmount] = useState(0)
    const [queryData, setQueryData] = useState([])

    useEffect(() => {
        axios({
            url: `${dbURL}/query`,
            method: 'GET',
            params: {
                name: oneTimeAgo
            }
        }).then(res => {
            console.log(res.data)
            setQueryData(res.data[0])
            setSumAmount(res.data[1])
        })
    }, [])

    const darkTheme = UseDarkTheme();
    const { state } = useLocation()

    const { twoTimesAgo, oneTimeAgo } = state;

    const getSum = (data) => {
        let sum = 0;
        _.map(data, (elem) => { return sum += elem.amount })
        return sum;
    }

    const showList = (elem) => {
        elem.ratio = elem.count / sumAmount
        elem.amount = parseInt(barWidth * elem.ratio)
        return <FoodListItem fData={elem} />
    }

    return(
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
                    <div style={{ width: '192px', height: '192px', margin: 'auto', marginBottom: '30px' }}>
                        <img style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                            src={noImage} alt="Food Image" loading="lazy" />
                    </div>
                    <h2>추천 음식들</h2>
                    {
                        _.map(queryData, showList)
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult

import React from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chart from 'react-google-charts'
import { LoadingStyle } from '../resources/styles'
import { UseDarkTheme } from '../resources/ContextProvider'
import { textDark, textLight } from '../resources/colors'
import BarChart from './BarChart'

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
            <div style={{ display: 'flex', width: '100%', position:'relative' }}>
                <BarChart darkTheme={darkTheme}/>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult

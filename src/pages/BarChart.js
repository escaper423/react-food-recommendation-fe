import React from 'react'
import Chart from "react-google-charts";
import { textLight, textDark } from '../resources/colors';
import { LoadingStyle } from '../resources/styles';


const BarChart = ({darkTheme, data}) => {
    return (
        <React.Fragment>
            <div style={{ display: 'flex', width: '100%', height: '100%', margin: 'auto' }}>
                <div style={{ width: '45%', height: '100%', margin: 'auto', textAlign: 'center' }}>
                    <Chart
                        width={'100%'}
                        height={'80%'}
                        chartType="BarChart"
                        loader={<LoadingStyle />}

                        data={[
                            [
                                'd',
                                'Density',
                                { role: 'style' },
                                {
                                    sourceColumn: 0,
                                    role: 'annotation',
                                    type: 'string',
                                    calc: 'stringify',
                                },
                            ],
                            ['Bronze', 8.94, '#b87333', null],
                            ['Silver', 10.49, 'silver', null],
                            ['Gold', 19.3, 'gold', null],
                            ['Platinum', 21.45, 'color: #a5f4b2', null],
                            ['Diamond', 21.45, 'color: #85a4e2', null],
                            ['Master', 3.45, 'color: #85a4e2', null],
                            ['Challenger', 1.45, 'color: #85a4e2', null],
                        ]}
                        options={{
                            height: 400,
                            chartArea: {
                                width: '70%',
                                height: '70%',
                            },
                            backgroundColor: 'transparent',
                            title: 'asdf',
                            titleTextStyle: {
                                fontName: "Comic Sans",
                                color: darkTheme ? textDark : textLight,
                                fontSize: 20
                            },
                            bar: { groupWidth: '40%' },
                            legend: { position: 'none' },
                            vAxis: {
                                textStyle: { color: darkTheme ? textDark : textLight },
                            },
                            hAxis: {
                                textStyle: { color: darkTheme ? textDark : textLight },
                                gridlines:{
                                    count: 0
                                }
                            },
                            animation: {
                                startup: true,
                                duration: 1000,
                                easing: 'out'
                            },
                        }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default BarChart

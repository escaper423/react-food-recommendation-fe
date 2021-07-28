import React from 'react';
import Header from '../Header';
import { UseAuthUser } from '../ContextProvider';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const user = UseAuthUser();

    if (!user) {
        return <Redirect to='/' />
    }

    return (
        <>
            <Header />
            <div>
                <p>Welcome {user}!</p>
            </div>
        </>
    )
}

export default Dashboard

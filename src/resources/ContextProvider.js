import React, { useState, useContext } from 'react';

const DarkTheme = React.createContext();
const SetDarkTheme = React.createContext();
const AuthUser = React.createContext();
const SetAuthUser = React.createContext();

export function UseDarkTheme() {
    return useContext(DarkTheme);
};

export function UseSetDarkTheme() {
    return useContext(SetDarkTheme);
}

export function UseAuthUser(){
    return useContext(AuthUser);
}

export function UseSetAuthUser(){
    return useContext(SetAuthUser);
}

function ContextProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true);
    const [authUser, setAuthUser] = useState(null); //login info: tokens, name
   
    function ToggleTheme(to) {
        return setDarkTheme(to);
    }

    function UpdateAuthUser(to) {
        return setAuthUser(to);
    }

    return (
        <AuthUser.Provider value={authUser}>
            <SetAuthUser.Provider value={UpdateAuthUser}>
                <DarkTheme.Provider value={darkTheme}>
                    <SetDarkTheme.Provider value={ToggleTheme}>
                        {children}
                    </SetDarkTheme.Provider>
                </DarkTheme.Provider>
            </SetAuthUser.Provider>
        </AuthUser.Provider>
    )
}

export default ContextProvider;

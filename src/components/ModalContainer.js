import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
const ModalContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
`
const ModalContainer = ({ isopen }) => {
    if (!isopen)
        return null

    const modalRoot = document.getElementById('root-portal')
    return ReactDOM.createPortal(
        <ModalContainerStyle>
            <img src="../resources/trashbin.png"></img>
        </ModalContainerStyle>
        , modalRoot)
}

export default ModalContainer

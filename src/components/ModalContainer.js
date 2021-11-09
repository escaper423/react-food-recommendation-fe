import React, {useState} from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import trashbin from '../resources/icons/trashbin.png';
import { InputBox, StyledButton } from '../resources/styles';
import axios from 'axios'
import {baseURL} from '../resources/config'
const ModalContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
`

const ModalContainer = ({ isDeleting, setIsDeleting, item }) => {
    const [deletePassword, setDeletePassword] = useState("");
    const DeleteBoardItem = () =>{
        //acutal delete board item function
        let itemCategory;
        let itemID;
        //is it post?
        if(item._id && !item.cid && !item.rid){
            itemCategory = "board";
            itemID = item._id;
        }

        //is it comment?
        else if(item.cid && !item.target){
            itemCategory = "comment";
            itemID = item.cid;
        }

        //is it reply?
        else if(item.rid){
            itemCategory = "reply";
            itemID = item.rid;
        }

        console.log("Delete category: "+itemCategory);
        axios({
            method: 'DELETE',
            url: `${baseURL}/${itemCategory}/${itemID}`,
            params:{
                password: deletePassword
            }
        }).then(res => {
            setIsDeleting(false);
            window.location.reload();
        }).catch(err => {
            console.log(err);
            let msg = document.querySelector('.comment-delete__message');

            if(err.response.data)
                msg.innerHTML = err.response.data;
            else
                msg.innerHTML = err;
        })
    }
    if (!isDeleting)
        return null

    const modalRoot = document.getElementById('root-portal')
    return ReactDOM.createPortal(
        <>
            <ModalContainerStyle onClick={() => { setIsDeleting(false) }} />
            <div className="comment-delete-container" style={{
                position: 'fixed',
                textAlign: 'center',
                verticalAlign: 'middle',
                top: '50%',
                left: '50%',
                display: 'flex',
                width: '400px',
                height: '200px',
                backgroundColor: '#eeeeee',
                zIndex: '1001',
                transform: 'translateX(-50%) translateY(-50%)',
            }}>
                <div className="comment-delete__image" style={{
                    width: '150px',
                    margin: 'auto'
                }}>
                    <img src={trashbin} style={{
                        height: '60%',
                        width: '100%',
                    }}></img>
                </div>
                <div className="comment-delete__confirm" style={{
                    margin: "auto",
                }}>
                    Enter password to delete
                    <InputBox type="password" onChange={(e) => {setDeletePassword(e.target.value)}}/>
                    <div className="comment-delete__confirm__buttons" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '30px',
                        gap: '20px',
                    }}>
                        <StyledButton width='60px' height='40px' onClick={DeleteBoardItem}>
                            Delete
                        </StyledButton>
                        <StyledButton width='60px' height='40px' onClick={() => {setIsDeleting(false)}}>
                            Cancel
                        </StyledButton>
                    </div>
                    <span className="comment-delete__message" style={{color: 'red'}}></span>
                </div>
            </div>
        </>
        , modalRoot)
}

export default ModalContainer

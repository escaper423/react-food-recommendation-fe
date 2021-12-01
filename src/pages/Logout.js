import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { UseSetAuthUser } from '../resources/ContextProvider';
import axios from 'axios';
import { baseURL } from '../resources/config';

const Logout = () => {
    const RemoveAuth = UseSetAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
    axios({
        method: 'POST',
        url: `${baseURL}/logout`,
        withCredentials: true,
        credentials: 'include'
    }).then(()=>{
        RemoveAuth(null);
        navigate('/');
    })}, [])

    return null;
}

export default Logout
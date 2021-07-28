import {useHistory} from 'react-router-dom';
import { UseSetAuthUser } from '../resources/ContextProvider';
import axios from 'axios';

const Logout = () => {
    const RemoveAuth = UseSetAuthUser();
    const history = useHistory();

    axios({
        method: 'POST',
        url: 'http://localhost:3001/logout',
        withCredentials: true,
        credentials: 'include'
    }).then(()=>{
        RemoveAuth(null);
        history.push('/');
    });

    return null;
}

export default Logout
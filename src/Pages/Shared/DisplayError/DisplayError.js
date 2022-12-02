import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const DisplayError = () => {
    const {logout} = useContext(AuthContext)
    const error = useRouteError();

    const handleLogout =()=>{
        logout()
        .then(res=>res.json())
        .catch(error=>console.log(error))
    }
    return (
        <div>
            <p className="text-error">Something went wrong!!</p>
            <p>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button onClick={handleLogout}>
                Sign out</button> and log back in.</h4>
        </div>
    );
};

export default DisplayError;
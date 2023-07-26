import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import UilAngleDoubleRight from '@iconscout/react-unicons/icons/uil-angle-double-right';
import React, { useState } from 'react';
const users = require('../testJSON/users.json')

const Login = (props) => {
    const [error, setError] = useState('')
    const handleLoginClick = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let userLogin = users.find(val => val.username === username && val.password === password)
        if(userLogin.length !== 0) {
            if(props.fromAdmin && userLogin.role !== 'admin') {
                setError('This user not Admin!!')
            } else {
                setError('');
                props.handleLogin(userLogin)
            }
        } else {
            setError('The username or password is incorrect')
        }
    }
    return (
        <div className='modal-container'>
            <div className='modal-header'>
                <div className='title'>Log in</div>
                <UilTimes size={48} color="#ffffff" onClick={props.handleCloseModal} />
            </div>
            <div className='modal-body'>
                <input className='modal-input' type='text' placeholder="Username" id="username" />
                <input className='modal-input' type="password" placeholder="Password" id="password" />
                <div className='error-message'>{error}</div>
            </div>
            <div className='modal-footer'>
                <div></div>
                <div className='modal-button-div'>
                    <button className='modal-button' onClick={handleLoginClick}>Login</button>
                </div>
                <div><button className='modal-button flex-center' onClick={props.registerClick}>Register <UilAngleDoubleRight size={32} /></button></div>
            </div>
        </div>
    );
}
 
export default Login;
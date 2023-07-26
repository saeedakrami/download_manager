import UilAngleDoubleRight from '@iconscout/react-unicons/icons/uil-angle-double-right';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import React, { useState } from 'react';
const users = require('../testJSON/users.json')

const Signup = (props) => {
    const [error, setError] = useState('');
    const handleRegisterClick = () => {
        let username = document.getElementById('register_username').value;
        let password = document.getElementById('register_password').value;
        let confirm_password = document.getElementById('register_confirm_password').value;
        let checkUser = users.filter(val => val.username === username);
        if(password !== confirm_password) {
            setError('The password and confirm password is not match!')
        } else if(checkUser.length > 0) {
            setError('Your username is not active! please set another username')
        } else {
            setError('');
            users.push({ID: users.length + 1, username: username, password: password, role: "user"})
            props.handleCloseModal();
        }
    }

    return (
        <div className='modal-container'>
            <div className='modal-header'>
                <div className='title'>Register</div>
                <UilTimes size={48} color="#ffffff" onClick={props.handleCloseModal} />
            </div>
            <div className='modal-body'>
                <form autoComplete="off">
                    <input name='username' className='modal-input' type='text' placeholder="Username" id="register_username" autoComplete="off" />
                    <input className='modal-input' type="password" placeholder="Password" id="register_password" autoComplete="new-password" />
                    <input className='modal-input' type="password" placeholder="Confirm Password" id="register_confirm_password" autoComplete="new-password" />
                </form>
                <div className='error-message'>{error}</div>
            </div>
            <div className='modal-footer'>
                <div></div>
                <div className='modal-button-div'>
                    <button className='modal-button' onClick={handleRegisterClick}>Signup</button>
                </div>
                <div><button className='modal-button flex-center' onClick={props.loginClick}>Login <UilAngleDoubleRight size={32} /></button></div>
            </div>
        </div>
    );
}
 
export default Signup;
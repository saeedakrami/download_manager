import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import React from 'react';

const Signout = (props) => {
    return (
        <div className='modal-container'>
            <div className='modal-header'>
                <div className='title'>Sign Out</div>
                <UilTimes size={48} color="#ffffff" onClick={props.handleCloseModal} />
            </div>
            <div className='modal-body'>
                <span className='modal-text'>Are you sure to signout?</span>
            </div>
            <div className='modal-footer'>
                <div></div>
                <div className='modal-button-div'>
                    <button className='modal-button' onClick={props.handleSignoutClick}>Yes</button>
                </div>
                <div><button className='modal-button flex-center' onClick={props.handleCloseModal}>No</button></div>
            </div>
        </div>
    );
}
 
export default Signout;
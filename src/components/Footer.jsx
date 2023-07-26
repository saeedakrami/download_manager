import React, { useEffect, useState } from 'react';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilPlay from '@iconscout/react-unicons/icons/uil-play';
import UilPause from '@iconscout/react-unicons/icons/uil-pause';

const Footer = (props) => {
    const [showNew, setShowNew] = useState(false);
    useEffect(() => {
    },[props.itemSelected])
    const newClick = () => {
        if(props.isLogin) setShowNew(!showNew);
    }

    const hideNew = () => {
        setShowNew(false);
    }
    const addNewClick = (type) => {
        hideNew();
        props.addNewClick(type)
    }
    return (
        <div className='footer-container'>
                <div className='footer-icons'>
                    <span className={props.isLogin ? "footer-icons-span active" : "footer-icons-span"} onClick={newClick}>
                        <UilPlus size={48} />
                        New
                    </span>
                    <span className={(props.isLogin && props.itemSelected.length !== 0) ? "footer-icons-span active" : "footer-icons-span"} onClick={props.trashClick}>
                        <UilTrashAlt size={48} />
                        Delete
                    </span>
                    <span className={(props.isLogin && props.itemSelected.length !== 0) ? "footer-icons-span active" : "footer-icons-span"} onClick={props.pauseClick}>
                        <UilPause size={48} />
                        Pause
                    </span>
                    <span className={(props.isLogin && props.itemSelected.length !== 0) ? "footer-icons-span active" : "footer-icons-span"} onClick={props.resumeClick}>
                        <UilPlay size={48} />
                        Resume
                    </span>
                    {showNew && (
                        <ul>
                            <li onClick={() => addNewClick('addUrl')}>New URL</li>
                            <li onClick={() => addNewClick('addFile')}>New File</li>
                        </ul>
                    )}
                </div>
        </div>
    );
}
 
export default Footer;
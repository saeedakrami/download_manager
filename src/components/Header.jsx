import React, { useState } from 'react';

const Header = ({handleLoginClick, handleSignupClick, handleTabsClick, selectedTab, userLogin, handleSignoutClick, handleAdminPanelClick, fromAdmin}) => {
    const [show, setShow] = useState(false)

    const signoutClick = () => {
        setShow(false);
        handleSignoutClick();
    }

    const adminPanelClick = () => {
        setShow(false);
        handleAdminPanelClick()
    }

    return (
        <div className='header-container'>
            <div className='header-logo'>Logo</div>
            <div className='header-right'>
                <div className='header-login'>
                    {!userLogin.username ? (
                        <><span onClick={handleLoginClick}>Login</span> / <span onClick={handleSignupClick}>Register</span></>
                    ): (
                        <span>Welcome, <span style={{fontWeight: "bold", fontSize: "24px"}} onClick={() => setShow(!show)}>{userLogin.username}</span></span>
                    )}
                    {show && (
                        <ul>
                            {userLogin.role === "admin" && (
                                <li onClick={adminPanelClick}>{fromAdmin ? "My Panel" : "Admin Panel"}</li>
                            )}
                            <li onClick={signoutClick}>Signout</li>
                        </ul>
                    )}
                </div>
                    <div className='header-tabs'>
                    <ul>
                        <li className={selectedTab === "All" ? "selected" : ""} onClick={() => handleTabsClick('All')}>All</li>
                        <li className={selectedTab === "Incomplete" ? "selected" : ""} onClick={() => handleTabsClick('Incomplete')}>Incomplete</li>
                        <li className={selectedTab === "Complete" ? "selected" : ""} onClick={() => handleTabsClick('Complete')}>Compelete</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Header;
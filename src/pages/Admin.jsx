import React from 'react';
import Header from '../components/Header';
import Login from './Login';
import Modal from '../components/Modal';
import Signup from './Signup';
import AddUrl from './AddUrl';
import AddFile from './AddFile';
import Queue from '../components/Queue';
import Footer from '../components/Footer';
import DownloadList from '../components/DownloadList';
import FileType from '../components/FileType';
import Signout from './Signout';
const Downloads = require('../testJSON/downloads.json');
const Users = require('../testJSON/users.json');

class Admin extends React.Component {
    state = {
        selectedTab: 'All',
        modalOpen: false,
        modalChildren: null,
        selectedQueue: 'All',
        selectedType: 'All',
        itemSelected: [],
        userLogin: {},
        downloadList: [],
    } 

    componentDidMount() {
        let user = localStorage.getItem('username');
        if(user) {
            let userLogin = Users.find(val => val.username === user);
            this.setState({userLogin}, () => this.setDownloadList())
        }
    }

    handleLoginClick = () => {
        this.setModalChildren('login')
        this.setState({modalOpen: true})
    }

    handleSignupClick = () => {
        this.setModalChildren('register')
        this.setState({modalOpen: true})
    }

    handleSignoutClick = () => {
        this.setModalChildren('signout')
        this.setState({modalOpen: true})
    }

    addnewClick = (type) => {
        this.setModalChildren(type)
        this.setState({
            modalOpen: true
        })
    }

    handleTabsClick = (tab) => {
        this.setState({selectedTab: tab}, () => this.setDownloadList())
    }

    handleQueueClick = (queue) => {
        this.setState({selectedQueue: queue}, () => this.setDownloadList())
    }

    handleTypeClick = (type) => {
        this.setState({selectedType: type}, () => this.setDownloadList())
    }

    setModalChildren = (modal) => {
        const modalName = ['login', 'register', 'addUrl', 'addFile', 'signout'];
        const modalComponent = [
            <Login handleLogin={this.handleLogin} handleCloseModal={() => this.setState({modalOpen: false})} registerClick={this.handleSignupClick} fromAdmin={true} />, 
            <Signup handleCloseModal={() => this.setState({modalOpen: false})} loginClick={this.handleLoginClick} />, 
            <AddUrl 
                userLogin={this.state.userLogin}
                handleCloseModal={() => this.setState({modalOpen: false})}
                addDownload={this.handleAddDownload}
            />, 
            <AddFile 
                userLogin={this.state.userLogin}
                handleCloseModal={() => this.setState({modalOpen: false})}
                addDownload={this.handleAddDownload}
            />,
            <Signout
                handleCloseModal={() => this.setState({modalOpen: false})}
                handleSignoutClick={this.handleSignout}
            />
        ]
        this.setState({modalChildren: modalComponent[modalName.indexOf(modal)]})
    }

    handleAddDownload = (type, data) => {
        
        let prevDownload = [...this.state.downloadList];
            prevDownload.push({
                ID: this.state.downloadList.length + 1,
                address: data.address,
                file_name: data.file_name,
                size: data.size ? data.size : Math.ceil(Math.random()*1024*1024*Math.random()*1024),
                downloaded_size: 0,
                completed: false,
                queue: ["All", data.queue.name],
                tab: "Incomplete",
                file_type: data.file_type,
                status: data.type.status,
                start_date: new Date().toUTCString(),
                end_date: null,
                transfer_rate: data.type.status === 'paused' ? '---' : Math.ceil(Math.random()*1024*1024),
                user_ID: this.state.userLogin.ID
            })

            this.setState({downloadList: prevDownload});
            this.setState({modalOpen: false})

    }

    handleLogin = (user) => {
        this.setState({userLogin: user, modalOpen: false, selectedTab: 'All', selectedQueue: 'All'}, () => this.setDownloadList())
        localStorage.setItem("username", user.username)
    }

    handleSignout = () => {
        this.setState({userLogin: {}, modalOpen: false, downloadList: []});
        localStorage.removeItem('username')
    }

    setDownloadList = () => {
        const {userLogin, selectedTab, selectedQueue, selectedType} = this.state;
        let downloadList = Downloads.filter(
            val => (selectedTab !== 'All' ? val.tab === selectedTab : val.tab === 'Complete' || 'Incomplete') && 
            (val.queue.indexOf(selectedQueue) !== -1) && 
            (selectedType !== 'All' ? val.file_type === selectedType : val.file_type === 'document' || 'music' || 'video' || 'program' || 'image' || 'compress'));      
        this.setState({downloadList})
    }

    handleClickRow = (id, multi) => {
        let items = this.state.itemSelected;
        if(multi) {
            if(items.indexOf(id) === -1) items.push(id)
        }else {
            items = [id];
        }
        this.setState({itemSelected: items})
    }

    handleRemoveRow = (id) => {
        let items = this.state.itemSelected;
        items = items.filter(val => val !== id);
        this.setState({itemSelected: items})
    }

    handleRemoveAll = () => {
        this.setState({itemSelected: []})
    }

    handleTrashClick = () => {
        let {downloadList, itemSelected} = this.state;
        downloadList = downloadList.filter(val => itemSelected.indexOf(val.ID) === -1)
        this.setState({downloadList});
    }

    handlePauseClick = () => {
        let {downloadList, itemSelected} = this.state;
        downloadList.map(item => {
            if(itemSelected.indexOf(item.ID) !== -1 && item.status === 'downloading') {
                item.status = 'paused';
                item.transfer_rate = null;
            }
        })
        this.setState({downloadList});
    }

    handleResumeClick = () => {
        let {downloadList, itemSelected} = this.state;
        downloadList.map(item => {
            if(itemSelected.indexOf(item.ID) !== -1 && item.status === 'paused') {
                item.status = 'downloading';
                item.transfer_rate = Math.random()*1024*Math.random()*1024;

            }
        })
        this.setState({downloadList})
    }

    handleAdminPanelClick = () => {
        document.location = '/'
    }

    render() { 
        const {selectedTab, modalChildren, modalOpen, selectedQueue, itemSelected, userLogin, downloadList, selectedType} = this.state;
        return (
            <div className='main-container'>
                <Header 
                    selectedTab={selectedTab} 
                    handleTabsClick={this.handleTabsClick} 
                    handleLoginClick = {this.handleLoginClick} 
                    handleSignupClick = {this.handleSignupClick} 
                    userLogin = {userLogin}
                    handleSignoutClick = {this.handleSignoutClick}
                    handleAdminPanelClick = {this.handleAdminPanelClick}
                    fromAdmin={true}
                />
                <div className='main'>
                    <FileType
                        selectedType={selectedType}
                        handleTypeClick = {this.handleTypeClick}
                    />
                    <div className='full-main'>
                        <Queue 
                            userLogin={userLogin}
                            selectedQueue={selectedQueue}
                            handleQueueClick = {this.handleQueueClick}
                        />
                        <DownloadList 
                            downloadList={downloadList}
                            clickRow={this.handleClickRow}
                            removeRow={this.handleRemoveRow}
                            itemSelected={itemSelected}
                            removeAll={this.handleRemoveAll}
                            fromAdmin={true}
                        />
                    </div>
                </div>
                <Footer 
                    isLogin={userLogin.username}
                    itemSelected={itemSelected}
                    addNewClick={this.addnewClick}
                    trashClick={this.handleTrashClick}
                    pauseClick={this.handlePauseClick}
                    resumeClick={this.handleResumeClick}
                />
                <Modal open={modalOpen} closeClick={() => this.setState({modalOpen: false})}>{modalChildren}</Modal>
            </div>
        );
    }
}


 
export default Admin;
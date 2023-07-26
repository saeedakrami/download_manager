import React from 'react';
import Progrss from './Progress';
import UilFile from '@iconscout/react-unicons/icons/uil-file';
import UilMusic from '@iconscout/react-unicons/icons/uil-music';
import UilVideo from '@iconscout/react-unicons/icons/uil-video';
import UilWindows from '@iconscout/react-unicons/icons/uil-windows';
import UilImage from '@iconscout/react-unicons/icons/uil-image';
import UilCompressLines from '@iconscout/react-unicons/icons/uil-compress-lines';
import UilPauseCircle from '@iconscout/react-unicons/icons/uil-pause-circle';
import UilCheckCircle from '@iconscout/react-unicons/icons/uil-check-circle';
import UilTimesCircle from '@iconscout/react-unicons/icons/uil-times-circle';
const Users = require('../testJSON/users.json');

const DownloadList = ({downloadList, clickRow, itemSelected, removeRow, removeAll, fromAdmin}) => {
    const setSize = (size, suffix) => {
        let changedSize = "";
        if(size >= 1073741824) changedSize = (size/1073741824).toFixed(2) + "G" + suffix;
        else if(size >= 1048576) changedSize = (size/1048576).toFixed(2) + "M" + suffix;
        else if(size >= 1024) changedSize = (size/1024).toFixed(2) + "K" + suffix;
        else if(size > 0) changedSize = size + suffix;
        else changedSize = '---';
        return changedSize;
    }

    const setTypeIcon = (type) => {
        const types = ['document', 'music', 'video', 'compressed', 'program', 'image'];
        const icons = [
            {icon: <UilFile size={64} />, color: "#5333AF"},
            {icon: <UilMusic size={64} />, color: "#5CA718"},
            {icon: <UilVideo size={64} />, color: "#277FA5"},
            {icon: <UilCompressLines size={64} />, color: "#FD9307"},
            {icon: <UilWindows size={64} />, color: "#D54B27"},
            {icon: <UilImage size={64} />, color: "#FFD732"}
        ];
        return icons[types.indexOf(type)];
    }
    const setDateAndTime = (date) => {
        if(date !== null) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let d = new Date(date);
            let createDate = `${months[d.getMonth()]} ${twoDigits(d.getDate())} ${d.getFullYear()}, ${twoDigits(d.getHours())}:${twoDigits(d.getMinutes())}:${twoDigits(d.getSeconds())}`;
            return createDate
        }
        return null;
    }
    const twoDigits = (digit) => {
        if(digit.toString().length === 1) {
            return "0" + digit;
        }else {
            return digit;
        }
    }

    const calculateTimeLeft = (size, download, rate) => {
        let percent = download/size*100;
        if(percent < 100 && rate) {
            let undownloadedSize = size - size*percent/100;
            let timeRemaining = undownloadedSize/rate;
            return setTime(timeRemaining);
        }
    }

    const setTime = (time) => {
        let hour, minutes, second, changedTime;
        hour = Math.floor(time/3600);
        time -= hour*3600;
        minutes = Math.floor(time/60);
        time -= minutes*60;
        second = Math.round(time);
        changedTime = twoDigits(hour) + ":" + twoDigits(minutes) + ":" + twoDigits(second);
        return changedTime;
    }

    const statusIcon = (status) => {
        const statuses = ['completed', 'paused', 'failed'];
        const icons = [<UilCheckCircle size={48} color="green" />, <UilPauseCircle size={48} color="orange" />, <UilTimesCircle size={48} color="red" />]
        return icons[statuses.indexOf(status)];
    }

    const selectAll = (e) => {
        if(e.target.checked) {
            downloadList.map(item => {
                clickRow(item.ID, true)
            });
        } else {
            removeAll();
        }
    }

    const selectRow = (e, id) => {
        if(e.target.checked) {
            clickRow(id, true)
        }else {
            removeRow(id)
        }
    }
    
    return (
        <div className='downlod-container'>
            <table>
                <thead>
                    <tr>
                        {itemSelected.length>0 && (
                            <th style={{width: "50px"}}><input type="checkbox" onChange={selectAll} /></th>
                        )}
                        <th>File Type</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Percent</th>
                        <th>Time Left</th>
                        <th>Transfer Rate</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        {fromAdmin && (
                            <th>User</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {downloadList.length > 0 && downloadList.map(item => (
                        <tr key={item.ID} id={"row-" + item.ID} onClick={() => clickRow(item.ID, false)} className={itemSelected.indexOf(item.ID) !== -1 ? "selected" : ""}>
                            {itemSelected.length>0 && (
                                <td><input type="checkbox" onChange={(e) => selectRow(e, item.ID)} checked={itemSelected.indexOf(item.ID) !== -1} /></td>
                            )}
                            <td><div className='table-type-icon'><div style={{backgroundColor: setTypeIcon(item.file_type).color}}>{setTypeIcon(item.file_type).icon}</div></div></td>
                            <td>{item.file_name}</td>
                            <td>{setSize(item.size, 'B')}</td>
                            <td>{item.status === 'completed' ? 'Complete' : <Progrss percent={item.downloaded_size/item.size*100} />}</td>
                            <td>{item.status === "downloading" ? calculateTimeLeft(item.size, item.downloaded_size, item.transfer_rate) : statusIcon(item.status)}</td>
                            <td>{setSize(item.transfer_rate, 'B/S')}</td>
                            <td>{setDateAndTime(item.start_date)}</td>
                            <td>{setDateAndTime(item.end_date)}</td>
                            {fromAdmin && (
                                <td>{Users.find(val => val.ID === item.user_ID).username}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default DownloadList;
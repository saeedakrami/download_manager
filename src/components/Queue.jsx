import React, { useEffect, useState } from 'react';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
const queues = require('../testJSON/queues.json');

const Queue = ({handleQueueClick, selectedQueue, userLogin}) => {
    const [show, setShow] = useState(false);
    const [userQueue, setUserQueue] = useState([]);

    useEffect(() => {
        setShow(false);
    },[selectedQueue])
    const setQueueName = (queue) => {
        if(queue === 'All') return 'All Queue';
        return capitalize(queue); 
    }
    const showQueues = () => {
        let userQueue = queues.filter(val => val.user_created === userLogin.ID || val.user_created === 0)
        setUserQueue(userQueue);
        setShow(!show);
    }
    const capitalize = (queue) => {
        return queue.charAt(0).toUpperCase() + queue.slice(1);
    }
    return (
        <div className='queue-container'>
            <div className='queue-select' onClick={showQueues}>{setQueueName(selectedQueue)} <UilAngleDown /></div>
            {show && (
                <ul>
                    <li className={selectedQueue === "All" ? "selected" : ""} onClick={() => handleQueueClick('All')}>All Queue</li>
                    {userQueue.map(queue => 
                        (
                            <li className={selectedQueue === queue.name ? "selected" : ""} onClick={() => handleQueueClick(queue.name)}>{capitalize(queue.name)}</li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
}
 
export default Queue;
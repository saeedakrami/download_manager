import React from 'react';

const Progrss = ({percent}) => {
    return (
        <div className='progress'>
            <div className='progress-back'>
                <div className='progress-front' style={{width: `${percent}%`}} />
            </div>
        </div>
    );
}
 
export default Progrss;
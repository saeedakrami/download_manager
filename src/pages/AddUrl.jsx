import React, { useEffect, useState } from 'react';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import Select from '../components/Select';
import Input from '../components/Input';
const queues = require('../testJSON/queues.json');
const types = require('../testJSON/types.json');

const AddUrl = ({userLogin, handleCloseModal, addDownload}) => {
    const [userQueue, setUserQueue] = useState([]);
    const [typesOption, setTypesOption] = useState([]);
    const [showOptions, setShowOptions] = useState('');
    const [formValues, setFormValues] = useState({})
    const [error, setError] = useState('');
    const [inputError, setInputError] = useState([]);
    const [formatError, setFormatError] = useState(false);
    useEffect(()=> {
        setOptions();
    },[])
    
    const setOptions = () => {
        let userQueue = queues.filter(val => val.user_created === userLogin.ID || val.user_created === 0)
        setUserQueue(userQueue);
        setTypesOption(types)
    }
    const handleShowOptions = (option) => {
        if(showOptions === option) setShowOptions('');
        else setShowOptions(option);
    }
    
    const downloadClick = () => {
        checkInputError();
        if(!formValues.address) {
            setError('The Url address is empty!');
        } else if(formValues.address.indexOf('http://') === -1 && formValues.address.indexOf('https://') === -1 || formatError) {
            setError('The Url address is not correct!');
        } else if(!formValues.queue) {
            setError('The Queue not selected!');        
        } else if(!formValues.file_name) {
            setError('The file name is empty!')
        } else if(!formValues.type) {
            setError('The type is empty!')
        } else {
            setError('');
            addDownload('url', formValues);
        }

    }
    const checkInputError = () => {
        let prevInputError = inputError;
        if (!formValues.address || (formValues.address.indexOf('http://') === -1 && formValues.address.indexOf('https://') === -1) || formatError) (prevInputError.indexOf('address') === -1) && prevInputError.push('address');
        else (prevInputError.indexOf('address') !== -1) && prevInputError.splice(prevInputError.indexOf('address'),1);
        if (!formValues.queue) (prevInputError.indexOf('queue') === -1) && prevInputError.push('queue');
        else (prevInputError.indexOf('queue') !== -1) && prevInputError.splice(prevInputError.indexOf('queue'),1);
        if (!formValues.file_name) (prevInputError.indexOf('file_name') === -1) && prevInputError.push('file_name');
        else (prevInputError.indexOf('file_name') !== -1) && prevInputError.splice(prevInputError.indexOf('file_name'),1);
        if (!formValues.type) (prevInputError.indexOf('type') === -1) && prevInputError.push('type');
        else (prevInputError.indexOf('type') !== -1) && prevInputError.splice(prevInputError.indexOf('type'),1);
        setInputError(prevInputError);
    }

    const checkFormat = () => {
        const suffixType = {
            document: ['doc', 'xls', 'txt', 'pdf', 'csv'],
            video: ['mp4', 'mpeg4', 'avi', 'mkv', 'webm', 'flv'],
            music: ['mp3', 'wma', 'wav', 'ogg'],
            image: ['jpg', 'png', 'webp', 'bmp', 'ico'],
            program: ['exe', 'iso'],
            compressed: ['zip', 'rar']
        }
        let file_type = Object.values(suffixType).map((items, i) => {
            let item = items.find(val => formValues.address.indexOf(val) !== -1);            
            if(item) return Object.keys(suffixType)[i];
        });
        let file_format = file_type.find(val=> val !== undefined);
        if(file_format) return file_format;
        else return false
    }

    const handleFormChange = (id, value) => {
        let values = formValues;
        values[id] = value;
        let file_type;
        if(id === 'address') {
            file_type = checkFormat()
            if(file_type) {
                values.file_type = file_type;
                setFormatError(false)
            } else setFormatError(true) 
        }
        setFormValues(values);
        setShowOptions('');
    }
    return (
        <div className='modal-container'>
            <div className='modal-header'>
                <div className='title'>New Download</div>
                <UilTimes size={48} color="#ffffff" onClick={handleCloseModal} />
            </div>
            <div className='modal-body'>
                <form autoComplete='off'>
                    <Input 
                        inputClass='modal-input' 
                        type='text' 
                        placeholder="Address" 
                        label="Address:" 
                        id="address" 
                        labelClass='modal-label' 
                        onFormChange={handleFormChange} 
                        onClick={handleShowOptions}
                        inputError={inputError}    
                    />
                    <Select 
                        name='queue'
                        selected={formValues.queue}
                        showOptions={showOptions}
                        options={userQueue}
                        handleShowOptions={handleShowOptions}
                        label="Queue:"
                        labelClass="modal-label"
                        defaultText="Select Queue"
                        tabIndex={0}
                        onFormChange={handleFormChange}
                        inputError={inputError}
                    />
                    <Input 
                        inputClass='modal-input' 
                        type="text" 
                        placeholder="File Name" 
                        label="File Name:" 
                        id="file_name" 
                        labelClass='modal-label' 
                        onFormChange={handleFormChange} 
                        onClick={handleShowOptions}
                        inputError={inputError}    
                    />
                    <Input 
                        inputClass='modal-input' 
                        type='number' 
                        placeholder="Rate Limit" 
                        label="Rate Limit(KB):" 
                        id="rate_limit" 
                        labelClass="modal-label" 
                        onFormChange={handleFormChange} 
                        onClick={handleShowOptions}
                        inputError={inputError}
                    />
                    <Select
                        name="type"
                        selected={formValues.type}
                        showOptions={showOptions}
                        options={typesOption}
                        handleShowOptions={handleShowOptions}
                        label="Type:"
                        labelClass="modal-label"
                        defaultText="Select Type"
                        tabIndex={1}
                        onFormChange={handleFormChange}
                        inputError={inputError}
                    />
                </form>
                <div className='error-message'>{error}</div>
            </div>
            <div className='modal-footer'>
                <div></div>
                <div className='modal-button-div'>
                    <button className='modal-button' onClick={downloadClick}>Submit</button>
                </div>
                <div><button className='modal-button' onClick={handleCloseModal}>Cancel</button></div>
            </div>
        </div>
    );
}
 
export default AddUrl;
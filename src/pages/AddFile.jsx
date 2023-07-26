import React, { useEffect, useState } from 'react';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import Select from '../components/Select';
import Input from '../components/Input';
const queues = require('../testJSON/queues.json');
const types = require('../testJSON/types.json');

const AddFile = ({userLogin, handleCloseModal, addDownload}) => {
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
        if(!formValues.file) {
            setError('The file is empty!');
        } else if(formatError) {
            setError('The file format is not correct!');
        } else if(!formValues.queue) {
            setError('The Queue not selected!');        
        } else if(!formValues.type) {
            setError('The type is empty!')
        } else {
            setError('');
            addDownload('file', formValues);
        }

    }
    const checkInputError = () => {
        let prevInputError = inputError;
        if (!formValues.file || formatError) (prevInputError.indexOf('file') === -1) && prevInputError.push('file');
        else (prevInputError.indexOf('file') !== -1) && prevInputError.splice(prevInputError.indexOf('file'),1);
        if (!formValues.queue) (prevInputError.indexOf('queue') === -1) && prevInputError.push('queue');
        else (prevInputError.indexOf('queue') !== -1) && prevInputError.splice(prevInputError.indexOf('queue'),1);
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
            let item = items.find(val => formValues.file.name.indexOf(val) !== -1);            
            if(item) return Object.keys(suffixType)[i];
        });
        let file_format = file_type.find(val=> val !== undefined);
        if(file_format) return file_format;
        else return false
    }

    const handleFormChange = (id, value) => {
        let values = formValues;
        values[id] = value;
        if(id === 'file') {
            let file_type = checkFormat()
            let file_name = value.name.slice(0, value.name.lastIndexOf('.'));
            let size = value.size;
            values.file_name = file_name;
            values.size = size;
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
                        type='file' 
                        placeholder="Url File" 
                        label="Url File:" 
                        id="file" 
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
 
export default AddFile;
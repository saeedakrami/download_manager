import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import React from 'react';

const Select = ({name, selected, showOptions, options, onFormChange, handleShowOptions, label, labelClass, defaultText, tabIndex, inputError}) => {
    const capitalize = (queue) => {
        return queue.charAt(0).toUpperCase() + queue.slice(1);
    }
    return (
        <>
            {label && (
                <label className={labelClass}>{label}</label> 
            )}
            <div className={inputError.indexOf(name) !== -1 ? 'modal-select error' : showOptions === name ? 'modal-select selected' : 'modal-select'} onClick={() => handleShowOptions(name)} tabIndex={tabIndex}>
                {!selected || !selected.ID ? defaultText : capitalize(selected.name)}
                <UilAngleDown size={32} color={showOptions === name ? '#00bfff' : '#ffffff'} />
            </div>
            {showOptions === name && (
                <div className='modal-option-div' tabIndex={tabIndex}>
                    {options.map(item => (
                        <div 
                            className='modal-option' 
                            key={name + item.ID} 
                            value={item.ID} 
                            onClick={() => onFormChange(name, item)}>
                                {capitalize(item.name)}
                            </div>
                    ))}
                </div>
            )}
        </>
    );
}
 
export default Select;
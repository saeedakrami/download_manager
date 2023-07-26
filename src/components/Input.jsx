import React from 'react';

const Input = ({inputClass, labelClass, label, id, placeholder, type, onFormChange, onClick, inputError}) => {
    return (
        <>
            {label && (
                <label className={labelClass} htmlFor={id}>{label}</label>
            )}
            <input className={inputError.indexOf(id) !== -1 ? `${inputClass} error` : inputClass} id={id} type={type} placeholder={placeholder} autoComplete='nope' onChange={(e) => onFormChange(id, id==="file" ? e.target.files[0] : e.target.value)} onClick={() => onClick('')} />
        </>
    );
}
 
export default Input;
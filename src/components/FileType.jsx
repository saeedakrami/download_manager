import React from 'react';

const FileType = ({selectedType, handleTypeClick}) => {
    return (
        <div className='type-container'>
            <ul>
                <li className={selectedType === "All" ? "selected" : ""} onClick={() => handleTypeClick('All')}>All Categories</li>
                <li className={selectedType === "document" ? "selected" : ""} onClick={() => handleTypeClick('document')}>Documents</li>
                <li className={selectedType === "compress" ? "selected" : ""} onClick={() => handleTypeClick('compress')}>Compressed</li>
                <li className={selectedType === "music" ? "selected" : ""} onClick={() => handleTypeClick('music')}>Music</li>
                <li className={selectedType === "video" ? "selected" : ""} onClick={() => handleTypeClick('video')}>Videos</li>
                <li className={selectedType === "program" ? "selected" : ""} onClick={() => handleTypeClick('program')}>Programs</li>
                <li className={selectedType === "image" ? "selected" : ""} onClick={() => handleTypeClick('image')}>Images</li>
            </ul>
        </div>
    );
}
 
export default FileType;
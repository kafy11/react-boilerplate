import React from 'react';

export default ({ accept, onChange, className }) => {
    let fileReader;
    
    const handleFileRead = () => {
        onChange(fileReader.result);
    }

    const handleFileChosen = (e) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsDataURL(e.target.files[0]);
    }

    return (
        <input 
            type='file'
            className={className}
            accept={accept}
            onChange={handleFileChosen}
        />
    );
}
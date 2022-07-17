import React from 'react';
import './ImageLinkForm.css';

export default function ImageLinkForm(props) {
  const { imageLink, handleInputChange, handleButtonClick, handleEnterKeypress } = props;
  
  return (
    <div className='link-form center f-column'>
      <div>
        <p>This app detects faces in a photo.</p>
        <p>Give it a try!</p>
      </div>
      <div className='input-area center f-column'>
        <input
          type='text'
          name='imageLink'
          placeholder='Enter Image Link'
          value={imageLink}
          onChange={handleInputChange}
          onKeyDown={handleEnterKeypress}
        />
        <button
          onClick={handleButtonClick}
        >
          Detect
        </button>
      </div>
    </div>
  )
}

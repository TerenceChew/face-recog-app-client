import React from 'react';
import './FaceRecog.css';

export default function FaceRecog(props) {
  const { imageToLoad, faceDetectionBoxArray } = props;
  const faceDetectionBoxesToLoad = faceDetectionBoxArray.map((faceDetectionBox, i) => 
      <div 
        key={i} 
        className='face-detection-box' 
        style={Object.values(faceDetectionBox).every(pos => pos !== '') ? faceDetectionBox : {display: 'none'}}>
      </div>
      )

  return (
    <div className='face-recog center'>
      <img id='loaded-image' src={imageToLoad} alt=''/>
      {faceDetectionBoxesToLoad}
    </div>
  )
}


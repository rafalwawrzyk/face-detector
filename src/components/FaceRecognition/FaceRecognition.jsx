import React from 'react'

const FaceRecognition = ({imageUrl}) => {
  return (
    <div>
      <img src={imageUrl} alt="recognImage" style={{position:'relative'}}/>
      <div style={{position:'absolute'}}></div>
    </div>
  )
}


export default FaceRecognition;
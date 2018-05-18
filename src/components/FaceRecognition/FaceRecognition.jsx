import React from 'react'
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl}) => {
  return (
    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
      <img src={imageUrl} alt="recognImage" style={{position:'relative',width:'100%'}}/>
      <div className="bounding-box 018792261-034347045-018639253-027395943" style={{top: '18.7923%', right: '72.6041%', bottom:' 65.653%', left: '18.6393%'}}></div>
    </div>
  )
}


export default FaceRecognition;
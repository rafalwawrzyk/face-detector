import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl,faces,calculatePercentage,box}) => {
  console.log(box)
  const facesArr = ()=> {
    if(box){
     const newArr =  box.map(face => {
        return <div className="bounding-box" style={{top:face.topRow,left:face.leftCol,right:face.rightCol, bottom:face.bottomRow}}></div>
      })
      return newArr
    }
    return null
 }

  return (
    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
      <img id="inputImage" src={imageUrl} alt="recognImage" style={{position:'relative'}} className="imageFaces"/>
      {facesArr()}
    </div>
  )
}


export default FaceRecognition;









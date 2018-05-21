import React from 'react'
import './FaceRecognition.css'
import shortid from 'shortid' 


const FaceRecognition = ({imageUrl,faces,calculatePercentage,box}) => {
  const facesArr = ()=> {
    if(box){
     const newArr =  box.map(face => {
        return <div className="bounding-box" key={shortid.generate()} style={{top:face.topRow,left:face.leftCol,right:face.rightCol, bottom:face.bottomRow}}></div>
      })
      return newArr
    }
    return null
 }

  return (
    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
      {imageUrl?<img id="inputImage"  src={imageUrl} alt="recognImage" style={{position:'relative'}} className="imageFaces"/>:null}
      {facesArr()}
    </div>
  )
}


export default FaceRecognition;









import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl,faces,calculatePercentage,box}) => {
console.log(box)
  // const facesBox = () => {
  //   const facesArr = faces.map(face => {
  //     console.log((face.region_info.bounding_box.bottom_row) * 500)
  //     return 
  //     <div 
  //     className="bounding-box 018792261-034347045-018639253-027395943" 
  //     style={{
  //       // top: (face.region_info.bounding_box.top_row * 200), 
  //       // right: 500 - (face.region_info.bounding_box.right_col * 500), 
  //       // bottom:500 - (face.region_info.bounding_box.bottom_row * 200), 
  //       // left: face.region_info.bounding_box.left_col * 500}}
  //       top: `${(face.region_info.bounding_box.top_row * 200)/2}%`, 
  //       right: `${(face.region_info.bounding_box.right_col * 100)}%`, 
  //       bottom: `${(face.region_info.bounding_box.bottom_row) * 500}%`, 
  //       left: `${(face.region_info.bounding_box.left_col * 500)/2}%`
  //     }}></div>

  //   })
  //   return facesArr;
  // }

  return (
    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
      <img id="inputImage" src={imageUrl} alt="recognImage" style={{position:'relative'}} className="imageFaces"/>
      {box?<div className="bounding-box" style={{top:box.topRow,left:box.leftCol,right:box.rightCol, bottom:box.bottomRow}}></div>:null}
    </div>
  )
}


export default FaceRecognition;









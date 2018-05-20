import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl,faces,calculatePercentage}) => {

  {console.log(faces)}
  const facesBox = () => {
    const facesArr = faces.map(face => {
      console.log((face.region_info.bounding_box.top_row * 200)/2)
      return <div 
      className="bounding-box 018792261-034347045-018639253-027395943" 
      style={{
        // top: face.region_info.bounding_box.top_row * 200, 
        // right: 500 - (face.region_info.bounding_box.right_col * 500), 
        // bottom:500 - (face.region_info.bounding_box.bottom_row * 200), 
        // left: face.region_info.bounding_box.left_col * 500}}
        top: '8.62948%', right: '82.2638%', bottom: '82.8118%', left: '11.592%'
      }}></div>

    })
    return facesArr;
  }

  const dupa = 'dupa'
  return (
    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
      <img src={imageUrl} alt="recognImage" style={{position:'relative',width:'500px', height:'200px'}}/>
      {!faces?null:facesBox()}
    </div>
  )
}


export default FaceRecognition;









import React from 'react'

 const Rank = ({name,entries}) => {
  return (
    <div>
      <div className="white f3">
        {`${name} you check faces from photo ...`}
      </div>
      <div className="white f1">
          {`${entries} time/s`}
      </div>
    </div>
  )
}

export default Rank;
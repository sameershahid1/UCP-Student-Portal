import React from 'react'

const AskingForDeletion = ({Allowing}) => {
  return (
    <div className='asking-container'>
       <h3>Do you realy want to delete this course.</h3>
       <div className='btn-asking'>
          <button onClick={()=>{Allowing(true)}} className='btn'>Yes</button>
          <button onClick={()=>{Allowing(false)}} className='btn'>No</button>
       </div>
    </div>
  )
}

export default AskingForDeletion

import React from 'react'

import "../App.css"

export default function Profile() {
  return (
   <div className='row'>
      <div className='col-12 profile-details'>
        <div className='row'>

          <div className='col-12 mb-3 text-center'>
            <div className='user-image'>
              <img src='assets/user.png' height={50} />
            </div>
            <div><strong>John Doe</strong></div>
          </div>
          
          <div className='col-12 mb-3'>
            <div><strong>Patient ID:</strong> <span>JOHN123</span></div>
            <div><strong>Age:</strong> <span>26</span></div>
          </div>
          <div className='col-12'>
            <button type="button" className="btn btn-success w-100">View Profile</button>
          </div>
        </div>
      </div>
   </div>
  )
}

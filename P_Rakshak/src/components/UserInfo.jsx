import React from 'react'

import "../App.css"

export default function UserInfo() {
  return (
    <div className='row'>
      <div className='col-12 patient-details'>
        <div className='row'>
          <div className='col-12'>
            <h6 className='patient-heading-title'>Information</h6>
          </div>
          <div className='col-12 patient-info'>
           <p><strong>Gender </strong>         :    Male</p>
           <p> <strong>Blood Type </strong>    :    AB+ ( Positive )</p>
           <p> <strong>Allergies</strong>      :    xyz</p>
           <p> <strong>Diseases </strong>      :    Diabetes, Kidney Stone</p>
           <p> <strong> Height</strong>        :    1.75 m | 5 ft 9 in</p>
           <p> <strong>Weight </strong>        :    80 kg</p>
           <p> <strong>Last Visit  </strong>   :    2nd January 2024</p>
           <p> <strong>Doctor</strong>         :    Dr. Anupam Kher ( Cardio Specialist )</p>
          </div>
        </div>
      </div>

    </div>
  )
}

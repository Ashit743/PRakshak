import React from 'react'

import "../App.css"
export default function Prescriptions() {
  return (
    <div className='row prescription-wrapper mt-3'>

      <div className='col-12 p-0'>
        <p className='font-14-600'>Prescriptions</p>
      </div>

      <div className='col-12'>
        <div className='row'>

          <div className='col-3 prescription-box'>
            <div className='text-center border-bottom'>Heart Disease</div>
            <div className='text-center mt-1' style={{fontSize:'12px'}}>3 Months ago</div>
            <div className='text-center font-secondry-12 mt-3'>1 Dec 2023 - 12 Feb 2024</div>
            <p className='text-start p-0 mt-4'>is simply dummy is simply is simply dummy</p>
          </div>

          <div className='col-3 prescription-box ms-4'>
            <div className='text-center border-bottom'>Diabetes Disease</div>
            <div className='text-center mt-1' style={{fontSize:'12px'}}>3 Months ago</div>
            <div className='text-center font-secondry-12 mt-3'>1 Dec 2023 - 12 Feb 2024</div>
            <p className='text-start p-0 mt-4'>is simply dummy is simply is simply dummy</p>
          </div>

        </div>
      </div>
    </div>
  )
}

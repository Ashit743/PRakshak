import React from 'react'

import "../App.css"
export default function Prescriptions() {
  return (

    <div className='row me-2 ms-2'>
      <div className='col-12 prescription-wrapper'>
        <h6 className='m-0'>Prescriptions</h6>

        <div className='row justify-content-between ps-3 pe-3 mt-3'>

          <div className='col-4 prescription-box'></div>
          <div className='col-4 prescription-box'></div>
          <div className='col-4 prescription-box'></div>

        </div>

      </div>
    </div>
  )
}

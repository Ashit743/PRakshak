import React from 'react'

import "../App.css"
export default function VitalSign() {
  return (
    <div className='row'>
      <div className='col-12 vital-heading font-14-600'>Vital Signs</div>
      <div className='col-12'>
        <div className='row justify-content-between mt-3'>

          <div className='col-3 vital-card'>
            <p className='font-12 text-center m-0'>Heart Rate</p>
            <div className='text-center'>
              <img src='assets/heart-rate.png' height={60} />
            </div>
            <p className='text-center m-0'>85 bmp</p>
          </div>

          <div className='col-3 vital-card'>
            <p className='font-12 text-center m-0'>Oxygen Saturation</p>
            <div className='text-center'>
              <img src='assets/lungs.png' height={60} />
            </div>
            <p className='text-center m-0'>99%</p>
          </div>

          <div className='col-3 vital-card'>
            <p className='font-12 text-center m-0'>Body temperature</p>
            <div className='text-center'>
              <img src='assets/temperature.png' height={60} />
            </div>
            <p className='text-center m-0'>96.5&deg; F</p>
          </div>

          <div className='col-3 vital-card'>
            <p className='font-12 text-center m-0'>Glucose Level</p>
            <div className='text-center'>
              <img src='assets/glucosemeter.png' height={60} />
            </div>
            <p className='text-center m-0'>100 mg/dl</p>
          </div>

        </div>
      </div>
    </div>
  )
}

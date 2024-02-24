import React from 'react'

import "../App.css"
export default function TestReports() {
  return (
    <div className='row mt-3'>
      <div className='col-12 test-report-box'>
        <div className='row'>

          <div className='col-12'>
            <p className='font-14-600'>Test Reports</p>
          </div>

          <div className='col-12 test-report-wrapper'>

            <div className='row test-report-main'>
              <div className='col-3'>
                <div className='row'>
                  <div className='col-3'>
                    <div className=''>
                      <img src='assets/medical-report.png' height={60} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='mt-2'>CT Scan</div>
                    <div className='font-secondry-12'>2nd January 2024</div>
                  </div>
                </div>
              </div>

              <div className='col-3'>
                <div className='row'>
                  <div className='col-3'>
                    <div className=''>
                      <img src='assets/medical-report.png' height={60} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='mt-2'>Blood Test</div>
                    <div className='font-secondry-12'>2nd January 2024</div>
                  </div>
                </div>
              </div>
            </div>

          </div>



        </div>

      </div>
    </div>
  )
}

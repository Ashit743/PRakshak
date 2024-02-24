import React from 'react'
// import MonthlyCalendar from '../components/calendar/Calendar'
// import DoctorComponent from '../components/manual-appointment/availableDoctors'

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import "../App.css"
import Profile from '../components/Profile'
import UserInfo from '../components/UserInfo'
import VitalSign from '../components/VitalSign';
import TestReports from '../components/TestReports';
import Prescriptions from '../components/Prescriptions';
export default function Home() {
  return (
    <div className="container-fluid"> {/*main container*/}

      <div className='row'> {/*main row*/}

        <div className='col-lg-12'> {/*main column*/}

          <div className='row'>
            <div className='col patient-details-wrapper'>
              <div className='row'>
                <div className='col-lg-3'>
                  <div className='row'>
                    <div className='col-12'>
                      <Profile />
                    </div>
                    <div className='col-12 mt-3'>
                      <UserInfo />
                    </div>
                  </div>

                </div>

                <div className='col patient-data'>
                  
                  <div className='row'>
                    <div className='col-12'>
                      <VitalSign />
                    </div>

                    <div className='col-12'>
                      <TestReports />
                    </div>

                    <div className='col-12'>
                      <Prescriptions />
                    </div>
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

import React from 'react'
// import MonthlyCalendar from '../components/calendar/Calendar'
// import DoctorComponent from '../components/manual-appointment/availableDoctors'

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import "../App.css"
import SideBar from '../components/SideBar'
import Profile from '../components/Profile'
import UserInfo from '../components/UserInfo'
export default function Home() {
  return (
    <div className="container-fluid p-0"> {/*main container*/}

      <div className='row'> {/*main row*/}

        <div className='col-lg-12'> {/*main column*/}

          <div className='row'>
            <div className='col-lg-1 sidebar'>
              <SideBar></SideBar>
            </div>

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
                  <div className='col'>
                    <p>patient info</p>
                  </div>
              </div>
             
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

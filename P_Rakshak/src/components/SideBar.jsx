import React from 'react'
import { Link } from 'react-router-dom'

import "../App.css"

export default function SideBar() {
  return (
    <div>
      <div tabindex="1" class="nav-template">

        <ul>
          <li className='mt-3'>
            <img src='assets/logo-med.png' height={50} />
          </li>

          <ul className='mt-3 menu-items-wrapper'>

            <li>
              <Link to="">
                <img src='assets/patients.png' height={30} />
              </Link>
            </li>


            <li>
              <Link to="/Calender">
                <img src='assets/calendar.png' height={25} />
              </Link>
            </li>


            <li>
              <Link to="/Doctor">
                <img src='assets/doctor.png' height={25} />
              </Link>
            </li>


            <li>
              <Link to="/Notifications">
                <img src='assets/notifications.png' height={25} />
              </Link>
              <span className='notification-count'>5</span>
            </li>

            <li>
              <Link to="/">
              <img src='assets/call.png' height={25} />
              </Link>
            </li>

          </ul>
        </ul>
      </div>
      {/* <div className='loader-line'><span className='blood-dot'></span></div> */}
    </div>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'

import "../App.css"
export default function SideBar() {
  return (
    <div>
      <div tabIndex="1" className="sidebar">

        <ul>
          <li className='mt-3'>
            <img src='assets/logo-med.png' height={50} />
          </li>

          <ul className='mt-5 menu-items-wrapper'>

            <li>
              <NavLink activeClassName='is-active' to='/'>
                <img src='assets/patients.png' height={25} />
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName='is-active' to="/Prediction">
                <img src='assets/prediction-data.png' height={25} />
              </NavLink>
            </li>


            <li>
              <NavLink activeClassName='is-active' to="/calendar">
                <img src='assets/calendar.png' height={25} />
              </NavLink>
            </li>


            <li>
              <NavLink activeClassName='is-active' to="/availabledocs">
                <img src='assets/doctor.png' height={25} />
              </NavLink>
            </li>


            {/* <li className='position-relative'>
              <NavLink activeClassName='is-active' to="/notifications">
                <img src='assets/notifications.png' height={25} />
              </NavLink>
              <span className='notification-count'>5</span>
            </li>

            <li>
              <NavLink activeClassName='is-active' to="/emergency">
                <img src='assets/call.png' height={25} />
              </NavLink>
            </li> */}

            <li>
              <NavLink activeClassName='is-active' to="/signup">
                <img src='assets/logout.png' height={25} />
              </NavLink>
            </li>

          </ul>
        </ul>
      </div>
      {/* <div className='loader-line'><span className='blood-dot'></span></div> */}
    </div>
  )
}

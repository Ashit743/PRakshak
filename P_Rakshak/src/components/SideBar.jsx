import React from 'react'

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
            <li><a href="#"></a><img src='assets/patients.png' height={30} /></li>
            <li><a href="#"><img src='assets/calendar.png' height={25} /></a></li>
            <li><a href="#"><img src='assets/doctor.png' height={25} /></a></li>
            <li>
              <a href="#"><img src='assets/notifications.png' height={25} /></a>
              <span className='notification-count'>5</span>
            </li>
          </ul>
        </ul>
      </div>
      {/* <div className='loader-line'><span className='blood-dot'></span></div> */}
    </div>
  )
}

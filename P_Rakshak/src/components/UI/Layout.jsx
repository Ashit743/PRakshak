import React from 'react'
import SideBar from '../SideBar'

export default function Layout({ children }) {
  return (
    <>

      <SideBar></SideBar>


      <div className='child-components' style={{
        width: 'calc(100% - 70px)',
        marginLeft: 'auto',
        padding: '27px',
        backgroundColor: '#EEF6ED',
        height: '100vw',
        position: 'relaive',
      }}>
        {children}
      </div>
    </>
  )
}

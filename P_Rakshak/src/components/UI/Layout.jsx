import React from 'react'
import SideBar from '../SideBar'

export default function Layout({children}) {
  return (
    <>
        <SideBar></SideBar>
        {children}
    </>
  )
}

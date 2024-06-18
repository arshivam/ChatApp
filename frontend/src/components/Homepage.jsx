import React from 'react'
import SideBar from './SideBar'
import MessageContainer from './MessageContainer'

function Homepage() {
  return (
    <div className="flex overflow-hidden rounded-lg sm:h-[450px] md:h-[550px]  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <SideBar/>
      <MessageContainer/>
    </div>
  )
}

export default Homepage
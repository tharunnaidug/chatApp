import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Messagecon from '../../components/messagecon/Messagecon'
import Videocall from '../../components/vc/Videocall'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Videocall />
      <Sidebar />
      <Messagecon />

      </div>
  )
}

export default Home
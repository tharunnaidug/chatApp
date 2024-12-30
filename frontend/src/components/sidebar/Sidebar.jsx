import React from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import Logoutbtn from './Logoutbtn'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col sb'>
        <Searchinput />
        <div className="divider px-2"></div>
        <Conversations />
        <Logoutbtn />
    </div>
  )
}

export default Sidebar
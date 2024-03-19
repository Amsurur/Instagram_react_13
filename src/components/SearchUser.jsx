import React, { useState } from 'react'
import '../App.css'
const SearchUser = () => {

  return (
<>

  
    

    <div className='searchModal z-15 p-[22px] fixed  w-[390px] bg-white ml-[6%] h-[100vh] '>
      <h1 className='text-[24px] mb-[6vh]'>Поисковый запрос</h1>
        <input type="text" className='bg-[#f4f3f3] w-[100%] rounded-[7px] outline-none text-gray-600 p-[8px] px-[13px] ' placeholder='Поиск'  />
        <p className="mt-[3vh] border-t-gray-400 border-t-[1px]"></p>
    <div className="overflow-y-scroll mt-[3vh] w-[106%] flex flex-col gap-[5px] " >
      <h1>h,v m</h1>
      <h1>h,v m</h1>
      <h1>h,v m</h1>
      <h1>h,v m</h1>

    </div>
    </div>

</>
  )
}

export default SearchUser

import React from 'react'

const SearchUser = () => {
    const [modal,setSearchModal]=useState(false)

  return (
<>

    <div>
      
    </div>
    
{modal?(
    <div>
        <input type="text" className='bg-[#F3F4F6] rounded-[7px]' placeholder='Search...'/>
        <h1>hello world</h1>
    </div>
):null}
</>
  )
}

export default SearchUser

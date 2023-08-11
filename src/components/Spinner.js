import React from 'react'
import Spin from './Spin.gif'

const Spinner =()=>  {
    return (
      <div className='text-center'>
        <img src={Spin} alt="loading" />
      </div>
    )

}

export default Spinner
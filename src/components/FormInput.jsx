'use client'

import React from 'react'

function FormInput({name='nonamegiven', placeholder='', value='' ,width="100%", onChange=() => {}, onFocus=() => {},}) {
  return (
    <input name={name} value={value} placeholder={placeholder} onChange={onChange} onFocus={onFocus}
           style={{width: width}} 
           className={` outline-none p-[5px] rounded border-[2px] border-solid border-[#00426A]
                        focus:border-[#F7C46E]`}/>
  )
}

export default FormInput
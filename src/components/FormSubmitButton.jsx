import React from 'react'

function FormSubmitButton({ width='100%', text='Submit', onClick=() => {} }) {
    return (
        <button style={{width: width}} onClick={onClick}
                className='mt-[10px] bg-[#00426A] text-white p-3 rounded-lg
                           transition-all hover:bg-[#B86125]'>
            {text}
        </button>
    )
}

export default FormSubmitButton
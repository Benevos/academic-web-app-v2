import React from 'react'

function FormTitle({title='lorem ipsum', icon=null}) 
{
    return (
        <div className='form-title'>

            <div className='form-title-content'>
                
                {icon === null ? <></> : icon}

                <h2>
                    {title}
                </h2>

            </div>
            
        </div>
    )
}

export default FormTitle
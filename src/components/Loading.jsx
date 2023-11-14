import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading({ message='Loading...' }) 
{

    return (
        <div className='loading'>
            <h1 className='loading-message'>{message}</h1>
            <CircularProgress style={{ color: '#F7C46E' }}/>
        </div>
    )
}

export default Loading
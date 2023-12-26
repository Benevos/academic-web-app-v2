'use client';

import React, { useRef } from 'react';
import { MdClose } from 'react-icons/md';

function Dialog({ title='Dialog', message='Lorem ipsum', disabled=false, showButton=true, color='primary' }) 
{
    const searchDialogRef = useRef(null);

    const handleCloseClick = () =>
    {
        const searchDialog = searchDialogRef.current;
        searchDialog.close();
    }

    return (
        <dialog ref={searchDialogRef} id='dialog' className={`dialog dialog-${color}`}>
            <div className='dialog-content'>
                <h2>{title}</h2>

                <p className='text-center'>{message}</p>

                {showButton ? <button className='' onClick={handleCloseClick} disabled={disabled}>Cerrar</button> : <></>}
            </div>
        </dialog>
    )
}

export default Dialog
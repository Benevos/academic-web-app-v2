import React from 'react'
import Navbar from "@/components/PageTop/Navbar";
import TopFiller from "@/components/PageTop/TopFiller";
import Header from '@/components/PageTop/Header';

function DeleteDataPage() {
  return (
    <div >
        <Header/>
        <TopFiller/>
        <Navbar/>
        <div className="w-full h-[calc(100dvh-137px)]">
            <div className='w-full h-full  flex items-center justify-center'>
                <div className='bg-white p-[35px] rounded-md def-shadow'>
                   <h1>How can I request my data to be deleted from Calcula UAT?</h1>
                    <p>
                        {"You can send an email to kevin_mendoza092@hotmail.com with the data you wish to be deleted, no data will be preserved after deletion"}
                    </p>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default DeleteDataPage
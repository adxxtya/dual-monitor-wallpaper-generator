import Image from 'next/image'
import React from 'react'

function Navbar() {
    return (
        <nav className='w-[100%] h-[20vh]
                        flex justify-center items-center'>
            <div className='w-[42%] text-end'><h1 className='font-medium text-5xl'>HADES</h1></div>
            <div className='flex w-[15%] items-center justify-center'><Image src="/hades-logo.webp" width="125" height="125" alt='logo' /></div>
            <div className='flex w-[42%] '>
                <h1 className='font-medium text-2xl mr- mr-12'>how it works?</h1>
                <h1 className='font-medium text-2xl'>checkout more..</h1>
            </div>
        </nav>
    )
}

export default Navbar
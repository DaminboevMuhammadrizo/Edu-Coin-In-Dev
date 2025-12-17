import Navbar from '@/components/Navbar'
import Sidebar from '@/components/SideBar'
import { GraduationCap } from 'lucide-react'
import React from 'react'

function Teacher() {
    return (
        <div>
            <Navbar />
            <div className='flex '>
                <Sidebar />
                <section className='p-10 w-full '>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-3 items-center'>
                            <GraduationCap size={40} />
                            <h1 className='text-4xl'>Teachers</h1>
                        </div>
                        <button className='p-3 border rounded-2xl px-4'>O'qituvchi Qo'shish</button>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Teacher
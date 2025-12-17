'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import Auth from './auth/page'
import SideBar from '@/components/SideBar'
import Center from './centers/page'
import { useRouter } from 'next/navigation'
function page() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.replace('/auth')
    }
  }, [])

  return (
    <div className=' '>

      <Center />
    </div>
  )
}

export default page
'use client'
import React from 'react'
import Image from 'next/image'
import { Bell, SearchIcon, Settings, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import coin from '../img/ecommerce.png'
import mentor from '../img/istockphoto-1184016920-612x612.jpg'

function Navbar() {
  const navigate = useRouter()

  return (
    <header className='w-full bg-white shadow-sm sticky top-0 z-50'>
      <nav className='flex items-center justify-between px-4 sm:px-6 py-3'>
        <div
          onClick={() => navigate.push('/')}
          className='flex gap-2 items-center cursor-pointer hover:scale-[1.05] transition-all duration-200'
        >
          <Image src={coin} alt='EduCoin logo' width={45} height={45} />
          <h1 className='font-bold text-2xl sm:text-3xl'>
            Edu<span className='text-[#9400dd]'>Coin</span>
          </h1>
        </div>

        <div className='hidden md:flex items-center relative w-[350px] lg:w-[420px]'>
          <input
            type='text'
            className='w-full px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#9400dd] focus:border-[#9400dd] focus:text-[#9400dd] transition-all duration-200 text-gray-800 placeholder-gray-400'
            placeholder='Search something...'
          />
          <SearchIcon className='absolute right-4 text-gray-500' size={18} />
        </div>

        <div className='flex items-center gap-3 sm:gap-4'>
          <div className='flex items-center gap-2'>
            <button
              aria-label='Notifications'
              className='p-2 rounded-md hover:bg-gray-100 transition-all'
            >
              <Bell size={20} />
            </button>
            <button
              aria-label='Settings'
              className='p-2 rounded-md hover:bg-gray-100 transition-all'
            >
              <Settings size={20} />
            </button>
          </div>

          <div className='hidden sm:flex flex-col items-end'>
            <h1 className='font-semibold text-sm sm:text-base'>
              Abduhoshim Sultonqulov
            </h1>
            <p className='text-xs text-gray-500'>Admin</p>
          </div>

          <div className='relative w-10 h-10 rounded-full overflow-hidden border'>
            <Image src={mentor} alt='user avatar' fill className='object-cover' />
          </div>

          <button
            className='md:hidden p-2 rounded-md hover:bg-gray-100 transition-all'
            aria-label='Menu'
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

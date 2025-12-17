'use client'
import { UsersRound, GraduationCap, Settings2, LocateFixed, UserCog, ShieldCheck, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Sidebar() {
  const navigate = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role')
    navigate.push('/auth')
  }

  return (
    <div className=''>
      <section className='mt-4'>
        <div className='md:flex hidden flex-col  w-[300px] justify-between h-screen shadow-md'>
          <div className='flex flex-col gap-2'>
            <div onClick={() => navigate.push('/centers')} className='flex border rounded-2xl items-center gap-3 px-4 py-3  cursor-pointer border-white hover:bg-[#9400dd] hover:text-white transition-all duration-200'>
              <LocateFixed size={28} />
              <h1 className='text-[18px] font-medium'>Centers</h1>
            </div>
            <div onClick={() => navigate.push('/creator')} className='flex items-center gap-3 px-4 py-3  cursor-pointer border-white hover:bg-[#9400dd] hover:text-white rounded-2xl transition-all duration-200'>
              <UserCog size={28} />
              <h1 className='text-[18px] font-medium'>Creators</h1>
            </div>
            <div
              onClick={handleLogout}
              className='flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-600 hover:text-white rounded-2xl transition-all duration-200'
            >
              <LogOut size={28} />
              <h1 className='text-[18px] font-medium'>Log out</h1>
            </div>

          </div>


        </div>
      </section>
    </div>
  )
}

export default Sidebar

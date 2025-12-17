'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/SideBar'
import axios from 'axios'
import { ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface RoleInter {
    id: number
    name: string
    category: string
    role: string
    actions: string
    status: string
}

interface CenterInter {
    id: number
    name: string
    phone: string
    status: string
    description: string
}

function Roles() {
    const [roles, setRoles] = useState<RoleInter[]>([])
    const [centers, setCenters] = useState<CenterInter[]>([])
    const [selectedCenter, setSelectedCenter] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNVUEVSQURNSU4iLCJpYXQiOjE3NjE0ODQ3NDUsImV4cCI6MTc2ODY4NDc0NX0.S5bUXkj3pPIPOI6Yok8eH64xpwCl6gomE5bell9v-bI`

    useEffect(() => {
        axios
            .get('https://educoin-b2b.educoinapp.uz/api/v1/centers/all', {
                headers: { Authorization: token },
            })
            .then((res) => {
                const data = res.data.data
                setCenters(data)
                if (data.length > 0) {
                    setSelectedCenter(data[0].id)
                }
            })
            .catch((err) => console.error('Center yuklashda xatolik:', err))
    }, [])

    useEffect(() => {
        if (selectedCenter !== null) {
            setLoading(true)
            axios
                .get(
                    `https://educoin-b2b.educoinapp.uz/api/v1/role-permissions/creator/${selectedCenter}`,
                    { headers: { Authorization: token } }
                )
                .then((res) => {
                    setRoles(res.data.data)
                })
                .catch((err) => {
                    console.error('Roles yuklashda xatolik:', err)
                    setRoles([])
                })
                .finally(() => setLoading(false))
        }
    }, [selectedCenter])

    const handleCenterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value)

        if (id === selectedCenter) {
            setRoles([])
            return
        }

        setSelectedCenter(id)
    }

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <section className="p-10 w-full">
                    <div className="flex justify-between items-center p-5 rounded-2xl shadow-sm">
                        <div className="flex gap-3 items-center">
                            <ShieldCheck size={40} className="text-[#9900dd]" />
                            <h1 className="text-4xl font-semibold">Roles Permission</h1>
                        </div>

                        <div className="relative inline-block w-60">
                            <select
                                onChange={handleCenterChange}
                                value={selectedCenter ?? ''}
                                className="appearance-none w-full bg-white border-2 border-[#9900dd]/30 rounded-2xl px-5 py-3 text-gray-800 font-semibold 
                                   focus:border-[#9900dd] focus:ring-2 focus:ring-[#9900dd]/20 transition-all duration-200 cursor-pointer shadow-sm
                                   hover:border-[#9900dd]/60"
                            >
                                {centers.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-[#9900dd]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white shadow-md rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                            {loading ? (
                                <div className="text-center py-10 text-[#9900dd] font-semibold">
                                    Yuklanmoqda...
                                </div>
                            ) : roles.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    Hech qanday role topilmadi
                                </div>
                            ) : (
                                <table className="min-w-full text-left border-collapse">
                                    <thead className="bg-[#f8f5ff] text-[#6600aa] uppercase text-sm">
                                        <tr>
                                            <th className="py-4 px-6">#</th>
                                            <th className="py-4 px-6">Name</th>
                                            <th className="py-4 px-6">Role</th>
                                            <th className="py-4 px-6">Category</th>
                                            <th className="py-4 px-6">Actions</th>
                                            <th className="py-4 px-6">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.map((role, index) => (
                                            <tr
                                                key={role.id}
                                                className="border-t border-gray-100 hover:bg-[#faf7ff] transition-all duration-150"
                                            >
                                                <td className="py-4 px-6 font-medium text-gray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-6 font-semibold">{role.name}</td>
                                                <td className="py-4 px-6">{role.role}</td>
                                                <td className="py-4 px-6 font-bold text-[#9900dd]">
                                                    {role.category}
                                                </td>
                                                <td className="py-4 px-6 font-bold text-[#9900dd]">
                                                    {Array.isArray(role.actions)
                                                        ? role.actions.join(' • ')
                                                        : role.actions}
                                                </td>
                                                <td
                                                    className={`py-4 px-6 font-semibold ${
                                                        role.status === 'ACTIVE'
                                                            ? 'text-green-600'
                                                            : role.status === 'INACTIVE'
                                                            ? 'text-red-600'
                                                            : 'text-yellow-400'
                                                    }`}
                                                >
                                                    {role.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Roles

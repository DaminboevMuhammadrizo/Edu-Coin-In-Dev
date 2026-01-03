'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/SideBar'
import axios from 'axios'
import { Edit3, Trash2, PlusCircle, X, UserCog2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CreatorInter {
    id: number
    name: string
    phone: string
    status: string
    email: string
}

interface CenterInter {
    id: number
    name: string
    phone: string
    status: string
    description: string
}

interface RolesInter {
    id: number
    name: string
}

function Creator() {
    let [token, setToken] = useState<string | null>(null)
    const [creators, setCreators] = useState<CreatorInter[]>([])
    const [centers, setCenters] = useState<CenterInter[]>([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [roles, setRoles] = useState<RolesInter[]>([])
    const [showModal, setShowModal] = useState(false)
    const [alert, setAlert] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
        show: false,
        type: 'success',
        message: ''
    })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        photo: '',
        birthDay: '',
        status: 'INACTIVE',
        centerId: '',
        role: 'CREATOR'
    })
    const [updateformData, setUpdateFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        photo: '',
        birthDay: '',
        status: 'INACTIVE',
        centerId: '',
        role: 'CREATOR'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const t = localStorage.getItem('accessToken')
            setToken(t)
        }
    }, [])


    useEffect(() => {
        if (!token) return
        axios.get('https://educoin-b2b-dev.educoinapp.uz/api/v1/users/creator/main', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setCreators(res.data.data))

        axios.get('https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setCenters(res.data.data))

        axios.get(`https://educoin-b2b-dev.educoinapp.uz/api/v1/role-permissions/creator/${1}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setRoles(res.data.data))
    }, [token])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, photo: e.target.files![0].name }))
        }
    }

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUpdateFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setUpdateFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUpdateFormData(prev => ({ ...prev, photo: e.target.files![0].name }))
        }
    }

    async function handleEdit(editId: number) {
        setShowUpdate(true)
        setEditId(editId)
    }

    const handleSubmit = async () => {
        try {
            if (!token) return
            await axios.post('https://educoin-b2b-dev.educoinapp.uz/api/v1/users/creator', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setAlert({
                show: true,
                type: 'success',
                message: "Creator muvaffaqiyatli qo'shildi!"
            })
            setShowModal(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (err: any) {
            setAlert({
                show: true,
                type: 'error',
                message: err.response?.data?.message || "Xatolik yuz berdi!"
            })
        }
    }
    const handleUpdateSubmit = async () => {
        try {
            if (!token) return
            await axios.put(`https://educoin-b2b-dev.educoinapp.uz/api/v1/users/${editId}`, updateformData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setAlert({
                show: true,
                type: 'success',
                message: "Creator muvaffaqiyatli Yangilandi!"
            })
            setShowModal(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (err: any) {
            setAlert({
                show: true,
                type: 'error',
                message: err.response?.data?.message || "Xatolik yuz berdi!"
            })
        }
    }

    async function delete_one(id: number) {
        try {
            if (!token) return
            await axios.delete(
                `https://educoin-b2b-dev.educoinapp.uz/api/v1/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setCreators(creators.filter(c => c.id !== id))
            setTimeout(() => window.location.reload(), 1000)
        } catch (error: any) {
            setAlert({
                show: true,
                type: 'error',
                message: error.message
            })
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <section className='p-10 w-full'>
                    <div className='flex justify-between items-center p-5 rounded-2xl shadow-sm'>
                        <div className='flex gap-3 items-center'>
                            <UserCog2 size={40} className='text-[#9900dd]' />
                            <h1 className='text-4xl font-semibold'>Creators</h1>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className='p-3 border hover:bg-[#9400dd] hover:text-white transition-all duration-200 border-[#9400dd] font-bold text-[#9900dd] rounded-2xl px-4 flex items-center gap-2'
                        >
                            <PlusCircle size={20} />
                            Creator Qo‘shish
                        </button>
                    </div>

                    <div className="mt-8 bg-white shadow-md rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-[#f8f5ff] text-[#6600aa] uppercase text-sm">
                                    <tr>
                                        <th className="py-4 px-6 whitespace-nowrap">#</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Ism</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Telefon</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Email</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Status</th>
                                        <th className="py-4 px-6 text-center whitespace-nowrap">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creators.map((creator, index) => (
                                        <tr
                                            key={creator.id}
                                            className="border-t border-gray-100 hover:bg-[#faf7ff] transition-all"
                                        >
                                            <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
                                            <td className="py-4 px-6 font-semibold">{creator.name}</td>
                                            <td className="py-4 px-6">{creator.phone}</td>
                                            <td className="py-4 px-6 text-[#9900dd] font-bold">
                                                {creator.email}
                                            </td>
                                            <td className={`py-4 px-6 font-semibold ${creator.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>
                                                {creator.status}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button className="p-2 rounded-xl hover:bg-[#e5d4ff] transition-all">
                                                        <Edit3 size={18} onClick={() => handleEdit(creator.id)} className="text-[#9400dd]" />
                                                    </button>
                                                    <button
                                                        onClick={() => delete_one(creator.id)}
                                                        className="p-2 rounded-xl hover:bg-[#ffe5f0] transition-all"
                                                    >
                                                        <Trash2 size={18} className="text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showModal && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='fixed inset-0 bg-black/40 z-40'
                                    onClick={() => setShowModal(!showUpdate)}
                                />
                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                                    className='fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl p-6 overflow-y-auto'
                                >
                                    <div className='flex justify-between items-center mb-6'>
                                        <h2 className='text-2xl font-semibold text-[#9900dd]'>Creator Qo‘shish</h2>
                                        <button onClick={() => setShowModal(false)} className='p-2 rounded-xl hover:bg-gray-100'>
                                            <X />
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Creator nomi' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='text' name='phone' value={formData.phone} onChange={handleChange} placeholder='Telefon raqam' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Parol' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='file' name='photo' onChange={handleFileChange} className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='date' name='birthDay' value={formData.birthDay} onChange={handleChange} className='border p-3 rounded-xl focus:outline-[#9900dd]' />

                                        <select name='centerId' value={formData.centerId} onChange={handleSelectChange} className='border p-3 rounded-xl focus:outline-[#9900dd]'>
                                            <option value=''>Markazni tanlang</option>
                                            {centers.map(el => (
                                                <option key={el.id} value={el.id}>
                                                    {el.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='border p-3 rounded-xl border-[#9900dd]'>
                                            <h1 className='font-bold text-[#9900dd]'>CREATOR</h1>
                                        </div>

                                        <button onClick={handleSubmit} className='bg-[#9900dd] text-white py-3 rounded-xl mt-3 font-semibold hover:bg-[#7c00b6] transition-all'>
                                            Saqlash
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}

                        {showUpdate && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='fixed inset-0 bg-black/40 z-40'
                                    onClick={() => setShowUpdate(!showUpdate)}
                                />
                                <motion.div
                                    initial={{ x: '100%' }} 
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                                    className='fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl p-6 overflow-y-auto'
                                >
                                    <div className='flex justify-between items-center mb-6'>
                                        <h2 className='text-2xl font-semibold text-[#9900dd]'>Creator Tahrirlash</h2>
                                        <button onClick={() => setShowUpdate(false)} className='p-2 rounded-xl hover:bg-gray-100'>
                                            <X />
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <input type='text' name='name' value={updateformData.name} onChange={handleChange1} placeholder='Creator nomi' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='email' name='email' value={updateformData.email} onChange={handleChange1} placeholder='Email' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='text' name='phone' value={updateformData.phone} onChange={handleChange1} placeholder='Telefon raqam' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='password' name='password' value={updateformData.password} onChange={handleChange1} placeholder='Parol' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='file' name='photo' onChange={handleFileChange1} className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='date' name='birthDay' value={updateformData.birthDay} onChange={handleChange1} className='border p-3 rounded-xl focus:outline-[#9900dd]' />

                                        <select name='centerId' value={updateformData.centerId} onChange={handleSelectChange1} className='border p-3 rounded-xl focus:outline-[#9900dd]'>
                                            <option value=''>Markazni tanlang</option>
                                            {centers.map(el => (
                                                <option key={el.id} value={el.id}>
                                                    {el.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='border p-3 rounded-xl border-[#9900dd]'>
                                            <h1 className='font-bold text-[#9900dd]'>CREATOR</h1>
                                        </div>

                                        <button onClick={handleUpdateSubmit} className='bg-[#9900dd] text-white py-3 rounded-xl mt-3 font-semibold hover:bg-[#7c00b6] transition-all'>
                                            Saqlash
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {alert.show && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.3 }}
                                className={`fixed top-10 right-10 z-50 p-6 rounded-2xl shadow-2xl text-xl font-semibold 
                                ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            >
                                <p>{alert.message}</p>
                                <button
                                    onClick={() => setAlert(prev => ({ ...prev, show: false }))}
                                    className='mt-3 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200'
                                >
                                    OK
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </div>
    )
}

export default Creator

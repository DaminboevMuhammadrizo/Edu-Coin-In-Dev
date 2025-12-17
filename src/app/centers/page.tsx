'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/SideBar'
import axios from 'axios'
import { LocateFixed, Edit3, Trash2, PlusCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CenterInter {
    id: number,
    name: string,
    phone: string,
    status: string,
    description: string
}

function Center() {
    let [token, setToken] = useState<string | null>(null)
    const [centerss, setCenters] = useState<CenterInter[]>([])
    const [filcenterss, setFilCenters] = useState<CenterInter[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [oneCenter, setOneCenter] = useState([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const t = localStorage.getItem('accessToken')
            setToken(t)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        logo: null as File | null,
        phone: '',
        status: 'PRIVATE',
        description: '',
        subdomain: ''
    })

    const [updateData, setUpdateData] = useState({
        name: '',
        logo: null as File | null,
        phone: '',
        status: 'PRIVATE',
        description: '',
        subdomain: ''
    })

    const [alert, setAlert] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
        show: false,
        type: 'success',
        message: ''
    })


    useEffect(() => {
        if (!token) return

        axios.get('https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => { setCenters(res.data.data), setFilCenters(res.data.data) })
            .catch(err => console.error('Xatolik:', err))
    }, [token])

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleUpdateChange = (e: any) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }

    async function handleEdit(editId: number) {
        setShowUpdate(true)
        setEditId(editId)

        try {
            if (!token) return

            const res = await axios.get(
                `https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/single/${editId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const center = res.data.data
            console.log(center)

            setUpdateData({
                name: center.name || '',
                logo: center.logo || '',
                phone: center.phone || '',
                status: center.status || 'PRIVATE',
                description: center.description || '',
                subdomain: center.subdomain || ''
            })

        } catch (error: any) {
            console.log(error.message)
        }
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                logo: e.target.files![0]
            }))
        }
    }



    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUpdateData(prev => ({
                ...prev,
                logo: e.target.files![0]
            }))
        }
    }




    async function handleSubmit() {
        try {
            if (!token) return

            const fd = new FormData()
            fd.append('name', formData.name)
            fd.append('phone', formData.phone)
            fd.append('status', formData.status)
            fd.append('description', formData.description)
            fd.append('subdomain', formData.subdomain)

            if (formData.logo) {
                fd.append('logo', formData.logo)
            }

            await axios.post(
                'https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/',
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            setAlert({ show: true, type: 'success', message: 'Center muvaffaqiyatli qo‘shildi!' })
            setShowModal(false)
            setTimeout(() => window.location.reload(), 1000)

        } catch (err: any) {
            setAlert({
                show: true,
                type: 'error',
                message: err.response?.data?.message || 'Xatolik yuz berdi'
            })
            console.error(err)
        }
    }

    const handleUpdate = (editId: number) => {
        if (!editId) return

        if (!token) return

        axios.put(

            `https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/${editId}`,
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(() => {
            setShowUpdate(false)
            window.location.reload()
        })
    }

    async function delete_one(id: number) {
        try {
            if (!token) return

            await axios.delete(
                `https://educoin-b2b-dev.educoinapp.uz/api/v1/centers/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setCenters(prev => prev.filter(item => item.id !== id))
            setTimeout(() => window.location.reload(), 1000)
        } catch { }
    }

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <section className='p-10 w-full'>
                    <div className='flex justify-between items-center p-5 rounded-2xl shadow-sm'>
                        <div className='flex gap-3 items-center'>
                            <LocateFixed size={40} className='text-[#9900dd]' />
                            <h1 className='text-4xl font-semibold'>Centers</h1>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className='p-3 border hover:bg-[#9400dd] hover:text-white transition-all duration-200 border-[#9400dd] font-bold text-[#9900dd] cursor-pointer rounded-2xl px-4 flex items-center gap-2'
                        >
                            <PlusCircle size={20} />
                            Center Qo'shish
                        </button>
                    </div>

                    <div className="mt-8 bg-white shadow-md rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-[#f8f5ff] text-[#6600aa] uppercase text-sm">
                                    <tr>
                                        <th className="py-4 px-6 whitespace-nowrap">#</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Markaz nomi</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Telefon</th>
                                        <th className="py-4 px-6 whitespace-nowrap">Status</th>
                                        <th className="py-4 px-6 text-center whitespace-nowrap">Description</th>
                                        <th className="py-4 px-6 text-center whitespace-nowrap">Amallar</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filcenterss.map((center, index) => (
                                        <tr key={center.id} className="hover:bg-[#faf7ff] transition-all duration-150 border-t border-gray-100">
                                            <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
                                            <td className="py-4 px-6 font-semibold">{center.name}</td>
                                            <td className="py-4 px-6">{center.phone}</td>
                                            <td className={`py-4 px-6 ${center.status === "CENTER" ? "text-green-600" : "text-red-600"}`}>
                                                {center.status === 'CENTER' ? `O'quv Markaz` : `Xususiy Maktab`}
                                            </td>
                                            <td className="py-4 px-6 text-center font-bold text-[#9900dd]">{center.description}</td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => handleEdit(center.id)} className="p-2 rounded-xl hover:bg-[#e5d4ff] transition-all">
                                                        <Edit3 size={18} className="text-[#9400dd]" />
                                                    </button>
                                                    <button onClick={() => delete_one(center.id)} className="p-2 rounded-xl hover:bg-[#ffe5f0] transition-all">
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
                                    onClick={() => setShowModal(false)}
                                />

                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                                    className='fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl p-6 overflow-y-auto'
                                >
                                    <div className='flex justify-between items-center mb-6'>
                                        <h2 className='text-2xl font-semibold text-[#9900dd]'>Center Qo‘shish</h2>
                                        <button onClick={() => setShowModal(false)} className='p-2 rounded-xl hover:bg-gray-100'>
                                            <X />
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <input name='name' value={formData.name} onChange={handleChange} placeholder='Markaz nomi' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='file' name='logo' onChange={handleFileChange} placeholder='Logo URL' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input name='phone' value={formData.phone} onChange={handleChange} placeholder='Telefon raqam' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <select name='status' value={formData.status} onChange={handleChange} className='border p-3 rounded-xl focus:outline-[#9900dd]'>
                                            <option value='PRIVATE'>PRIVATE</option>
                                            <option value='CENTER'>CENTER</option>
                                        </select>
                                        <textarea name='description' value={formData.description} onChange={handleChange} placeholder='Izoh...' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input name='subdomain' value={formData.subdomain} onChange={handleChange} placeholder='Subdomain' className='border p-3 rounded-xl focus:outline-[#9900dd]' />

                                        <button
                                            onClick={handleSubmit}
                                            className='bg-[#9900dd] text-white py-3 rounded-xl mt-3 font-semibold hover:bg-[#7c00b6] transition-all'
                                        >
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
                                    onClick={() => setShowUpdate(false)}
                                />
                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                                    className='fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl p-6 overflow-y-auto'
                                >
                                    <div className='flex justify-between items-center mb-6'>
                                        <h2 className='text-2xl font-semibold text-[#9900dd]'>Center Tahrirlash</h2>
                                        <button onClick={() => setShowUpdate(false)} className='p-2 rounded-xl hover:bg-gray-100'>
                                            <X />
                                        </button>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <input name='name' value={updateData.name} onChange={handleUpdateChange} placeholder='Markaz nomi' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input type='file' name='logo' onChange={handleFileChange1} placeholder='Logo URL' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input name='phone' value={updateData.phone} onChange={handleUpdateChange} placeholder='Telefon raqam' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <select name='status' value={updateData.status} onChange={handleUpdateChange} className='border p-3 rounded-xl focus:outline-[#9900dd]'>
                                            <option value='PRIVATE'>PRIVATE</option>
                                            <option value='CENTER'>CENTER</option>
                                        </select>
                                        <textarea name='description' value={updateData.description} onChange={handleUpdateChange} placeholder='Izoh...' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <input name='subdomain' value={updateData.subdomain} onChange={handleUpdateChange} placeholder='Subdomain' className='border p-3 rounded-xl focus:outline-[#9900dd]' />
                                        <button onClick={() => handleUpdate(editId!)} className='bg-[#9900dd] text-white py-3 rounded-xl mt-3 font-semibold hover:bg-[#7c00b6] transition-all'>
                                            Yangilash
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
                                transition={{ duration: 0.25 }}
                                className={`fixed top-10 right-10 z-[999] p-6 rounded-2xl shadow-2xl min-w-[260px] text-lg font-semibold
                                    ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                                `}
                            >
                                {alert.message}
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

export default Center

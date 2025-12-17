'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Euro, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import coin from "../../img/ecommerce.png"
import axios from 'axios'
import { useRouter } from 'next/navigation'

function Auth() {
    const [coins, setCoins] = useState<number[]>([])
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useRouter()

    useEffect(() => {
        const arr = Array.from({ length: 20 }, (_, i) => i)
        setCoins(arr)
    }, [])

    async function handleSubmit(e: any) {
        
        e.preventDefault()
        try {
            const res = await axios.post('https://educoin-b2b-dev.educoinapp.uz/api/v1/auth/login', {
                identifier,
                password
            })
          
            if (res.data?.accessToken && res.data?.role) {
                 const TOKEN_KEY = 'accessToken'
                localStorage.setItem(TOKEN_KEY, res.data.accessToken)
                localStorage.setItem('role', res.data.role)

            }

            setSuccess(true)
            setError(null)

            setTimeout(() => {
                setSuccess(false)
                navigate.push('/')
            }, 2000)
        } catch (err: any) {
            setError(err.message || "Login xato, iltimos qayta urinib ko‘ring.")
            setSuccess(false)
            setTimeout(() => setError(null), 4000)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#fdfcff] to-[#e6d4ff]">
            <div className='cursor-pointer hover:scale-[1.2] transition-all duration-200 absolute top-7 right-7 flex items-center gap-2'>
                <Image src={coin} alt='' width={50} height={50} />
                <h1 className="font-bold text-4xl">
                    Edu<span className="font-bold text-4xl text-[#9400dd]">Coin</span>
                </h1>
            </div>

            <AnimatePresence>
                {coins.map((coin, i) => (
                    <motion.div
                        key={coin}
                        initial={{
                            y: 700,
                            opacity: 0,
                            x: Math.random() * window.innerWidth - window.innerWidth / 2,
                            scale: 0.5 + Math.random() * 0.3,
                        }}
                        animate={{
                            y: Math.random() * -900 - 100,
                            opacity: 1,
                            rotate: Math.random() * 360,
                            x: Math.random() * window.innerWidth - window.innerWidth / 2,
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                        className="absolute bottom-0"
                    >
                        <motion.div
                            className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 border-2 border-yellow-200 shadow-xl flex items-center justify-center text-white"
                            style={{ boxShadow: '0 0 25px rgba(255, 215, 0, 0.6)' }}
                        >
                            <Euro className="w-6 h-6 text-white drop-shadow-lg" />
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>

            <header className="relative z-10 -translate-y-10">
                <section>
                    <div className="flex flex-col items-center justify-center gap-8 p-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl w-[400px]">
                        <h1 className="text-4xl font-extrabold tracking-wide">Login</h1>

                        <form className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-gray-800 text-sm">
                                    Telefon yoki email*
                                </label>
                                <input
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    type="text"
                                    placeholder="Enter your phone or email"
                                    className="border border-gray-300 bg-white px-4 py-2.5 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#9400dd] focus:border-[#9400dd] transition-all duration-200 text-gray-800 placeholder-gray-400"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-gray-800 text-sm">
                                    Parol*
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="border border-gray-300 bg-white px-4 py-2.5 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#9400dd] focus:border-[#9400dd] transition-all duration-200 text-gray-800 placeholder-gray-400"
                                />
                                <p className="text-xs text-gray-600">
                                    Parol kamida 8 ta belgidan iborat bo‘lishi kerak
                                </p>
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-3 bg-[#9400dd] text-white font-semibold py-2.5 rounded-lg hover:bg-[#7a00b7] hover:shadow-lg transition-all duration-300"
                            >
                                Get Started
                            </button>
                        </form>
                    </div>
                </section>
            </header>

            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg z-50"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-medium text-sm">
                            Tizimga muvaffaqiyatli kirdingiz!
                        </span>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-6 right-6 bg-red-500 text-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg z-50"
                    >
                        <XCircle className="w-6 h-6" />
                        <span className="font-medium text-sm">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Auth

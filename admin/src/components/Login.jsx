import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { MdAdminPanelSettings } from "react-icons/md";
import Animation from './Animation';
import Atom from './Atom';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                toast.success("Admin Logged In Successfully")
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center flex-col justify-center relative w-full overflow-hidden'>
            <Animation />
            <div className='bg-white shadow-md z-10 rounded-lg px-8 py-6 max-w-md'>
                <div className="flex items-center justify-center text-4xl font-bold mb-4 text-russian_violet">
                    <MdAdminPanelSettings className="mr-2" />
                    <h3>Admin Panel</h3>
                </div>
                <Atom />
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-md font-medium text-russian_violet mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-md font-medium text-russian_violet mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md font-medium text-white bg-true_blue hover:bg-russian_violet' type="submit"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login
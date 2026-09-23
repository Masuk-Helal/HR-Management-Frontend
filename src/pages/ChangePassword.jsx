
import React, { useContext, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {accessToken} = useContext(AuthContext)

    const handleChangePassword = async(e) => {
        e.preventDefault();

        const passwordData = {
            current_password: currentPassword,
            new_password: newPassword
        };

        const res = await fetch(`${baseUrl}/passwordchange`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(passwordData)
        })

        const data = await res.json();

        if (!res.ok) {
            toast.error(data?.detail || data?.message || 'Failed to change password');
            return;
        }

        toast.success(data.message || 'Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Change Password
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your account password to keep your account secure.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">

                    <form onSubmit={handleChangePassword}>

                        {/* Current Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter your current password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300
                                outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300
                                outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-blue-600
                            text-white font-semibold hover:bg-blue-700
                            transition shadow-sm"
                        >
                            Change Password
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default ChangePassword;


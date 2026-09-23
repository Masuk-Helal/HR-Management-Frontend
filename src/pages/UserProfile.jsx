import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { baseUrl } from '../services/BaseUrl';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { accessToken } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const loadProfile = () => {
        fetch(`${baseUrl}/getuser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setFirstName(data.firstname || '');
                setLastName(data.lastname || '');
                setUsername(data.username || '');
                setEmail(data.email || '');
            });
    };

    useEffect(() => {
        if (!accessToken) return;
        loadProfile();
    }, [accessToken]);


    const handleUpdateUser = async (e)=>{
        e.preventDefault();

        const formData = {
            firstname: firstName,
            lastname:lastName,
            username,
            email
        }


        const res = await fetch(`${baseUrl}/edituser`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();

        loadProfile();

        toast(data.message)
    }

   

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your personal information and account details.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
                        <div className="flex items-center gap-5">

                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-white/20 
                                border-2 border-white/50 flex items-center 
                                justify-center text-white text-2xl font-bold">
                                {profile?.firstname?.charAt(0)}
                                {profile?.lastname?.charAt(0)}
                            </div>

                            <div className="text-white">
                                <h2 className="text-2xl font-semibold">
                                    {profile?.firstname} {profile?.lastname}
                                </h2>

                                <p className="text-blue-100">
                                    @{profile?.username}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-3 py-1 text-xs font-medium
                                        bg-white/20 rounded-full">
                                        {profile?.role}
                                    </span>

                                    {profile?.is_active && (
                                        <span className="px-3 py-1 text-xs font-medium 
                                            bg-green-500/90 rounded-full">
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="p-8">

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Personal Information
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Update the information associated with your account.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>

                                <input
                                    value={firstName}
                                    onChange={(e)=> setFirstName(e.target.value)}
                                    type="text"
                                    name="firstname"
                                    className="w-full px-4 py-3 rounded-xl border 
                                    border-gray-300 outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 transition"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>

                                <input
                                    value={lastName}
                                    onChange={(e)=> setLastName(e.target.value)}
                                    type="text"
                                    name="lastname"
                                    className="w-full px-4 py-3 rounded-xl border 
                                    border-gray-300 outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 transition"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>

                                <input
                                    value={username}
                                    onChange={(e)=> setUsername(e.target.value)}
                                    type="text"
                                    name="username"
                                    className="w-full px-4 py-3 rounded-xl border 
                                    border-gray-300 outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 transition"
                                    placeholder="Enter your username"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <input
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 rounded-xl border 
                                    border-gray-300 outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 transition"
                                    placeholder="Enter your email"
                                />
                            </div>

                        </div>

                        {/* Account Information */}
                        <div className="mt-8 pt-8 border-t border-gray-200">

                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Account Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500">
                                        User ID
                                    </p>
                                    <p className="font-semibold text-gray-900 mt-1">
                                        #{profile?.id}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500">
                                        Account Role
                                    </p>
                                    <p className="font-semibold text-gray-900 mt-1 capitalize">
                                        {profile?.role}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">

                            <button
                                type="button"
                                className="px-5 py-3 rounded-xl border 
                                border-gray-300 text-gray-700 font-medium
                                hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                               onClick={handleUpdateUser}
                                className="px-6 py-3 rounded-xl bg-blue-600 
                                text-white font-medium hover:bg-blue-700 
                                transition shadow-sm"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
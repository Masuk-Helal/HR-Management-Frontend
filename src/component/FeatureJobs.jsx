import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { baseUrl } from '../services/BaseUrl';

const gradients = [
    'from-blue-400 to-indigo-500',
    'from-green-400 to-emerald-500',
    'from-orange-400 to-amber-500',
    'from-pink-400 to-rose-500',
    'from-purple-400 to-violet-500',
    'from-cyan-400 to-sky-500',
    'from-red-400 to-orange-500',
    'from-teal-400 to-green-500',
];

const FeatureJobs = () => {

    const [featureJobs, SetFeatureJob] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/jobs/all`)
            .then(res => res.json())
            .then(data => SetFeatureJob(Array.isArray(data) ? data : []))
            .catch(() => SetFeatureJob([]));
    }, []);

    return (
        <div className="py-16 px-6 lg:px-12 bg-base-100">
            <div className="text-center mb-12">
                <p className="text-success font-semibold">Here You Can See</p>
                <h2 className="text-3xl lg:text-4xl font-extrabold mt-1">
                    Featured <span className="text-primary">Jobs</span>
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureJobs.slice(0, 8).map((job, i) => (
                    <div
                        key={job.id}
                        className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-8 transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                        <p className="flex items-center gap-1 text-xs font-medium text-base-content/60">
                            💼 {job.job_type}
                        </p>

                        <Link
                            to={`/jobdetails/${job.id}`}
                            className="block font-bold text-lg mt-2 hover:text-primary transition-colors"
                        >
                            {job.title}
                        </Link>

                        <p className="flex items-center gap-1 text-sm text-primary font-medium mt-1">
                            📍 {job.location}
                        </p>

                        <div className="divider my-3"></div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-base-content/50">
                                    {job.created_at
                                        ? new Date(job.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric',
                                        })
                                        : ''}
                                </p>
                                <p className="font-semibold text-sm mt-0.5">{job.department}</p>
                            </div>

                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center bg-linear-to-br ${gradients[i % gradients.length]}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <rect x="3" y="7" width="18" height="13" rx="2" />
                                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/alljobs" className="btn btn-primary rounded-full px-8 py-6 h-auto">
                    View All Featured Jobs
                </Link>
            </div>
        </div>
    );
};

export default FeatureJobs;

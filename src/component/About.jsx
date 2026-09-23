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

const About = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/jobs/all`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) return;

                const grouped = {};

                data.forEach(job => {
                    const key = job.department || 'General';

                    if (!grouped[key]) {
                        grouped[key] = { name: key, location: job.location, openJobs: 0 };
                    }

                    if (job.is_active) {
                        grouped[key].openJobs += 1;
                    }
                });

                setCompanies(Object.values(grouped).slice(0, 8));
            })
            .catch(() => setCompanies([]));
    }, []);

    if (companies.length === 0) return null;

    return (
        <div className="py-16 px-6 lg:px-12 bg-base-100">
            <div className="text-center mb-12">
                <p className="text-success font-semibold">Here You Can See</p>
                <h2 className="text-3xl lg:text-4xl font-extrabold mt-1">
                    Top Companies are Hiring
                </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {companies.map((company, i) => (
                    <div
                        key={company.name}
                        className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition"
                    >
                        <div
                            className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${gradients[i % gradients.length]}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-7 w-7"
                            >
                                <rect x="3" y="7" width="18" height="13" rx="2" />
                                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </div>

                        <h3 className="font-bold text-lg">{company.name}</h3>

                        <p className="flex items-center justify-center gap-1 text-sm text-base-content/60 mt-1">
                            📍 {company.location}
                        </p>

                        <div className="badge badge-primary badge-outline rounded-full mt-4 gap-1 px-4 py-3">
                            💼 {company.openJobs} Open {company.openJobs === 1 ? 'Job' : 'Jobs'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/alljobs" className="btn btn-primary rounded-full px-8">
                    View All Featured Companies
                </Link>
            </div>
        </div>
    );
};

export default About;

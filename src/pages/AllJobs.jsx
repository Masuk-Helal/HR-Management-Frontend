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

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [copyJobs, setCopyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    useEffect(() => {
        fetch(`${baseUrl}/jobs/all`)
            .then(res => res.json())
            .then(data => setJobs(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = [...jobs];

        if (search.trim() !== "") {
            result = result.filter(job => job.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (jobType !== "") {
            result = result.filter(job => job.job_type === jobType);
        }

        if (location !== "") {
            result = result.filter(job => job.location === location);
        }

        result.sort((a, b) => {
            const dateA = new Date(a.created_at || 0);
            const dateB = new Date(b.created_at || 0);
            return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
        });

        setCopyJobs(result);
    }, [jobs, search, jobType, location, sortBy]);

    const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))];

    return (
        <div>
            {/* Banner */}
            <div className="bg-linear-to-br from-primary/10 via-base-100 to-success/10 px-6 lg:px-12 py-16">
                <div className="max-w-5xl mx-auto">
                    <span className="badge badge-primary badge-outline rounded-full px-4 py-3 text-xs font-semibold tracking-wide">
                        BROWSE OPPORTUNITIES
                    </span>

                    <h1 className="mt-6 text-3xl lg:text-5xl font-extrabold leading-tight">
                        Find a role that matches your ambition
                    </h1>

                    <p className="mt-4 text-base-content/70 max-w-2xl">
                        Search thousands of curated openings across industries, experience levels, and locations.
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row gap-3">
                        <label className="input input-bordered rounded-full flex items-center gap-2 bg-base-100 flex-1">
                            <svg
                                className="h-4 w-4 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                <path strokeLinecap="round" strokeWidth="2" d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Job title, keyword or company"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>

                        <select
                            name="job_type"
                            id="job_type"
                            className="select select-bordered rounded-full bg-base-100"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="">Category</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Job list */}
            <div className="max-w-5xl mx-auto px-6 lg:px-0 py-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{copyJobs.length} Jobs Found</h2>
                        <p className="text-sm text-base-content/60">
                            Showing 1 - {copyJobs.length} of {copyJobs.length} results
                        </p>
                    </div>

                    <select
                        className="select select-bordered rounded-full bg-base-100 w-fit"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="recent">Most recent</option>
                        <option value="oldest">Oldest first</option>
                    </select>
                </div>

                {loading ? (
                    <p className="text-center py-16">Loading jobs...</p>
                ) : copyJobs.length === 0 ? (
                    <p className="text-center py-16">No jobs available right now.</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        {copyJobs.map((job, i) => (
                            <div
                                key={job.id}
                                className="bg-base-100 border border-base-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <span className="badge badge-success badge-outline rounded-full px-3 py-3">
                                        {job.job_type}
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 mt-3">
                                    <div
                                        className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-linear-to-br ${gradients[i % gradients.length]}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <rect x="3" y="7" width="18" height="13" rx="2" />
                                            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/jobdetails/${job.id}`}
                                            className="font-bold text-lg hover:text-primary transition-colors"
                                        >
                                            {job.title}
                                        </Link>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mt-1">
                                            <span className="flex items-center gap-1">
                                                💼 {job.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                📍 {job.location}
                                            </span>
                                            {job.salary && (
                                                <span>
                                                    ৳{job.salary.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        {job.description && (
                                            <p className="text-sm text-base-content/70 mt-3 line-clamp-2">
                                                {job.description}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        to={`/jobdetails/${job.id}`}
                                        className="btn btn-outline btn-primary rounded-full shrink-0"
                                    >
                                        View Details
                                    </Link>
                                </div>

                                <div className="divider my-4"></div>

                                <div className="flex items-center justify-between text-xs text-base-content/50">
                                    <span>
                                        Posted{' '}
                                        {job.created_at
                                            ? new Date(job.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric',
                                            })
                                            : 'N/A'}
                                    </span>
                                    <span>ID: JOB-{job.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllJobs;

import React, { useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import JobCard from '../component/JobCard';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}/jobs/all`)
            .then(res => res.json())
            .then(data => setJobs(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className='text-center text-4xl font-bold py-16'>All Jobs</h1>

            {loading ? (
                <p className='text-center'>Loading jobs...</p>
            ) : jobs.length === 0 ? (
                <p className='text-center'>No jobs available right now.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-24 pb-16'>
                    {jobs.map(job => (
                        <JobCard key={job.id} jobs={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllJobs;
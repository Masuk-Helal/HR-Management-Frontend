import React, { useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import JobCard from './JobCard';

const FeatureJobs = () => {

    const [featureJobs, SetFeatureJob] = useState([]);

    useEffect(()=>{
       fetch(`${baseUrl}/jobs/all`)
       .then(res => res.json())
       .then(data => SetFeatureJob(data))
    },[])

    return (
        <div>
            <h1 className='text-center text-4xl font-bold py-16'>Feature Bookss</h1>
            <div className='grid grid-cols-3 gap-12 px-24'>
                {featureJobs.slice(0,3).map(jobs => <JobCard jobs={jobs} id={jobs.id}></JobCard>)}
            </div>
        </div>
        );
};

export default FeatureJobs;
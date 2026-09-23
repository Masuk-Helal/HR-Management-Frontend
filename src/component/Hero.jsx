import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { baseUrl } from '../services/BaseUrl';
import heroImage from '../assets/hero-job.webp';

const Hero = () => {
    const [jobCount, setJobCount] = useState(0);

    useEffect(() => {
        fetch(`${baseUrl}/jobs/all`)
            .then(res => res.json())
            .then(data => setJobCount(Array.isArray(data) ? data.length : 0))
            .catch(() => setJobCount(0));
    }, []);

    return (
        <div className="bg-linear-to-br from-primary/10 via-base-100 to-success/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid md:grid-cols-2 gap-10 lg:gap-12 items-center">

                {/* Left content */}
                <div>
                    <span className="badge badge-success badge-outline rounded-full px-4 py-3 text-xs font-semibold tracking-wide">
                        READY TO FIND YOUR DREAM JOB?
                    </span>

                    <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight">
                        Take the next step in your career journey.
                    </h1>

                    <p className="mt-6 text-base-content/70 max-w-lg">
                        Explore opportunities that match your skills and passions, and
                        land the job you've always wanted with Jobs Portal.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <div className="badge badge-lg bg-base-100 border border-base-300 rounded-full px-5 py-6 font-bold text-primary">
                            {jobCount}+
                            <span className="ml-1 font-normal text-base-content/60">Active Jobs</span>
                        </div>

                        <Link to="/alljobs" className="link link-hover font-semibold">
                            Search Jobs
                        </Link>
                    </div>

                    <div className="mt-8">
                        <Link to="/alljobs" className="btn btn-primary rounded-full px-8">
                            Browse All Jobs
                        </Link>
                    </div>
                </div>

                {/* Right illustration */}
                <div className="relative hidden md:flex justify-center items-center">
                    <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
                    <img
                        src={heroImage}
                        alt="Find a perfect job"
                        className="relative w-full max-w-xl object-contain"
                    />
                </div>

            </div>
        </div>
    );
};

export default Hero;

import React from 'react';
import Hero from '../component/Hero';
import About from '../component/About';
import FeatureBooks from './../component/FeatureJobs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <FeatureBooks></FeatureBooks>
            <About></About>
        </div>
    );
};

export default Home;
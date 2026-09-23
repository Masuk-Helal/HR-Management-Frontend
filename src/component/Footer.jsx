import React from 'react';
import { Link } from 'react-router';

const functionalAreas = [
    'Marketing',
    'Graphic Design',
    'Business Management',
    'Software & Web Development',
    'Admin',
    'Database Administration',
    'Advertising',
    'Web Developer',
];

const industries = [
    'Courier/Logistics',
    'Travel/Tourism/Transportation',
    'Fashion',
    'Electronics',
    'Automobile',
    'Advertising/PR',
    'Health & Fitness',
    'Information Technology',
];

const socialIcons = [
    <path key="fb" d="M13 22v-8h3l1-4h-4V8c0-1.1.9-2 2-2h2V2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4z" />,
    <path key="tw" d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.5 11.5 0 0 1 3.4 4.7a4 4 0 0 0 1.2 5.4c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4 4 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8 8 0 0 1 2 18.6a11.4 11.4 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />,
    <path key="in" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />,
    <path key="ig" d="M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.2.4a4.4 4.4 0 0 1 1.6 1c.5.5.8 1 1 1.6.2.4.4 1.1.4 2.2.1 1.2.1 1.5.1 4.2s0 3-.1 4.1c0 1.1-.2 1.8-.4 2.2a4.4 4.4 0 0 1-1 1.6 4.4 4.4 0 0 1-1.6 1c-.4.2-1.1.4-2.2.4-1.2.1-1.5.1-4.2.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.2-.4a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.2-.4-.4-1.1-.4-2.2C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.4-2.2a4.4 4.4 0 0 1 1-1.6 4.4 4.4 0 0 1 1.6-1c.4-.2 1.1-.4 2.2-.4C8.1 2.1 8.5 2 12 2zm0 1.8c-2.6 0-2.9 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.9-.2-1.4-.3-1.7a2.6 2.6 0 0 0-.6-1 2.6 2.6 0 0 0-1-.6c-.3-.1-.8-.3-1.7-.3-1.1-.1-1.4-.1-4-.1zm0 4.5a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4zm0 1.8a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zm4.7-2a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74z" />,
];

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content mt-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                <nav>
                    <h6 className="font-bold text-lg mb-4">Quick Links</h6>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-content/70">
                        <li><Link to="/" className="hover:text-neutral-content transition-colors">Home</Link></li>
                        <li><Link to="/alljobs" className="hover:text-neutral-content transition-colors">All Jobs</Link></li>
                        <li><Link to="/apply" className="hover:text-neutral-content transition-colors">My Applyed</Link></li>
                        <li><span className="cursor-default">About Us</span></li>
                        <li><span className="cursor-default">Terms Of Use</span></li>
                    </ul>
                </nav>

                <nav>
                    <h6 className="font-bold text-lg mb-4">Jobs By Functional Area</h6>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-content/70">
                        {functionalAreas.map(area => (
                            <li key={area}>
                                <Link to="/alljobs" className="hover:text-neutral-content transition-colors">
                                    {area}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav>
                    <h6 className="font-bold text-lg mb-4">Jobs By Industry</h6>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-content/70">
                        {industries.map(industry => (
                            <li key={industry}>
                                <Link to="/alljobs" className="hover:text-neutral-content transition-colors">
                                    {industry}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h6 className="font-bold text-lg mb-4">Contact Us</h6>
                    <div className="flex flex-col gap-3 text-sm text-neutral-content/70">
                        <p className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-primary">
                                <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            123 Main Street, Suite 100, Career City, CC 00000
                        </p>
                        <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-primary">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 6-10 7L2 6" />
                            </svg>
                            info@jobsportal.com
                        </p>
                        <p className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-primary">
                                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
                            </svg>
                            +1 (000) 000-0000
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            {socialIcons.map((iconPath, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label="social link"
                                    className="w-9 h-9 rounded-full bg-neutral-content/10 flex items-center justify-center hover:bg-primary transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        {iconPath}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="border-t border-neutral-content/10 py-5 text-center text-xs text-neutral-content/50">
                © {new Date().getFullYear()} Jobs Portal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

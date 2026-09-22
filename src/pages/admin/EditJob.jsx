import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import { baseUrl } from '../../services/BaseUrl';
import toast from 'react-hot-toast';

const EditJob = () => {

    const { id } = useParams();
    const { accessToken } = useContext(AuthContext);

    const [jobDetails, setJobDetails] = useState(null);

    // Form states
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [salary, setSalary] = useState(0);
    const [vacancies, setVacancies] = useState(1);
    const [skillsRequired, setSkillsRequired] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [benefits, setBenefits] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [description, setDescription] = useState('');


    // Get job details
    useEffect(() => {
        if (!id || !accessToken) return;

        fetch(`${baseUrl}/job/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setJobDetails(data))
            .catch(err => console.log(err));

    }, [id, accessToken]);


    // Set API data into states
    useEffect(() => {

        if (jobDetails) {

            setTitle(jobDetails.title || '');
            setDepartment(jobDetails.department || '');
            setLocation(jobDetails.location || '');
            setJobType(jobDetails.job_type || '');
            setExperienceLevel(jobDetails.experience_level || '');
            setSalary(jobDetails.salary ?? 0);
            setVacancies(jobDetails.vacancies ?? 1);
            setSkillsRequired(jobDetails.skills_required || '');
            setQualifications(jobDetails.qualifications || '');
            setResponsibilities(jobDetails.responsibilities || '');
            setBenefits(jobDetails.benefits || '');
            setApplicationDeadline(
                jobDetails.application_deadline
                    ? jobDetails.application_deadline.slice(0, 16)
                    : ''
            );
            setDescription(jobDetails.description || '');

        }

    }, [jobDetails]);

    const handleUpdate = async () => {
        const formData = {
            title,
            department,
            location,
            job_type: jobType,
            experience_level: experienceLevel,
            salary,
            vacancies,
            skills_required: skillsRequired,
            qualifications,
            responsibilities,
            benefits,
            application_deadline: applicationDeadline
                ? new Date(applicationDeadline).toISOString()
                : null,
            description
        }



        const res = await fetch(`${baseUrl}/hr/update_job/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();
        console.log(data);
        toast.success(data.message)
    }


    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Edit Job
            </h1>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            defaultValue={jobDetails?.title }
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department
                        </label>

                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type
                        </label>

                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>Choose...</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>


                    {/* Experience Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Level
                        </label>

                        <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>Choose...</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="Lead">Lead</option>
                        </select>
                    </div>


                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary
                        </label>

                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Vacancies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vacancies
                        </label>

                        <input
                            type="number"
                            value={vacancies}
                            onChange={(e) => setVacancies(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Application Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Application Deadline
                        </label>

                        <input
                            type="datetime-local"
                            value={applicationDeadline}
                            onChange={(e) => setApplicationDeadline(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                </div>


                {/* Description */}
                <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>


                {/* Responsibilities */}
                <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Responsibilities (comma separated)
                    </label>

                    <textarea
                        rows="3"
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>


                {/* Qualifications */}
                <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualifications
                    </label>

                    <textarea
                        rows="3"
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>


                {/* Skills Required */}
                <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills Required (comma separated)
                    </label>

                    <textarea
                        rows="3"
                        value={skillsRequired}
                        onChange={(e) => setSkillsRequired(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>


                {/* Benefits */}
                <div className="mt-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benefits (comma separated)
                    </label>

                    <textarea
                        rows="3"
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>


                {/* Button */}
                <div className="flex justify-end mt-6">

                    <button onClick={handleUpdate}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Update Job
                    </button>

                </div>

            </div>

        </div>
    );
};

export default EditJob;

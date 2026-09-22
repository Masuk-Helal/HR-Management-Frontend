import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState("");
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    if (!id) return;

    if (!accessToken) {
      setError("Please log in to view job details.");
      return;
    }

    setError("");
    setJobDetails(null);

    fetch(`${baseUrl}/job/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.detail || "Failed to load job details");
        }
        setJobDetails(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || "Failed to load job details");
      });
  }, [id, accessToken]);

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen px-4 text-center">
        <p className="text-error font-semibold">{error}</p>
        {!accessToken && (
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        )}
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="badge badge-primary">
                    {jobDetails.job_type}
                  </span>

                  <span className="badge badge-outline">
                    {jobDetails.experience_level}
                  </span>

                  {jobDetails.is_active && (
                    <span className="badge badge-success badge-outline">
                      Active
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold">{jobDetails.title}</h1>

                <p className="text-base-content/60 mt-2">
                  {jobDetails.department}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <span>📍 {jobDetails.location}</span>
                  <span>💰 ৳{jobDetails.salary.toLocaleString()}</span>
                  <span>👥 {jobDetails.vacancies} Vacancies</span>
                </div>
              </div>

              <div className="flex items-center">
                <Link
                  to={`/apply/${jobDetails.id}`}
                  className="btn btn-primary btn-lg w-full md:w-auto"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">Job Description</h2>

                <p className="text-base-content/70 leading-7">
                  {jobDetails.description}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">Responsibilities</h2>

                <div className="text-base-content/70 leading-8">
                  {jobDetails.responsibilities.split(",").map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span>{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">Qualifications</h2>

                <p className="text-base-content/70 leading-7">
                  {jobDetails.qualifications}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">Required Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {jobDetails.skills_required.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline p-3"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl">Benefits</h2>

                <div className="text-base-content/70 leading-8">
                  {jobDetails.benefits.split(",").map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-success">✓</span>
                      <span>{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Job Overview */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Job Overview</h2>

                <div className="divider my-1"></div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-base-content/50">Job Type</p>
                    <p className="font-semibold">{jobDetails.job_type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">Experience</p>
                    <p className="font-semibold">
                      {jobDetails.experience_level}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">Department</p>
                    <p className="font-semibold">{jobDetails.department}</p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">Location</p>
                    <p className="font-semibold">{jobDetails.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">Salary</p>
                    <p className="font-semibold text-primary">
                      ৳{jobDetails.salary.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">Vacancies</p>
                    <p className="font-semibold">{jobDetails.vacancies}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div className="card bg-primary text-primary-content shadow">
              <div className="card-body">
                <h2 className="card-title">Application Deadline</h2>

                <p className="text-lg font-semibold">
                  {new Date(jobDetails.application_deadline).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>

                <Link
                  to={`/apply/${jobDetails.id}`}
                  className="btn btn-neutral mt-3"
                >
                  Apply for this Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

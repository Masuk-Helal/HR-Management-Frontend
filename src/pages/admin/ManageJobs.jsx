import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { baseUrl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [copyJobs, setCopyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const { accessToken } = useContext(AuthContext);

  const fetchJobs = () => {
    fetch(`${baseUrl}/jobs/all`)
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (search.trim() !== "") {
      result = result.filter(job => job.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (jobType !== "") {
      result = result.filter(job => job.job_type === jobType);
    }

    setCopyJobs(result);
  }, [jobs, search, jobType]);

  const deleteJobs = async (id) => {
    const res = await fetch(`${baseUrl}/hr/delete_job/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    toast.success(data.message);
    fetchJobs();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Manage Jobs</h1>
          <p className="text-base-content/60">
            View, edit, or remove your published job listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="input input-bordered rounded-full flex items-center gap-2 bg-base-100 w-100">
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
              placeholder="Search anything's"
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
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Job Type</th>
              <th>Salary</th>
              <th>Vacancies</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <span className="loading loading-spinner"></span>
                </td>
              </tr>
            ) : copyJobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  No jobs found.
                </td>
              </tr>
            ) : (
              copyJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>{job.job_type}</td>
                  <td>৳{job.salary?.toLocaleString()}</td>
                  <td>{job.vacancies}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.is_active ? "badge-success" : "badge-error"
                      } badge-outline`}
                    >
                      {job.is_active ? "Active" : "Closed"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/hr/edit-job/${job.id}`}
                        className="btn btn-sm btn-outline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteJobs(job.id)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { baseUrl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);

  const fetchJobs = () => {
    fetch(`${baseUrl}/jobs/all`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
      <h1 className="text-3xl font-bold mb-1">Manage Jobs</h1>
      <p className="text-base-content/60 mb-6">
        View, edit, or remove your published job listings.
      </p>

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
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
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

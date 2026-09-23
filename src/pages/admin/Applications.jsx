import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [jobsById, setJobsById] = useState({});
  const [copyApplications, setCopyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [approvingId, setApprovingId] = useState(null);
  const { accessToken } = useContext(AuthContext);

  const loadApplications = () => {
    fetch(`${baseUrl}/hr/applications`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();

    fetch(`${baseUrl}/jobs/all`)
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        (Array.isArray(data) ? data : []).forEach((job) => {
          map[job.id] = job;
        });
        setJobsById(map);
      });
  }, [accessToken]);

  useEffect(() => {
    let result = [...applications];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter((app) => {
        const job = jobsById[app.job_id];
        const jobTitle = job?.title || '';
        const department = job?.department || '';
        return jobTitle.toLowerCase().includes(q) || department.toLowerCase().includes(q);
      });
    }

    setCopyApplications(result);
  }, [applications, search, jobsById]);

  const handleApprove = async (applicationId) => {
    setApprovingId(applicationId);

    const res = await fetch(`${baseUrl}/hr/approve_application/${applicationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    setApprovingId(null);

    if (!res.ok) {
      toast.error(data?.detail || "Failed to approve application");
      return;
    }

    toast.success(data.message || "Application approved");
    loadApplications();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Job Applications</h1>
          <p className="text-base-content/60">
            View every application submitted to your job postings.
          </p>
        </div>

        <label className="input input-bordered rounded-full flex items-center gap-2 bg-base-100 w-full md:w-64">
          <svg
            className="h-4 w-4 opacity-50 shrink-0"
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
            placeholder="Search by job or applicant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Applicant ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <span className="loading loading-spinner"></span>
                </td>
              </tr>
            ) : copyApplications.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  No applications found.
                </td>
              </tr>
            ) : (
              copyApplications.map((app) => {
                const job = jobsById[app.job_id];

                return (
                  <tr key={app.id}>
                    <td>#{app.id}</td>
                    <td>{job?.title || `Job #${app.job_id}`}</td>
                    <td>{job?.department || '-'}</td>
                    <td>#{app.applicant_id}</td>
                    <td>
                      <span
                        className={`badge badge-outline ${
                          app.status === 'approved'
                            ? 'badge-success'
                            : app.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}
                      >
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      {app.status === 'approved' ? (
                        <span className="text-success text-sm font-medium">Approved</span>
                      ) : (
                        <button
                          onClick={() => handleApprove(app.id)}
                          disabled={approvingId === app.id}
                          className="btn btn-sm btn-success btn-outline"
                        >
                          {approvingId === app.id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            'Approve'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;

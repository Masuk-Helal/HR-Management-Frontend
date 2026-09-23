import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseUrl } from "../services/BaseUrl";

const steps = ["Applied", "Under Review", "Approved"];

const getActiveStep = (status) => {
  if (status === "approved") return 3;
  if (status === "rejected") return 2;
  return 2;
};

const MyApplyed = () => {
  const [applications, setApplications] = useState([]);
  const [jobsById, setJobsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const { accessToken } = useContext(AuthContext);

  const loadApplications = () => {
    fetch(`${baseUrl}/apply/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err))
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

  const handleCancel = async (applicationId) => {
    setCancellingId(applicationId);

    const res = await fetch(`${baseUrl}/apply/cancel/${applicationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    setCancellingId(null);

    if (!res.ok) {
      toast.error(data?.detail || "Failed to cancel application");
      return;
    }

    toast.success(data?.message || "Application cancelled");
    loadApplications();
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="mt-2 text-base-content/60">
            Track the status of the jobs you've applied to.
          </p>
        </div>

        {loading ? (
          <p className="text-center py-16">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-center py-16">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {applications.map((app) => {
              const job = jobsById[app.job_id];
              const activeStep = getActiveStep(app.status);

              return (
                <div key={app.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">

                    {/* Top Section */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-base-content/50">Job</p>
                        <h2 className="text-2xl font-bold">
                          {job?.title || `Job #${app.job_id}`}
                        </h2>
                        {job?.department && (
                          <p className="text-sm text-base-content/60">{job.department}</p>
                        )}
                      </div>

                      <span
                        className={`badge badge-lg ${
                          app.status === "approved"
                            ? "badge-success"
                            : app.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </div>

                    <div className="divider"></div>

                    {/* Application Information */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="rounded-xl bg-base-200 p-5">
                        <p className="text-sm text-base-content/50">Application ID</p>
                        <p className="mt-1 text-lg font-semibold">#{app.id}</p>
                      </div>

                      <div className="rounded-xl bg-base-200 p-5">
                        <p className="text-sm text-base-content/50">Job ID</p>
                        <p className="mt-1 text-lg font-semibold">#{app.job_id}</p>
                      </div>
                    </div>

                    {/* Status Section */}
                    {app.status !== "rejected" && (
                      <div className="mt-6 rounded-xl border border-base-300 p-6">
                        <h3 className="text-xl font-bold">Application Status</h3>

                        <ul className="steps steps-vertical lg:steps-horizontal mt-6 w-full">
                          {steps.map((label, i) => (
                            <li
                              key={label}
                              className={`step ${i + 1 <= activeStep ? "step-primary" : ""}`}
                            >
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    {app.status !== "approved" && app.status !== "rejected" && (
                      <div className="mt-4">
                        <button
                          onClick={() => handleCancel(app.id)}
                          disabled={cancellingId === app.id}
                          className="btn btn-error btn-outline btn-sm"
                        >
                          {cancellingId === app.id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Cancel Application"
                          )}
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplyed;

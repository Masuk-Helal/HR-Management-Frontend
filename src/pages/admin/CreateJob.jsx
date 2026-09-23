import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";

const initialJobData = {
  title: "",
  description: "",
  department: "",
  location: "",
  job_type: "",
  experience_level: "",
  salary: "",
  vacancies: 1,
  skills_required: "",
  qualifications: "",
  responsibilities: "",
  benefits: "",
  application_deadline: "",
};

const CreateJob = () => {
  const [jobData, setJobData] = useState(initialJobData);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { accessToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/hr/create_job`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Failed to create job");
        return;
      }

      toast.success(data?.message || "Job created successfully!");
      setShowConfirm(false);
      setJobData(initialJobData);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Create Job</h1>
      <p className="text-base-content/60 mb-6">
        Fill in the details below to post a new job opening.
      </p>

      <div className="bg-base-100 rounded-xl shadow-sm p-4 sm:p-8">
        <form onSubmit={handleOpenConfirm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Job Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="input w-full"
                placeholder="Name"
                value={jobData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Department <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="department"
                className="input w-full"
                placeholder="Name"
                value={jobData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Job Type <span className="text-error">*</span>
              </label>
              <select
                name="job_type"
                className="select w-full"
                value={jobData.job_type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Select Experience <span className="text-error">*</span>
              </label>
              <select
                name="experience_level"
                className="select w-full"
                value={jobData.experience_level}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                No. of Vacancy <span className="text-error">*</span>
              </label>
              <input
                type="number"
                name="vacancies"
                min="1"
                className="input w-full"
                placeholder="Vacancy"
                value={jobData.vacancies}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Last Date To Apply <span className="text-error">*</span>
              </label>
              <input
                type="datetime-local"
                name="application_deadline"
                className="input w-full"
                value={jobData.application_deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Salary From (৳) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                name="salary"
                className="input w-full"
                placeholder="$"
                value={jobData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Enter Location <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="location"
                className="input w-full"
                placeholder="City"
                value={jobData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">
                Description <span className="text-error">*</span>
                <span className="text-base-content/40 font-normal ml-1">
                  ({jobData.description.length}/200)
                </span>
              </label>
              <textarea
                name="description"
                className="textarea w-full h-24"
                placeholder="Brief overview of the role"
                value={jobData.description}
                onChange={handleChange}
                maxLength={200}
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">
                Responsibilities <span className="text-error">*</span>
                <span className="text-base-content/40 font-normal ml-1">
                  (comma separated)
                </span>
              </label>
              <textarea
                name="responsibilities"
                className="textarea w-full h-20"
                placeholder="e.g. Build features, Fix bugs, Review code"
                value={jobData.responsibilities}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Qualifications <span className="text-error">*</span>
              </label>
              <textarea
                name="qualifications"
                className="textarea w-full h-20"
                placeholder="Required education, experience, etc."
                value={jobData.qualifications}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Skills Required <span className="text-error">*</span>
                <span className="text-base-content/40 font-normal ml-1">
                  (comma separated)
                </span>
              </label>
              <textarea
                name="skills_required"
                className="textarea w-full h-20"
                placeholder="e.g. React, JavaScript, Tailwind CSS"
                value={jobData.skills_required}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">
                Benefits <span className="text-error">*</span>
                <span className="text-base-content/40 font-normal ml-1">
                  (comma separated)
                </span>
              </label>
              <textarea
                name="benefits"
                className="textarea w-full h-20"
                placeholder="e.g. Health insurance, Annual bonus, Flexible hours"
                value={jobData.benefits}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            Add Job
          </button>
        </form>
      </div>

      {showConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Job Posting</h3>
            <p className="py-2 text-base-content/70">
              Are you sure you want to post this job?
            </p>

            <div className="bg-base-200 rounded-lg p-4 mt-2 space-y-1 text-sm">
              <p><span className="font-semibold">Title:</span> {jobData.title || "-"}</p>
              <p><span className="font-semibold">Department:</span> {jobData.department || "-"}</p>
              <p><span className="font-semibold">Location:</span> {jobData.location || "-"}</p>
              <p><span className="font-semibold">Job Type:</span> {jobData.job_type || "-"}</p>
              <p><span className="font-semibold">Salary:</span> ৳{jobData.salary || "0"}</p>
              <p><span className="font-semibold">Vacancies:</span> {jobData.vacancies || "-"}</p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn btn-ghost"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Confirm & Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJob;

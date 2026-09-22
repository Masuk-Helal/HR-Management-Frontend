import React from "react";
import { Link } from "react-router";

const jobsCard = ({ jobs }) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all duration-300 w-full">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="card-title text-xl font-bold">{jobs.title}</h2>

            <p className="text-sm text-base-content/60 mt-1">
              {jobs.department}
            </p>
          </div>

          <div
            className={`badge ${
              jobs.is_active ? "badge-success" : "badge-error"
            } badge-outline`}
          >
            {jobs.is_active ? "Active" : "Closed"}
          </div>
        </div>

        {/* jobs Info */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="badge badge-primary badge-outline">
            📍 {jobs.location}
          </span>

          <span className="badge badge-secondary badge-outline">
            💼 {jobs.job_type}
          </span>

          <span className="badge badge-accent badge-outline">
            🎯 {jobs.experience_level}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 mt-4 line-clamp-3">
          {jobs.description}
        </p>

        {/* Salary & Vacancies */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-base-200 rounded-lg p-3">
            <p className="text-xs text-base-content/60">Salary</p>

            <p className="font-bold text-lg text-primary">
              ৳{jobs.salary.toLocaleString()}
            </p>
          </div>

          <div className="bg-base-200 rounded-lg p-3">
            <p className="text-xs text-base-content/60">Vacancies</p>

            <p className="font-bold text-lg">{jobs.vacancies}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Required Skills</p>

          <div className="flex flex-wrap gap-2">
            {jobs.skills_required.split(",").map((skill, index) => (
              <span key={index} className="badge badge-ghost">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="divider my-2"></div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-base-content/60">Application Deadline</p>

            <p className="font-medium text-sm">
              {jobs.application_deadline
                ? new Date(jobs.application_deadline).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <Link to={`/jobdetails/${jobs.id}`}><button className="btn btn-primary">View Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default jobsCard;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { baseUrl } from "../services/BaseUrl";

const MyApplyed = () => {
  const [applyDetails, setApplyDetails] = useState(null);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${baseUrl}/apply/my`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplyDetails(data))
      .catch((err) => console.log(err));
  }, [accessToken]);




  return (
<div className="min-h-screen bg-base-200 px-4 py-10">
  <div className="mx-auto max-w-4xl">

    {/* Header */}
    <div className="mb-6">
      <p className="text-sm text-base-content/50">
        Application #1
      </p>

      <h1 className="mt-1 text-3xl font-bold">
        Job Application
      </h1>

      <p className="mt-2 text-base-content/60">
        Track the status of your job application.
      </p>
    </div>


    {/* Main Card */}
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">

        {/* Top Section */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-base-content/50">
              Job ID
            </p>

            <h2 className="text-2xl font-bold">
              #11
            </h2>
          </div>


          <div>
            <span className="badge badge-warning badge-lg">
              Pending
            </span>
          </div>

        </div>


        <div className="divider"></div>


        {/* Application Information */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Application ID */}
          <div className="rounded-xl bg-base-200 p-5">
            <p className="text-sm text-base-content/50">
              Application ID
            </p>

            <p className="mt-1 text-lg font-semibold">
              #1
            </p>
          </div>


          {/* Job ID */}
          <div className="rounded-xl bg-base-200 p-5">
            <p className="text-sm text-base-content/50">
              Job ID
            </p>

            <p className="mt-1 text-lg font-semibold">
              #11
            </p>
          </div>


          {/* Applicant ID */}
          <div className="rounded-xl bg-base-200 p-5">
            <p className="text-sm text-base-content/50">
              Applicant ID
            </p>

            <p className="mt-1 text-lg font-semibold">
              #6
            </p>
          </div>


          {/* Applied Date */}
          <div className="rounded-xl bg-base-200 p-5">
            <p className="text-sm text-base-content/50">
              Applied Date
            </p>

            <p className="mt-1 text-lg font-semibold">
              22 September 2026
            </p>

            <p className="text-sm text-base-content/50">
              09:19 AM
            </p>
          </div>

        </div>


        {/* Status Section */}
        <div className="mt-6 rounded-xl border border-base-300 p-6">

          <h3 className="text-xl font-bold">
            Application Status
          </h3>


          <ul className="steps steps-vertical lg:steps-horizontal mt-6 w-full">

            <li className="step step-primary">
              Applied
            </li>

            <li className="step step-warning">
              Under Review
            </li>

            <li className="step">
              Approved
            </li>

          </ul>

        </div>


        {/* Current Status Message */}
        <div className="alert alert-warning mt-6">

          <div>

            <h3 className="font-bold">
              Application is under review
            </h3>

            <p className="text-sm">
              Your application has been submitted successfully
              and is waiting for review.
            </p>

          </div>

        </div>

      </div>
    </div>

  </div>
</div>
  );
};

export default MyApplyed;

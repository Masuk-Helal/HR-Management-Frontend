import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const Apply = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!accessToken) {
      setError("Please log in to apply for this job.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/apply/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.detail || "Failed to submit application");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-success">
              Application Submitted!
            </h1>
            <p className="py-4 text-base-content/70">
              Your application has been sent successfully. You can track its
              status from your applications page.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/apply" className="btn btn-primary">
                My Applications
              </Link>
              <Link to="/alljobs" className="btn btn-ghost">
                Browse More Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Apply for this Job</h1>
          <p className="py-4 text-base-content/70">
            Tell us why you're a great fit for job #{id}.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Cover Letter / Message</label>
              <textarea
                className="textarea w-full h-40"
                placeholder="Write a short message about why you're applying..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              {error && <p className="text-error text-sm mt-2">{error}</p>}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleApply}
                  disabled={submitting}
                  className="btn btn-primary flex-1"
                >
                  {submitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Apply"
                  )}
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-ghost"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;

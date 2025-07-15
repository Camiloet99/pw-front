import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>LuxWatch - Luxury Watch Price Checker</title>
        <meta
          name="description"
          content="Find out the value of your luxury watch based on brand, reference, condition, and color. Sign up for free or unlock unlimited searches."
        />
      </Helmet>

      <div className="text-center py-5 bg-light">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-primary">LuxWatch</span>
        </h1>
        <p className="lead mt-3">
          Check the value of luxury watches based on reference, condition, and
          color.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link to="/register" className="btn btn-primary btn-lg">
            Sign Up for Free
          </Link>
          <Link to="/login" className="btn btn-outline-dark btn-lg">
            Log In
          </Link>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4">What can you do with LuxWatch?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Search by Reference</h5>
                <p className="card-text">
                  Find the estimated price based on brand, model, and reference
                  number.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Compare by Condition and Color</h5>
                <p className="card-text">
                  See how the condition and color of a watch affect its resale
                  value.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Unlimited Access Plans</h5>
                <p className="card-text">
                  Unlock unlimited searches with our premium subscription plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/dashboard" className="btn btn-secondary">
            Go to Dashboard (Coming Soon)
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

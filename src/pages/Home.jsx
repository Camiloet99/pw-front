import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Rollie - Luxury Watch Price Checker</title>
        <meta
          name="description"
          content="Find out the value of your luxury watch using AI-based analysis. Search by brand, reference, condition, and color. Sign up for free or unlock unlimited searches."
        />
      </Helmet>

      <div className="text-center py-5 bg-light">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-primary">Rollie</span>
        </h1>
        <p className="lead mt-3">
          Discover the true value of luxury watches — powered by artificial
          intelligence.
        </p>
        <p className="text-muted">
          Our AI engine analyzes thousands of data points across the web to help
          you estimate fair market prices for any luxury watch.
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
        <h2 className="text-center mb-4">What can you do with Rollie?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">AI-Based Price Estimations</h5>
                <p className="card-text">
                  Our intelligent system evaluates real-time listings, sales
                  history and market trends to estimate accurate prices.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Search by Reference</h5>
                <p className="card-text">
                  Quickly find results by brand, model, reference number, or
                  other watch features.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Compare Condition & Color</h5>
                <p className="card-text">
                  Understand how different conditions or styles affect resale
                  value and desirability.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/search" className="btn btn-secondary">
            Start Searching
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

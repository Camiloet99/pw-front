import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";

export default function Search() {
  const [filters, setFilters] = useState({
    reference: "",
    brand: "",
    condition: "",
    color: "",
    material: "",
    year: "",
    priceMin: "",
    priceMax: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState([]);
  const { user } = useAuth();
  const isPremium = user?.plan === "premium";

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulate search results
    const mockResult = [
      {
        id: 1,
        brand: filters.brand || "Rolex",
        reference: filters.reference || "12345",
        condition: filters.condition || "Used",
        color: filters.color || "Black",
        material: filters.material || "Steel",
        year: filters.year || "2022",
        price: "$12,800",
      },
    ];
    setResults(mockResult);
  };

  return (
    <>
      <Helmet>
        <title>Search Watches - LuxWatch</title>
      </Helmet>

      <div className="container mt-4">
        <h2 className="mb-4">Search Luxury Watches</h2>

        <form onSubmit={handleSearch} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Reference</label>
            <input
              type="text"
              name="reference"
              className="form-control"
              value={filters.reference}
              onChange={handleChange}
              placeholder="e.g. 126610LN"
            />
          </div>

          <div className="col-md-6 d-flex align-items-end justify-content-end">
            {isPremium && (
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? "Hide Advanced Search" : "Show Advanced Search"}
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>

          {showAdvanced && (
            <>
              <div className="col-md-4">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={filters.brand}
                  onChange={handleChange}
                  placeholder="e.g. Rolex"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Condition</label>
                <select
                  name="condition"
                  className="form-select"
                  value={filters.condition}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Like New">Like New</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  className="form-control"
                  value={filters.color}
                  onChange={handleChange}
                  placeholder="e.g. Black"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Material</label>
                <input
                  type="text"
                  name="material"
                  className="form-control"
                  value={filters.material}
                  onChange={handleChange}
                  placeholder="e.g. Steel"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Year</label>
                <input
                  type="number"
                  name="year"
                  className="form-control"
                  value={filters.year}
                  onChange={handleChange}
                  placeholder="e.g. 2021"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Min Price</label>
                <input
                  type="number"
                  name="priceMin"
                  className="form-control"
                  value={filters.priceMin}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Max Price</label>
                <input
                  type="number"
                  name="priceMax"
                  className="form-control"
                  value={filters.priceMax}
                  onChange={handleChange}
                  placeholder="e.g. 25000"
                />
              </div>
            </>
          )}
        </form>

        <hr className="my-4" />

        {results.length > 0 && (
          <div className="row">
            {results.map((watch) => (
              <div className="col-md-4 mb-4" key={watch.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{watch.brand}</h5>
                    <p className="card-text">
                      <strong>Reference:</strong> {watch.reference}
                      <br />
                      <strong>Condition:</strong> {watch.condition}
                      <br />
                      <strong>Color:</strong> {watch.color}
                      <br />
                      <strong>Material:</strong> {watch.material}
                      <br />
                      <strong>Year:</strong> {watch.year}
                      <br />
                      <strong>Estimated Price:</strong> {watch.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

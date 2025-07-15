import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  Form,
  Modal,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import { saveSearchToHistory } from "../utils/history";
import SearchHistory from "../components/SearchHistory";

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
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const isPremium = user?.plan === "premium" || user?.role === "admin";
  const [historyRefreshToggle, setHistoryRefreshToggle] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // No guarda búsquedas vacías
    if (!Object.values(filters).some((val) => val)) return;

    if (isPremium) saveSearchToHistory(filters);

    setResults([
      {
        id: 1,
        brand: filters.brand || "Rolex",
        reference: filters.reference || "126610LN",
        condition: filters.condition || "Like New",
        color: filters.color || "Black",
        material: filters.material || "Steel",
        year: filters.year || "2022",
        price: "$12,800",
      },
    ]);
    setShowModal(true);
  };

  const handleRepeatSearch = (prevFilters) => {
    setFilters(prevFilters);
    setTimeout(() => {
      setShowAdvanced(true);
      setShowModal(true);
      setResults([
        {
          id: 1,
          brand: prevFilters.brand || "Rolex",
          reference: prevFilters.reference || "126610LN",
          condition: prevFilters.condition || "Like New",
          color: prevFilters.color || "Black",
          material: prevFilters.material || "Steel",
          year: prevFilters.year || "2022",
          price: "$12,800",
        },
      ]);
    }, 100);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Search Watches - Rollie</title>
      </Helmet>

      <Container className="mt-4">
        <div className="text-center mb-4">
          <h2 className="fw-semibold">Explore the Market</h2>
          <p className="text-muted small">
            Find accurate prices and specs for luxury timepieces.
          </p>
        </div>

        <Form onSubmit={handleSearch}>
          <Card className="p-4 shadow-sm border-0">
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <Form.Group controlId="reference">
                  <Form.Label>Reference Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="reference"
                    value={filters.reference}
                    onChange={handleChange}
                    placeholder="e.g. 126610LN"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                {isPremium && (
                  <Button
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    {showAdvanced ? (
                      <>
                        <FaTimesCircle className="me-1" /> Hide Filters
                      </>
                    ) : (
                      <>
                        <FaSearch className="me-1" /> Advanced
                      </>
                    )}
                  </Button>
                )}
                <Button type="submit" variant="dark">
                  <FaSearch className="me-1" /> Search
                </Button>
              </Col>
            </Row>

            {showAdvanced && (
              <Row className="g-3 mt-3">
                {[
                  ["brand", "Brand", "e.g. Rolex"],
                  [
                    "condition",
                    "Condition",
                    "",
                    ["", "New", "Used", "Like New"],
                  ],
                  ["color", "Color", "e.g. Black"],
                  ["material", "Material", "e.g. Steel"],
                  ["year", "Year", "e.g. 2022"],
                  ["priceMin", "Min Price", "5000"],
                  ["priceMax", "Max Price", "25000"],
                ].map(([key, label, placeholder, options], i) => (
                  <Col md={options ? 4 : key.includes("Price") ? 2 : 4} key={i}>
                    <Form.Group controlId={key}>
                      <Form.Label>{label}</Form.Label>
                      {options ? (
                        <Form.Select
                          name={key}
                          value={filters[key]}
                          onChange={handleChange}
                        >
                          {options.map((opt, idx) => (
                            <option value={opt} key={idx}>
                              {opt || "Select..."}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Control
                          type={
                            key === "year" || key.includes("Price")
                              ? "number"
                              : "text"
                          }
                          name={key}
                          value={filters[key]}
                          onChange={handleChange}
                          placeholder={placeholder}
                        />
                      )}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Form>
      </Container>

      {isPremium && (
        <SearchHistory
          onSearchRepeat={handleRepeatSearch}
          refreshToggle={historyRefreshToggle}
          onClear={() => setHistoryRefreshToggle(!historyRefreshToggle)}
        />
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {results.length === 0 ? (
            <p className="text-center text-muted">No results found.</p>
          ) : (
            results.map((watch) => (
              <Card className="mb-3 shadow-sm" key={watch.id}>
                <Card.Body>
                  <Card.Title className="fs-5 fw-bold">
                    {watch.brand} – {watch.reference}
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    {watch.year} • {watch.condition} • {watch.color} •{" "}
                    {watch.material}
                  </Card.Text>
                  <Card.Text className="fw-semibold">
                    Estimated Price: {watch.price}
                  </Card.Text>
                  <div className="d-flex gap-2 mt-2">
                    <Button variant="success" size="sm">
                      Request Info
                    </Button>
                    <Button variant="outline-dark" size="sm">
                      Contact Seller
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PageTransition>
  );
}

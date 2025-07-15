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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const mockResult = [
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
    ];
    setResults(mockResult);
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Search Watches - Rollie</title>
      </Helmet>

      <Container className="mt-4">
        <div className="text-center mb-4">
          <h2>Search Luxury Watches</h2>
          <p className="text-muted small">
            Find the latest prices and details for high-end timepieces.
          </p>
        </div>

        <Form onSubmit={handleSearch}>
          <Card className="p-4 shadow-sm mb-4">
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <Form.Group controlId="reference">
                  <Form.Label>Reference</Form.Label>
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
                    variant="outline-dark"
                    className="me-2"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    {showAdvanced ? (
                      <>
                        <FaTimesCircle className="me-1" /> Hide Filters
                      </>
                    ) : (
                      <>
                        <FaSearch className="me-1" /> Advanced Filters
                      </>
                    )}
                  </Button>
                )}
                <Button type="submit" variant="primary">
                  <FaSearch className="me-1" />
                  Search
                </Button>
              </Col>
            </Row>

            {showAdvanced && (
              <Row className="g-3 mt-3">
                <Col md={4}>
                  <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={filters.brand}
                      onChange={handleChange}
                      placeholder="e.g. Rolex"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="condition">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select
                      name="condition"
                      value={filters.condition}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Like New">Like New</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      type="text"
                      name="color"
                      value={filters.color}
                      onChange={handleChange}
                      placeholder="e.g. Black"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control
                      type="text"
                      name="material"
                      value={filters.material}
                      onChange={handleChange}
                      placeholder="e.g. Steel"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="year"
                      value={filters.year}
                      onChange={handleChange}
                      placeholder="e.g. 2022"
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="priceMin">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleChange}
                      placeholder="5000"
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="priceMax">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleChange}
                      placeholder="25000"
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Card>
        </Form>
      </Container>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>🔎 Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {results.length === 0 ? (
            <p className="text-center text-muted">No results found.</p>
          ) : (
            results.map((watch) => (
              <Card className="mb-3 shadow-sm border-light" key={watch.id}>
                <Card.Body>
                  <Card.Title className="fw-bold fs-5">
                    {watch.brand} – {watch.reference}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    {watch.year} • {watch.condition} • {watch.color} •{" "}
                    {watch.material}
                  </Card.Text>
                  <Card.Text>
                    <strong>Estimated Price:</strong> {watch.price}
                  </Card.Text>
                  <div className="d-flex gap-2 mt-2">
                    <Button variant="success" size="sm">
                      Request Purchase Info
                    </Button>
                    <Button variant="outline-primary" size="sm">
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
    </>
  );
}

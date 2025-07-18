import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import PageTransition from "../../components/PageTransition";
import { saveSearchToHistory } from "../../utils/history";
import SearchHistory from "../../components/SearchHistory";
import { autocompleteReference } from "../../services/watchService";
import SearchResultsModal from "../../components/SearchResultsModal";
import "./Search.css"; // Import your custom styles

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
  const [historyRefreshToggle, setHistoryRefreshToggle] = useState(false);
  const { user, tiers } = useAuth();
  const [referenceSuggestions, setReferenceSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Nuevo: estados derivados del tier del usuario
  const [showAdvancedEnabled, setShowAdvancedEnabled] = useState(false);
  const [searchHistoryLimit, setSearchHistoryLimit] = useState(0);
  const [autocompleteEnabled, setAutocompleteEnabled] = useState(false);

  // Obtener tier actual del usuario
  const userTier = tiers?.find((t) => t.id === user?.planId);

  useEffect(() => {
    if (userTier) {
      setShowAdvancedEnabled(userTier.advancedSearch || false);
      setSearchHistoryLimit(userTier.searchHistoryLimit || 0);
      setAutocompleteEnabled(userTier.autocompleteReference || false);
    }
  }, [userTier]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === "reference") {
      setIsTyping(true);
      if (autocompleteEnabled && value.length >= 3) {
        // ✅ solo si está permitido
        try {
          const suggestions = await autocompleteReference(value);
          setReferenceSuggestions(suggestions);
        } catch (err) {
          setReferenceSuggestions([]);
        }
      } else {
        setReferenceSuggestions([]);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!Object.values(filters).some((val) => val)) return;

    // Guarda solo si hay espacio en el historial
    if (searchHistoryLimit > 0) {
      saveSearchToHistory(filters, searchHistoryLimit);
      setHistoryRefreshToggle((prev) => !prev); // fuerza re-render del historial
    }

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
    if (showAdvancedEnabled) {
      setShowAdvanced(true);
    } else {
      setShowAdvanced(false);
    }
    setTimeout(() => {
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
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      name="reference"
                      value={filters.reference}
                      onChange={handleChange}
                      placeholder="e.g. 126610LN"
                      autoComplete="off"
                    />
                    {autocompleteEnabled &&
                      isTyping &&
                      referenceSuggestions.length > 0 && (
                        <div
                          className="position-absolute bg-white border rounded shadow-sm mt-1 w-100 z-3"
                          style={{ maxHeight: "200px", overflowY: "auto" }}
                        >
                          {referenceSuggestions.map((suggestion, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 hover-bg-light text-muted"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  reference: suggestion,
                                }));
                                setReferenceSuggestions([]);
                                setIsTyping(false);
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                {showAdvancedEnabled && (
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

      {searchHistoryLimit > 0 && (
        <SearchHistory
          onSearchRepeat={handleRepeatSearch}
          refreshToggle={historyRefreshToggle}
          onClear={() => setHistoryRefreshToggle(!historyRefreshToggle)}
        />
      )}

      <SearchResultsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        results={results}
      />
    </PageTransition>
  );
}

import { useAuth } from "../../contexts/AuthContext";
import {
  Modal,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addFavorite,
  removeFavoriteCall,
} from "../../services/favoriteService";
import { useState, useMemo } from "react";
import moment from "moment";
import "./SearchResultsModal.css"; // Asegúrate de crear este CSS

export default function SearchResultsModal({ show, onHide, results = [] }) {
  const { user, favorites, setFavorites } = useAuth();
  const [loadingReference, setLoadingReference] = useState(null);

  const isFavorite = (reference) =>
    favorites?.some((fav) => fav.referenceCode === reference);

  const toggleFavorite = async (reference) => {
    setLoadingReference(reference);
    let updatedFavorites = [];

    try {
      if (isFavorite(reference)) {
        updatedFavorites = await removeFavoriteCall(user.userId, reference);
      } else {
        updatedFavorites = await addFavorite(user.userId, reference);
      }
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoadingReference(null);
    }
  };

  const renderBadges = (items, variant) => {
    if (!items) return null;
    return items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item, idx) => (
        <Badge bg={variant} key={idx} className="me-1 text-capitalize">
          {item}
        </Badge>
      ));
  };

  const uniqueReferences = useMemo(() => {
    const set = new Set(results.map((w) => w.referenceCode.trim()));
    return Array.from(set);
  }, [results]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-4 fw-semibold">Search Results</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        {results.length === 0 ? (
          <p className="text-center text-muted mt-4">No results found.</p>
        ) : (
          <>
            {/* References summary section */}
            <div className="mb-4">
              <h6 className="fw-semibold text-muted mb-2">
                References in this search:
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {uniqueReferences.map((ref) => (
                  <OverlayTrigger
                    key={ref}
                    placement="top"
                    overlay={
                      <Tooltip>
                        {isFavorite(ref)
                          ? "Remove from favorites"
                          : "Add to favorites"}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant={isFavorite(ref) ? "danger" : "outline-secondary"}
                      size="sm"
                      className={`favorite-pill d-flex align-items-center gap-1 ${
                        isFavorite(ref) ? "pop-heart" : ""
                      }`}
                      onClick={() => toggleFavorite(ref)}
                      disabled={loadingReference === ref}
                    >
                      {isFavorite(ref) ? <AiFillHeart /> : <AiOutlineHeart />}
                      {ref}
                    </Button>
                  </OverlayTrigger>
                ))}
              </div>
            </div>

            {/* Cards */}
            {results.map((watch) => (
              <Card
                key={watch.id}
                className="mb-3 shadow-sm border-0 rounded-4 p-3"
                style={{ background: "#f9f9f9" }}
              >
                <Row>
                  <Col md={8}>
                    <h5 className="fw-bold">{watch.referenceCode}</h5>

                    <div className="text-muted small mb-1">
                      <strong>Production Year:</strong>{" "}
                      {watch.productionYear || "Unknown"}
                    </div>

                    <div className="text-muted small mb-1">
                      <strong>Listed:</strong>{" "}
                      {watch.createdAt
                        ? moment(watch.createdAt).format("MMM D, YYYY")
                        : "Unknown"}
                    </div>

                    {watch.condition && (
                      <div className="mb-2">
                        <strong>Condition:</strong>{" "}
                        {renderBadges(watch.condition, "info")}
                      </div>
                    )}

                    {watch.colorDial && (
                      <div className="mb-2">
                        <strong>Colors:</strong>{" "}
                        {renderBadges(watch.colorDial, "dark")}
                      </div>
                    )}
                  </Col>

                  <Col
                    md={4}
                    className="d-flex flex-column justify-content-between align-items-end text-end"
                  >
                    <div>
                      <div className="fw-semibold fs-5 text-success">
                        ${watch.cost?.toLocaleString()}
                      </div>
                      <div className="text-muted text-uppercase small">
                        {watch.currency || ""}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <Button variant="success" size="sm">
                        Request Info
                      </Button>
                      <Button variant="outline-dark" size="sm">
                        Contact Seller
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

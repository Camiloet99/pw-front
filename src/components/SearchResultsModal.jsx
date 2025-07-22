import { useAuth } from "../contexts/AuthContext";
import {
  Modal,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavoriteCall } from "../services/favoriteService";
import { useState } from "react";
import moment from "moment";

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

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-4 fw-semibold">Search Results</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        {results.length === 0 ? (
          <p className="text-center text-muted mt-4">No results found.</p>
        ) : (
          results.map((watch) => (
            <Card
              key={watch.id}
              className="mb-3 shadow-sm border-0 rounded-3"
              style={{ background: "#f9f9f9" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="fs-5 fw-bold mb-1">
                      {watch.referenceCode}
                    </Card.Title>

                    <Card.Text className="text-muted small mb-1">
                      <strong>Production Year:</strong>{" "}
                      {watch.productionYear || "Unknown"}
                    </Card.Text>

                    <Card.Text className="text-muted small mb-1">
                      <strong>Listed:</strong>{" "}
                      {watch.createdAt
                        ? moment(watch.createdAt).format("MMM D, YYYY")
                        : "Unknown"}
                    </Card.Text>

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
                  </div>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {isFavorite(watch.referenceCode)
                          ? "Remove from favorites"
                          : "Add to favorites"}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="link"
                      className="text-danger p-0 ms-2"
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => toggleFavorite(watch.referenceCode)}
                      disabled={loadingReference === watch.referenceCode}
                    >
                      {isFavorite(watch.referenceCode) ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </Button>
                  </OverlayTrigger>
                </div>

                <Card.Text className="fw-semibold fs-6 mt-2">
                  Estimated Price: ${watch.cost?.toLocaleString()}{" "}
                  {watch.currency ? watch.currency.toUpperCase() : ""}
                </Card.Text>

                <div className="d-flex gap-2 mt-3">
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

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

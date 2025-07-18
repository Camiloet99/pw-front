import { useAuth } from "../contexts/AuthContext";
import { Modal, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavoriteCall } from "../services/favoriteService";
import { useState } from "react";

export default function SearchResultsModal({ show, onHide, results = [] }) {
  const { user, favorites, setFavorites } = useAuth();
  const [loadingReference, setLoadingReference] = useState(null);

  const isFavorite = (reference) =>
    favorites?.some((fav) => fav.referenceCode === reference);

  const toggleFavorite = async (reference) => {
    setLoadingReference(reference);
    let updatedFavorites = [];

    if (isFavorite(reference)) {
      updatedFavorites = await removeFavoriteCall(user.userId, reference);
    } else {
      updatedFavorites = await addFavorite(user.userId, reference);
    }

    setFavorites(updatedFavorites);
    setLoadingReference(null);
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
                      {watch.brand} — {watch.reference}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      {watch.year} • {watch.condition} • {watch.color} •{" "}
                      {watch.material}
                    </Card.Text>
                  </div>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {isFavorite(watch.reference)
                          ? "Remove from favorites"
                          : "Add to favorites"}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="link"
                      className="text-danger p-0 ms-2"
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => toggleFavorite(watch.reference)}
                      disabled={loadingReference === watch.reference}
                    >
                      {isFavorite(watch.reference) ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </Button>
                  </OverlayTrigger>
                </div>

                <Card.Text className="fw-semibold fs-6 mt-1">
                  Estimated Price: ${Number(watch.price).toLocaleString()}
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

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Card,
  Row,
  Col,
  Badge,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AiFillHeart } from "react-icons/ai";
import "./FavoriteWatches.css";

export default function FavoriteWatches() {
  const { favorites, removeFavorite } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [animateHeart, setAnimateHeart] = useState(null);

  if (!favorites || favorites.length === 0) return null;

  const handleRemoveClick = (watch) => {
    setAnimateHeart(watch.referenceCode);
    setTimeout(() => {
      setSelectedWatch(watch);
      setShowConfirm(true);
      setAnimateHeart(null);
    }, 300);
  };

  const confirmRemove = () => {
    if (selectedWatch) {
      removeFavorite(selectedWatch.referenceCode);
    }
    setShowConfirm(false);
    setSelectedWatch(null);
  };

  return (
    <>
      <Row xs={1} md={2} lg={2} className="g-4">
        {favorites.map((watch, index) => (
          <Col key={index}>
            <Card className="shadow-sm h-100 border-0 rounded-4 position-relative">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Remove from favorites</Tooltip>}
              >
                <Button
                  variant="link"
                  className={`position-absolute top-0 end-0 p-2 text-danger ${
                    animateHeart === watch.referenceCode ? "heart-pop" : ""
                  }`}
                  onClick={() => handleRemoveClick(watch)}
                >
                  <AiFillHeart size={20} />
                </Button>
              </OverlayTrigger>
              <Card.Body>
                <Card.Title className="fs-5 fw-semibold text-dark">
                  {watch.referenceCode}{" "}
                  <Badge bg="light" text="dark" className="ms-2">
                    {watch.condition}
                  </Badge>
                </Card.Title>
                <Card.Text className="text-muted small mb-1">
                  {watch.year} • {watch.colorDial}
                </Card.Text>
                <Card.Text className="fw-bold text-success fs-6 mb-0">
                  ${watch.cost?.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Favorite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this watch from your favorites?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

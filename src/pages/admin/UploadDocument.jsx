import { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Container, Card, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../services/api";
import PageTransition from "../../components/PageTransition";

export default function UploadDocument() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await api.post("/admin/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully.");
      setFile(null);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger" className="text-center w-100">
          <h5 className="mb-0">Access denied. Admins only.</h5>
        </Alert>
      </Container>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Upload Price List - Rollie</title>
      </Helmet>

      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card
          className="shadow-lg border-0 p-4 w-100"
          style={{ maxWidth: "540px" }}
        >
          <div className="text-center mb-4">
            <h4 className="fw-semibold mb-2">Upload Price Document</h4>
            <p className="text-muted small">
              Upload a recent Excel file (.xlsx) with the latest watch prices.
            </p>
          </div>

          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-semibold">Excel File</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                disabled={loading}
              />
              <Form.Text muted>Only .xlsx format is supported.</Form.Text>
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              className="w-100 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              {loading ? "Uploading..." : "Upload File"}
            </Button>
          </Form>

          {file && (
            <Alert variant="info" className="mt-3 text-center small mb-0">
              Selected file: <strong>{file.name}</strong>
            </Alert>
          )}
        </Card>
      </Container>
    </PageTransition>
  );
}

import { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../services/api";

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
    formData.append("document", file);

    setLoading(true);

    try {
      await api.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ File uploaded successfully.");
      setFile(null);
    } catch (error) {
      toast.error("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <h5 className="text-danger">Access denied. Admins only.</h5>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Upload Price Document - Rollie</title>
      </Helmet>

      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card
          className="shadow p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h4 className="mb-1">Upload Price Document</h4>
            <p className="text-muted small">
              Upload an Excel file (.xlsx) with the latest watch prices.
            </p>
          </div>

          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Excel File</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
              />
              <Form.Text muted>Only .xlsx format is supported.</Form.Text>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              Upload
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

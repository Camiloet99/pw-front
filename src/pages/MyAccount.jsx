import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Enter a valid phone number")
    .required("Phone is required"),
});

export default function MyAccount() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const updatedUser = {
      ...user,
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };
    login(updatedUser);
    toast.success("Account updated successfully!");
    setIsEditing(false);
  };

  return (
    <>
      <Helmet>
        <title>My Account - LuxWatch</title>
      </Helmet>

      <Container className="mt-5">
        <h2 className="mb-4">My Account</h2>

        <Card className="shadow-sm">
          <Card.Body>
            {!isEditing ? (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>First Name:</strong> {user.firstName}
                  </Col>
                  <Col md={6}>
                    <strong>Last Name:</strong> {user.lastName}
                  </Col>
                  <Col md={6} className="mt-3">
                    <strong>Email:</strong> {user.email}
                  </Col>
                  <Col md={6} className="mt-3">
                    <strong>Phone:</strong> {user.phone}
                  </Col>
                  <Col md={6} className="mt-3">
                    <strong>Plan:</strong>{" "}
                    <span
                      className={`badge rounded-pill ${
                        user.plan === "premium" || "admin"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </Col>
                </Row>

                <div className="text-end">
                  <Button
                    variant="outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Information
                  </Button>
                </div>
              </>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("firstName")}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("lastName")}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        {...register("phone")}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email (read-only)</Form.Label>
                      <Form.Control value={user.email} readOnly disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => setIsEditing(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

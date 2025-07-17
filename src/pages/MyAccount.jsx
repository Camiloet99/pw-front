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
  Badge,
} from "react-bootstrap";
import PageTransition from "../components/PageTransition";

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
    console.log(user);
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phoneNumber || "",
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
    toast.success("Your account was updated successfully.");
    setIsEditing(false);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>My Account - Rollie</title>
      </Helmet>

      <Container className="mt-5">
        <h2 className="mb-4 fw-semibold">Account Settings</h2>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            {!isEditing ? (
              <>
                <Row className="mb-2">
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>First Name:</strong> {user.firstName}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>Last Name:</strong> {user.lastName}
                    </p>
                  </Col>
                  <Col md={6} className="mt-2">
                    <p className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </p>
                  </Col>
                  <Col md={6} className="mt-2">
                    <p className="mb-2">
                      <strong>Phone:</strong> {user.phoneNumber}
                    </p>
                  </Col>
                  <Col md={6} className="mt-2">
                    <p className="mb-0">
                      <strong>Plan:</strong>{" "}
                      <Badge
                        bg={
                          user.plan === "premium"
                            ? "success"
                            : user.plan === "admin"
                            ? "danger"
                            : "secondary"
                        }
                        pill
                      >
                        {user.plan}
                      </Badge>
                    </p>
                  </Col>
                </Row>

                <div className="text-end mt-3">
                  <Button
                    variant="outline-dark"
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
                      <Form.Label className="fw-semibold">
                        First Name
                      </Form.Label>
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
                      <Form.Label className="fw-semibold">Last Name</Form.Label>
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
                      <Form.Label className="fw-semibold">Phone</Form.Label>
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
                      <Form.Label className="fw-semibold">Email</Form.Label>
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
                  <Button type="submit" variant="dark" disabled={isSubmitting}>
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
    </PageTransition>
  );
}

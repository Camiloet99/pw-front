import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import PageTransition from "../components/PageTransition";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submittedEmail, setSubmittedEmail] = useState("");

  const onSubmit = (data) => {
    // Aquí iría la lógica real para enviar correo
    console.log("Password reset request:", data);
    setSubmittedEmail(data.email);
  };

  return (
    <PageTransition>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <h3 className="text-center mb-3">Forgot your password?</h3>
                <p className="text-muted text-center mb-4">
                  No worries. Enter your email and we’ll send you a link to
                  reset your password.
                </p>

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      isInvalid={!!errors.email}
                      {...register("email")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Send Reset Link
                    </Button>
                  </div>
                </Form>

                {isSubmitSuccessful && (
                  <Alert variant="success" className="mt-4 text-center">
                    If <strong>{submittedEmail}</strong> is registered, a reset
                    link has been sent.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTransition>
  );
}

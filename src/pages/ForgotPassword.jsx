import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const onSubmit = (data) => {
    console.log("Password reset request:", data);
    // Aquí irá la lógica para enviar el email de recuperación
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Forgot Your Password?</h2>
        <p className="text-center">
          Enter your email address and we’ll send you instructions to reset your
          password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>

          {isSubmitSuccessful && (
            <div className="alert alert-success mt-3 text-center">
              If your email is registered, a reset link has been sent.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

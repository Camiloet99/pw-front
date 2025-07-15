import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageTransition from "../components/PageTransition";

const phoneRegExp = /^\+?[1-9]\d{1,14}$/; // E.164 format

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(
      phoneRegExp,
      "Enter a valid phone number with country code (e.g. +14155552671)"
    )
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { user } = await registerUser(data);
      toast.success(
        `Welcome ${user.name || "user"}! Your account has been created.`
      );
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <PageTransition>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <div className="invalid-feedback">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <div className="invalid-feedback">
                  {errors.lastName.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                placeholder="+1xxxxxxxxxx"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone")}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </div>

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

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

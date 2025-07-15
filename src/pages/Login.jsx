import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import PageTransition from "../components/PageTransition";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { user, token } = await loginUser(data);
      login(user); // from AuthContext
      localStorage.setItem("lux_token", token);
      toast.success(`Welcome back, ${user.name || "user"}!`);
      navigate("/search");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <PageTransition>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="form-label">Email address</label>
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

            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>

            <div className="text-center mt-3">
              <a href="/forgot-password">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

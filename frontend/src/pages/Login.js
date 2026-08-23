import { useLocation, useNavigate } from "react-router-dom";
import { AuthShell, LoginForm } from "../components";
import { useTitle } from "../hooks/useTitle";

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useTitle("Login");

  return (
    <AuthShell title="Welcome back" subtitle="Sign in with your username or email.">
      <LoginForm
        successMessage={location.state?.message}
        onSuccess={() => navigate("/", { replace: true })}
      />
    </AuthShell>
  );
};

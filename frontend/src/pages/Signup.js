import { useNavigate } from "react-router-dom";
import { AuthShell, SignupForm } from "../components";
import { useTitle } from "../hooks/useTitle";

export const Signup = () => {
  const navigate = useNavigate();
  useTitle("Sign Up");

  return (
    <AuthShell title="Create account" subtitle="Join Cinemate with three quick details.">
      <SignupForm
        onSuccess={() =>
          navigate("/login", {
            replace: true,
            state: { message: "Account created successfully. Please log in." },
          })
        }
      />
    </AuthShell>
  );
};

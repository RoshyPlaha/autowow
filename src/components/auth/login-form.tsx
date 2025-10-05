import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { attemptLogin, checkAccountDoesNotExist } from "@/lib/account-check";
import { emitAuthStatusChange } from "@/lib/auth-events";
import { useState } from "react";

interface LoginFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setEmail: (value: string) => void;
}

export default function LoginForm({ setIsLoggedIn, setEmail }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDisplayErrorMessage(false);

    try {
      if (await checkAccountDoesNotExist(emailInput)) {
        setErrorMessage("No account has been found. Create your first capsule on the home page");
        setDisplayErrorMessage(true);
        setIsSubmitting(false);
        return;
      }

      const { status, data } = await attemptLogin(emailInput, password);

      if (!status) {
        setErrorMessage(data.message || "Invalid credentials");
        setDisplayErrorMessage(true);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpiry', String(Date.now() + (data.expiresIn * 1000)));
        localStorage.setItem('userEmail', emailInput);
        setEmail(emailInput);
        setIsLoggedIn(true);
        emitAuthStatusChange(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during login");
      setDisplayErrorMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Account Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-larg font-bold py-2">
            Login to your account or create your first capsule here
          </label>
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              placeholder="Enter your email"
            />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div>
          {displayErrorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
} 
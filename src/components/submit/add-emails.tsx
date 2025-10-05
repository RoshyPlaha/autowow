import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddEmailsProps {
  onAddEmail: (email: string) => void;
}

export default function AddEmails({ onAddEmail }: AddEmailsProps) {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    onAddEmail(trimmedEmail);
    setEmailInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id="share-email"
          type="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter email to share with"
          className="flex-1"
          required
        />
        <Button 
          type="button" 
          onClick={handleSubmit}
          size="sm"
        >
          Add
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}


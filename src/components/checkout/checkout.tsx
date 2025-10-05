"use client";

import { convertToSubCurrency } from "@/lib/convertToSubCurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

type CheckoutPageProps = {
  amount: number;
};

type FileNameProps = {
  fileName: string;
};

type EmailProps = {
  email: string;
};

const CheckoutPage = ({
  amount,
  fileName,
  email,
}: CheckoutPageProps & FileNameProps & EmailProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch("/api/create-payment-intent", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } else {
        setErrorMessage("Failed to create payment intent");
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message!);
      setIsLoading(false);
      return;
    }

    const url = process.env.NEXT_PUBLIC_URL;

    console.log("fileName is", fileName);
    console.log("email is set to", email);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret!,
      confirmParams: {
        return_url: `${url}/payment-success?fileName=${fileName}&email=${email}`,
      },
    });

    if (error) {
      console.log("error", error);
      setErrorMessage(error.message!);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-lg p-4">
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <button className="text-white w-full p-5 bg-black mt-2 rounded-md font-old disabled:opacity-50 disabled:animate-pulse">
          {!isLoading ? `Pay £${amount}` : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

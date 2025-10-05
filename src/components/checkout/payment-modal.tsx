import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./checkout";
import { convertToSubCurrency } from "@/lib/convertToSubCurrency";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY || "");

type PaymentModalProps = {
  amount: number;
}

type FileNameProps = {
  fileName: string;
}

type EmailProps = {
  email: string;
}

const PaymentModal = ({ amount, fileName, email }: PaymentModalProps & FileNameProps & EmailProps) => {

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "gbp",
          }}
        >
          <Checkout amount={amount} fileName={fileName} email={email} />
        </Elements>
      </div>
    )
}

export default PaymentModal;


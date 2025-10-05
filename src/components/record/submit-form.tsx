import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { attemptLogin, checkAccountDoesNotExist } from "@/lib/account-check";
import PaymentModal from "@/components/checkout/payment-modal";
import { blobUploader } from "@/lib/blob-uploader";
import sendConfirmationCustomerEmail from "@/lib/customer-email";
import { removeSpaces } from "utils/stringEdit";
import { UploadProgress } from "@/components/ui/upload-progress";
import { emitAuthStatusChange } from "@/lib/auth-events";
import AddEmails from "../submit/add-emails";
import { PricingGradient } from "../pricing/pricing-gradient";

if (!process.env.NEXT_PUBLIC_ONE_OFF_PRICE) {
  throw new Error("NEXT_PUBLIC_ONE_OFF_PRICE is not set");
}

if (!process.env.NEXT_PUBLIC_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

const PRICE = Number(process.env.NEXT_PUBLIC_ONE_OFF_PRICE);

interface SubmitFormProps {
  videoBlob: Blob | null;
  onClose?: () => void;
  setSubmitted: (status: boolean) => void;
  isNewUser: boolean;
}

const CloseButton = ({
  onClose,
  isSubmitting,
}: {
  onClose?: () => void;
  isSubmitting: boolean;
}) => (
  <div className="flex justify-end">
    <Button
      type="button"
      variant="outline"
      onClick={onClose}
      disabled={isSubmitting}
    >
      ❌
    </Button>
  </div>
);

export default function SubmitForm({
  videoBlob,
  onClose,
  setSubmitted,
  isNewUser,
}: SubmitFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("6 months");
  const [capsuleName, setCapsuleName] = useState("");
  const [shareableEmailList, setShareableEmailList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const onAddEmail = (email: string) => {
    if (email) {
      setShareableEmailList((prev) => [...prev, email]);
      setShowEmailInput(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoBlob) return;

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      if (isNewUser) {
        // dictates if user came from home page or not. Maybe get rid of this... its confusing.
        if (!(await checkAccountDoesNotExist(email))) {
          console.warn("Email already exists. Try a login.");
          const { status, data } = await attemptLogin(email, password);
          console.log("status is", status);
          if (status === false) {
            alert("Incorrect email or password");
            return;
          }
          if (status && data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem(
              "tokenExpiry",
              String(Date.now() + data.expiresIn * 1000)
            );
            localStorage.setItem("userEmail", email);
            emitAuthStatusChange(true);
            isNewUser = false;
            console.log(
              "user credentials matched - so setting isNewUser to false"
            );
          }
        }
      }

      if (email === "") {
        setEmail(localStorage.getItem("userEmail") || "");
      }

      const uploadFileName =
        removeSpaces(capsuleName) + "-" + Date.now() + ".mp4";
      console.log("uploadFileName is", uploadFileName);
      setFileName(uploadFileName);

      // Start the upload
      await blobUploader(videoBlob, uploadFileName, email, (progress) =>
        setUploadProgress(progress)
      );

      // Only after upload is complete, check payment
      const endpoint = isNewUser
        ? "/api/new-user-recording"
        : "/api/save-recording";
      console.log("the endpoint is", endpoint);
      const headers = {
        "Content-Type": "application/json",
        ...(isNewUser
          ? {}
          : { Authorization: `Bearer ${localStorage.getItem("token")}` }),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: email === "" ? localStorage.getItem("userEmail") : email,
          password,
          expirationDateSelection: date,
          fileName: uploadFileName,
          prettyFileName: capsuleName,
          shareableEmailList,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process upload");
      }

      const responseData = await response.json();

      if (responseData.paymentNeeded) {
        console.log("Payment needed");
        console.log("fileName is here", fileName);
        console.log("email is here", email);

        setShowPaymentModal(true);
      } else {
        await sendConfirmationCustomerEmail(email, uploadFileName); // can send email to user immediately
        setSubmitted(true);
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload");
    } finally {
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!showPaymentModal ? (
        <div className="relativeflex items-center justify-center z-50">
          <div className=" p-4 max-w-md w-full max-h ">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <CloseButton onClose={onClose} isSubmitting={isSubmitting} />
                <label className="block text-sm font-large font-bold py-2">
                  {isNewUser
                    ? "Create an account or login so we can secure your capsule"
                    : "Secure your capsule now"}
                </label>
                {isNewUser && (
                  <div className="space-y-2">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                )}
                <label
                  htmlFor="capsule-name"
                  className="block text-sm font-medium py-2"
                >
                  Capsule Name
                </label>
                <Input
                  id="capsule-name"
                  type="capsule-name"
                  value={capsuleName}
                  onChange={(e) => setCapsuleName(e.target.value)}
                  required
                  placeholder="Got a new job!"
                />
                <label
                  htmlFor="duration-name"
                  className="block text-sm font-medium py-2"
                >
                  Select Duration
                </label>
                <PricingGradient onChange={setDate} />
                <label
                  htmlFor="share-with-others"
                  className="block text-sm font-medium py-2"
                >
                  Share with others (optional)
                </label>
                <div className="space-y-2">
                  {showEmailInput && <AddEmails onAddEmail={onAddEmail} />}
                  <Button
                    type="button"
                    onClick={() => setShowEmailInput(true)}
                    className="text-sm"
                  >
                    Share with others
                  </Button>
                  {shareableEmailList.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">
                        Will be shared with:
                      </p>
                      <ul className="list-disc pl-5">
                        {shareableEmailList.map((email, index) => (
                          <li key={index} className="text-sm">
                            {email}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <Button
                  className="w-full p-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </Button>
              </div>
            </form>
            {isUploading && <UploadProgress progress={uploadProgress} />}
          </div>
        </div>
      ) : (
        <div className="">
            <PaymentModal
              amount={Number(PRICE.toFixed(2))}
              fileName={fileName}
              email={email}
            />
            <CloseButton onClose={onClose} isSubmitting={isSubmitting} />
        </div>
      )}
    </>
  );
}

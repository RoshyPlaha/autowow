"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Suspense } from "react";

const ContactUsContent = () => {
  const searchParams = useSearchParams();
  const brandName = searchParams?.get("brandName") || "AR";
  const primaryColor = searchParams?.get("primaryColor") || "#09293c";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    message: "",
    mailingList: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header brandName={brandName} primaryColor={primaryColor} />

      {/* Header Section with Background */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {/* Background Image - using a dark gradient as placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-merriweather">
            CONTACT {brandName.toUpperCase()}
          </h1>
          <div className="w-24 h-0.5 bg-white"></div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 bg-gray-50">
        <div className="w-full max-w-4xl">
          {formSubmitted && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-merriweather">
                FORM SUBMITTED
              </h2>
            </div>
          )}

          {/* Form Container */}
          {!formSubmitted && (
            <div>
              <div className="bg-white border border-black p-8 md:p-12 shadow-lg">
                {/* Form Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-merriweather">
                    GET IN TOUCH
                  </h2>
                  <div className="w-24 h-0.5 bg-black mx-auto"></div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Two Column Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Telephone *
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          required
                          value={formData.telephone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  {/* Mailing List Section */}
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Join the {brandName} Mailing List.
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mailingList"
                          value="yes"
                          checked={formData.mailingList === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-black focus:ring-2 focus:ring-black"
                        />
                        <span className="text-sm text-black">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mailingList"
                          value="no"
                          checked={formData.mailingList === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-black focus:ring-2 focus:ring-black"
                        />
                        <span className="text-sm text-black">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="bg-black text-white px-12 py-3 font-semibold uppercase hover:bg-gray-800 transition-colors"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer brandName={brandName} primaryColor={primaryColor} />
    </div>
  );
};

const ContactUs = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <ContactUsContent />
    </Suspense>
  );
};

export default ContactUs;

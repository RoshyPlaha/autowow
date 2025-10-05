const sendConfirmationCustomerEmail = async (email: string, uploadFileName: string) => {
  console.log(`sending confirmationemail to user: ${email}`);
  await fetch(`/api/send-customer-email`, { // new change added!!
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipientEmail: email === "" ? localStorage.getItem("userEmail") : email,
      filename: uploadFileName,
    }),
  });
};

export default sendConfirmationCustomerEmail;
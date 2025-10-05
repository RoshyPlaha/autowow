const parseExpirationDateSelectionInDays = (
  expirationDateSelection: string
): number => {
  if (expirationDateSelection === "6 months") {
    return 180
  } else if (expirationDateSelection === "1 year") {
    return 365
  } else if (expirationDateSelection === "2 years") {
    return 730
  } else if (expirationDateSelection === "5 years") {
    return 1825
  } else {
    console.error("Invalid expiration date selection found with value", expirationDateSelection);
    throw new Error("Invalid expiration date selection");
  }
};

export const createFutureCapsuleDate = (expirationDateSelection: string) => {
  try {
    const days = parseExpirationDateSelectionInDays(expirationDateSelection)
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(expirationDate.getDate() + days);
    return expirationDate.toISOString();
  } catch (error) {
    console.error("Error creating future capsule date:", error);
    throw error;
  }
};


export const countdownToExpirationInDays = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const difference = expiration.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };
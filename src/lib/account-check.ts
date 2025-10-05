export const checkAccountDoesNotExist = async (email: string) => {
  const response = await fetch("/api/account-exists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (response.status === 409 || response.status === 500) {
    console.log('account already exists');
    return false;
  }

  console.log('account does not exist');
  return true;
};

export const attemptLogin = async (email: string, password: string) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });

  if (!response.ok) {
    console.error("Login failed for user", email);
    return { status: false, data: null };
  }

  return { status: true, data: await response.json() };
}


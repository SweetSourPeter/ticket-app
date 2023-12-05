// auth.js

const BASE_URL = 'http://localhost:8080/api/users';

async function login(account, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ account, password }),
  });

  if (response.ok) {
    const token = await response.text(); // Use response.text() to get the string directly

    // Log the token for verification
    console.log("Token:", token);

    // Store the token in localStorage
    localStorage.setItem('token', token);
    return true;
  } else {
    return false;
  }
}

async function register(user) {
  console.log("user: ", JSON.stringify(user));
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response;
  } else if (response.status === 400) {
    const errorData = await response.json();
    return { error: errorData, success: false };
  } else {
    const errorData = await response.json();
    throw new Error(errorData.join(', '));
  }
}

export { login, register };

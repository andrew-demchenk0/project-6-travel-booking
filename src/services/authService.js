const apiUrl = 'https://binary-travel-app.xyz/api/v1';
export const signInUserAPI = async (credentials) => {
  try {
    const response = await fetch(`${apiUrl}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('fullName', data.user.fullName);
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const signUpUserAPI = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error during sign up.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUserAPI = async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/authenticated-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('User not authenticated.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};


const apiUrl = 'https://binary-travel-app.xyz/api/v1';

export const getBookingsAPI = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const bookTripAPI = async (bookingData, token) => {
  try {
    const response = await fetch(`${apiUrl}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to book trip.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const cancelBookingAPI = async (bookingId, token) => {
  try {
    const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

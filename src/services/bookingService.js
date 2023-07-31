const apiUrl = 'https://binary-travel-app.xyz/api/v1';
const token = localStorage.getItem('token')

export const getBookingsAPI = async () => {
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

export const bookTripAPI = async (bookingData) => {
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

export const cancelBookingAPI = async (bookingId) => {
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

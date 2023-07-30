const apiUrl = 'https://binary-travel-app.xyz/api/v1';

export const getTripsAPI = async () => {
  try {
    const response = await fetch(`${apiUrl}/trips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trips.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTripByIdAPI = async (tripId) => {
  try {
    const response = await fetch(`${apiUrl}/trips/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trip by id.');
    }

    const data = await response.json();
    console.log('data id', data);
    return data;
  } catch (error) {
    throw error;
  }
};

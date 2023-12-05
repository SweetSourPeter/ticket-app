
const ORDERS_BASE_URL = 'http://localhost:8080/api/orders/user';

async function getMyOrders() {
  const token = localStorage.getItem("token") || ""; // Default to an empty string if token is null or undefined

  console.log("token: ", token);
  try {
    const response = await fetch(ORDERS_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    if (response.ok) {
      const orders = await response.json();
      return orders;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user orders');
    }
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    throw error;
  }
}

export { getMyOrders }; // Named export

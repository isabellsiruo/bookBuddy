const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";


export async function fetchAllBooks(token) {
  try {
    const res = await fetch(`${BASE_URL}/books`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Books API response:", data);

    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn("API returned unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching books", err);
    return [];
  }
}





export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), 
    });

    const data = await response.json();
    return data; 
  } catch (err) {
    console.error("Error registering user:", err);
    return { success: false };
  }
}


export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error logging in:", err);
    return { success: false };
  }
}

export async function fetchUserDetails(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching user details:", err);
    return null;
  }
}

const apiUrl = "https://fakestoreapi.com/users";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar usuario.");
  }
};

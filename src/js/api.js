// api.js

const API_URL = "http://localhost:8080/clientes";

async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: email, password: password }),
    });
    if (!response.ok) {
      throw new Error("Error de autenticación");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

window.registerUser = registerUser;
window.loginUser = loginUser;

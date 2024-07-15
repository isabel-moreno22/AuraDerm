document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document
        .getElementById("loginPassword")
        .value.trim();

      // URL del backend
      const url = "http://localhost:8080/clientes/login";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: loginEmail, password: loginPassword }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error("Email o contraseña incorrectos");
          } else {
            throw new Error("Error al iniciar sesión");
          }
        })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: "Bienvenido de nuevo",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/views/inicio.html";
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: error.message,
            text: "Ocurrió un error al iniciar sesión",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
        });
    });
  }
});

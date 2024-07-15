document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!fullName || !phone || !email || !password || !confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Campos Vacíos",
          text: "Por favor llene todos los campos",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      if (!validateEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Email Inválido",
          text: "Por favor ingrese un correo electrónico válido",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      if (!validateFullName(fullName)) {
        Swal.fire({
          icon: "error",
          title: "Nombre Inválido",
          text: "Por favor ingrese un Nombre válido",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      if (!validatePhone(phone)) {
        Swal.fire({
          icon: "error",
          title: "Número de Teléfono Inválido",
          text: "Por favor ingrese un Número de Teléfono válido",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Contraseñas no coinciden",
          text: "Las contraseñas no coinciden",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      const userData = {
        fullName,
        phone,
        email,
        password,
      };

      fetch("http://localhost:8080/clientes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "¡Usuario registrado!",
            text: "Usuario registrado con éxito",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/views/iniciarSesion.html";
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al registrar el usuario",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
        });
    });
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  function validateFullName(fullName) {
    const re = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    return re.test(fullName);
  }

  function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }
});
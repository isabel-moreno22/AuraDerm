document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      if (!nombre || !telefono || !correo || !password || !confirmPassword) {
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

      if (!validatecorreo(correo)) {
        Swal.fire({
          icon: "error",
          title: "correo Inválido",
          text: "Por favor ingrese un correo electrónico válido",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      if (!validatenombre(nombre)) {
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

      if (!validatetelefono(telefono)) {
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

      if (!password || !confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Contraseñas Vacías",
          text: "Por favor ingrese y confirme su contraseña",
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
        nombre,
        telefono,
        correo,
        password,
      };

      const result = await registerUser(userData);

      if (result) {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el usuario",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const logincorreo = document.getElementById("logincorreo").value.trim();
      const loginPassword = document
        .getElementById("loginPassword")
        .value.trim();

      const result = await loginUser(logincorreo, loginPassword);

      if (result) {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "correo o contraseña incorrectos",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  function validatecorreo(correo) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(correo);
  }

  function validatenombre(nombre) {
    const re = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    return re.test(nombre);
  }

  function validatetelefono(telefono) {
    const re = /^[0-9]{10}$/;
    return re.test(telefono);
  }
});

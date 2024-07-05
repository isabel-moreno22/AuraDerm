document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

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
        fullName,
        phone,
        email,
        password,
      };

      console.log("User Data to be stored:", userData);
      localStorage.setItem("userData", JSON.stringify(userData));

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
//   function validateFullName(fullName) {
//     const re = /^[a-zA-Z ]+$/;
//     return re.test(fullName);
// }
  function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document
        .getElementById("loginPassword")
        .value.trim();

      console.log("Login Email:", loginEmail);
      console.log("Login Password:", loginPassword);

      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      console.log("Stored User Data:", storedUserData);

      if (
        storedUserData &&
        storedUserData.email === loginEmail &&
        storedUserData.password === loginPassword
      ) {
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
          text: "Email o contraseña incorrectos",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }
});

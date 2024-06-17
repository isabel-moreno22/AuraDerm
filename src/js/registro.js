document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // VALORES
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      // VALIDACIONES
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

      // JSON
      const user = {
        fullName: fullName,
        phone: phone,
        email: email,
        password: password,
      };

      // Mostrar JSON en consola
      console.log(JSON.stringify(user));

      // LIMPIAR FORMULARIO
      document.getElementById("registerForm").reset();

      // USUARIO REGISTRADO CON EXITO
      Swal.fire({
        icon: "success",
        title: "¡Usuario registrado!",
        text: "Usuario registrado con éxito",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    });

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
});

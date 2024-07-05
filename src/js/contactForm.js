document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("Py338k6Rs4gOeL98i");

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let tel = document.getElementById("tel").value.trim();
      let message = document.getElementById("message").value.trim();

      // Validación si todos los campos están vacíos
      if (!name && !email && !tel && !message) {
        Swal.fire({
          icon: "error",
          title: "Campos Vacíos",
          text: "Por favor llene los campos vacíos",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      //Validación de los inputs
      if (!name) {
        Swal.fire({
          icon: "error",
          title: "Nombre Vacío",
          text: "Por favor escriba su nombre",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      if (!validateEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Email Inválido",
          text: "Por favor ingrese un correo electrónico válido",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      if (!validateTel(tel)) {
        Swal.fire({
          icon: "error",
          title: "Teléfono Inválido",
          text: "Por favor ingrese un número de teléfono válido",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      
      if (!message) {
        Swal.fire({
          icon: "error",
          title: "Mensaje Vacío",
          text: "Por favor escriba su mensaje",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // Enviar el correo electrónico con EmailJS
      let templateParams = {
        from_name: name,
        from_email: email,
        phone: tel,
        message: message,
      };

      emailjs.send("service_29qej1y", "template_igdkipv", templateParams).then(
        function (response) {
          document.getElementById("thank-you-message").style.display = "block";
          Swal.fire({
            icon: "success",
            title: "Enviado",
            text: "Su mensaje ha sido enviado exitosamente",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });

          //Borrar el contenido de los inputs al dar submit
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("tel").value = "";
          document.getElementById("message").value = "";

          //Alerta error al enviar el formulario
        },
        function (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al enviar el mensaje, por favor intente nuevamente",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    });

  //Funciones para validar el email y el telefono usando regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateTel(tel) {
    const re = /^\d{10}$/;
    return re.test(tel);
  }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let tel = document.getElementById('tel').value.trim();
        let message = document.getElementById('message').value.trim()


        // Validación si todos los campos están vacíos
        if (!name && !email && !tel && !message) {
            alert("Por favor, llene los campos vacíos.");
            return;
        }
        //Validación de los inputs
        if (!name) {
            alert("Por favor, escriba su |nombre.");
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        if (!validateTel(tel)) {
            alert('Por favor, ingrese un número de teléfono válido.');
            return;
        } else {
            //Borrar el contenido de los inputs al dar submit
            document.getElementById('thankYouMessage').style.display = 'block';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('tel').value = '';
            document.getElementById('message').value = '';
        }

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
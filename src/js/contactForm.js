document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let tel = document.getElementById('tel').value.trim();
        let message = document.getElementById('message').value.trim()

        console.log('Nombre:', name);
        console.log('Correo Electrónico:', email);
        console.log('Teléfono:', tel);
        console.log('Mensaje:', message);

        if (name === "" || name == null) {
            alert("Por favor, escriba su nombre.");
            return ;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        if (!validateTel(tel)) {
            alert('Por favor, ingrese un número de teléfono válido.');
            return;
        } else {

            document.getElementById('thankYouMessage').style.display = 'block';
            document.getElementById('myForm').submit();
        }

    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateTel(tel) {
        const re = /^\d{10}$/;
        return re.test(tel);
    }

});
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // VALORES
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // LIMPIAR ALERTAS PREVIAS
    document.getElementById('alertContainer').innerHTML = '';

    // VALIDACIONES
    if (password !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Correo electrónico no válido', 'danger');
        return;
    }

    if (!validatePhone(phone)) {
        showAlert('Número de teléfono no válido', 'danger');
        return;
    }

    // JSON
    const user = {
        fullName: fullName,
        phone: phone,
        email: email,
        password: password
    };

    // Mostrar JSON en consola
    console.log(JSON.stringify(user));

    // LIMPIAR FORM 
    document.getElementById('registerForm').reset();

    showAlert('Usuario registrado con éxito', 'success');
});

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.remove('show');
        alert.addEventListener('transitionend', () => alert.remove());
    }, 3000);
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

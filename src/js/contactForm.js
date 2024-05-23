// document.addEventListener('DOMContentLoaded', function() {
//     //console.log('DOM completamente cargado y parseado');

// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let email = document.getElementById('email').value;
//     let tel = document.getElementById('tel').value;
//     let message = document.getElementById('message').value;

//     // console.log('Nombre:', name);
//     // console.log('Correo Electrónico:', email);
//     // console.log('Teléfono:', tel);
//     // console.log('Mensaje:', message);


//     // validar telefono solo num
//     //VAlidar todos los inpust deben ser llenados
//     //mensaje "gracias por tu mensaje" al dar submit
//     let validacionDatos = ()=>{
//         let name = document.getElementById('name').value;
//             if(name === " "){
//                 alert("Es necesario llenar este campo");
//             }else {
//                 alert("Fue exitoso")
//             }
//             validacionDatos();
//         }
//     });
// });

function validateForm() {
    // Obtener los valores de los campos
    document.getElementById('DOMContentLoaded').addEventListener("submit", function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !tel || !message) {
            alert('Debe llenar todos los campos');
        } else {
            alert('Formulario enviado correctamente');
            document.getElementById('submit').submit();
        }
    })
}
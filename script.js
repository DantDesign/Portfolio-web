// 1. Aplica el estilo al enlace seleccionado y cierra el menú en dispositivos móviles
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links a');
    
    opciones.forEach(function(opcion) {
        opcion.className = "";
    });

    link.className = "seleccionado";

    var nav = document.getElementById("nav");
    nav.className = "";
}

// 2. Muestra/Oculta el menú responsive (Hamburguesa)
function responsiveMenu() {
    var nav = document.getElementById("nav");
    if (nav.className === "") {
        nav.className = "responsive";
    } else {
        nav.className = "";
    }
}

// 3. Envío por AJAX con Validación Visual y Botón de Estado
document.getElementById("form-contacto").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var form = event.target;
    var campos = form.querySelectorAll("input[required], textarea[required]");
    var formularioValido = true;
    var botonEnviar = form.querySelector(".btn-enviar");

    // Validación visual de campos obligatorios
    campos.forEach(function(campo) {
        if (campo.value.trim() === "") {
            campo.classList.add("campo-error");
            formularioValido = false;
        } else {
            campo.classList.remove("campo-error");
        }
        
        // Limpia el borde rojo en tiempo real al escribir
        campo.addEventListener("input", function() {
            if (campo.value.trim() !== "") {
                campo.classList.remove("campo-error");
            }
        });
    });

    if (!formularioValido) return; 

    // Bloquea el botón de enviar para evitar duplicados
    var textoOriginalBoton = botonEnviar.value;
    botonEnviar.value = "Enviando...";
    botonEnviar.disabled = true;

    var data = new FormData(form);
    var mensajeExito = document.getElementById("mensaje-exito");
    
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(function(response) {
        // Restaura el botón
        botonEnviar.value = textoOriginalBoton;
        botonEnviar.disabled = false;

        if (response.ok) {
            form.reset(); // Limpia los campos del formulario
            
            // Muestra notificación flotante
            mensajeExito.classList.add("visible");
            
            setTimeout(function() {
                mensajeExito.classList.remove("visible");
            }, 4000);
        } else {
            alert("Ocurrió un error al enviar el formulario.");
        }
    }).catch(function(error) {
        // Restaura el botón si hay error de red
        botonEnviar.value = textoOriginalBoton;
        botonEnviar.disabled = false;
        alert("Error de conexión. Inténtalo de nuevo.");
    });
});

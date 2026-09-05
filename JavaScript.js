// Obtener pacientes y citas guardados
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let citas = JSON.parse(localStorage.getItem("citas")) || [];


// MENSAJE INICIAL
function mostrarMensaje() {
    alert("Bienvenido a Farmacia Salud.");
}


// PRODUCTOS
function comprar(producto) {
    alert("Has seleccionado: " + producto);
}


// REGISTRAR PACIENTE
document.getElementById("formPaciente").addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    const paciente = {
        id: Date.now(),
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        correo: correo
    };

    pacientes.push(paciente);

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

    document.getElementById("mensajeRegistro").textContent =
        "Paciente registrado correctamente.";

    document.getElementById("formPaciente").reset();

    cargarPacientes();
});


// CARGAR PACIENTES EN EL SELECT
function cargarPacientes() {

    const select = document.getElementById("paciente");

    select.innerHTML =
        '<option value="">Seleccione un paciente</option>';

    pacientes.forEach(function(paciente) {

        const option = document.createElement("option");

        option.value = paciente.id;
        option.textContent =
            paciente.nombre + " - DNI: " + paciente.dni;

        select.appendChild(option);
    });
}


// REGISTRAR CITA
document.getElementById("formCita").addEventListener("submit", function(event) {

    event.preventDefault();

    const pacienteId =
        document.getElementById("paciente").value;

    const fecha =
        document.getElementById("fecha").value;

    const hora =
        document.getElementById("hora").value;

    const motivo =
        document.getElementById("motivo").value;

    const paciente = pacientes.find(
        function(p) {
            return p.id == pacienteId;
        }
    );

    if (!paciente) {
        alert("Seleccione un paciente.");
        return;
    }

    const cita = {

        id: Date.now(),

        paciente: paciente.nombre,

        dni: paciente.dni,

        fecha: fecha,

        hora: hora,

        motivo: motivo
    };

    citas.push(cita);

    localStorage.setItem(
        "citas",
        JSON.stringify(citas)
    );

    alert("Cita registrada correctamente.");

    document.getElementById("formCita").reset();

    mostrarCitas();
});


// MOSTRAR CITAS
function mostrarCitas() {

    const lista =
        document.getElementById("listaCitas");

    lista.innerHTML = "";

    if (citas.length === 0) {

        lista.innerHTML =
            "<p>No hay citas registradas.</p>";

        return;
    }

    citas.forEach(function(cita) {

        const div = document.createElement("div");

        div.className = "cita";

        div.innerHTML = `
            <strong>Paciente:</strong> ${cita.paciente}<br>
            <strong>DNI:</strong> ${cita.dni}<br>
            <strong>Fecha:</strong> ${cita.fecha}<br>
            <strong>Hora:</strong> ${cita.hora}<br>
            <strong>Motivo:</strong> ${cita.motivo}
            <br>
            <button onclick="eliminarCita(${cita.id})">
                Eliminar Cita
            </button>
        `;

        lista.appendChild(div);
    });
}


// ELIMINAR CITA
function eliminarCita(id) {

    const confirmar =
        confirm("¿Desea eliminar esta cita?");

    if (!confirmar) {
        return;
    }

    citas = citas.filter(function(cita) {
        return cita.id !== id;
    });

    localStorage.setItem(
        "citas",
        JSON.stringify(citas)
    );

    mostrarCitas();
}


// CARGAR DATOS AL ABRIR LA PÁGINA
cargarPacientes();
mostrarCitas();

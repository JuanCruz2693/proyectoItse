$(document).ready(function () {
    tablaClietes = $('#Clientes').DataTable({
        scrollX: true,
        //botones editar y eliminar en la tabla
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Baja</button></div></div>"
        }],
        //lenguaje
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }

    });

});

//alta con jquery
$("#btnNuevo").click(function () {
    $("#formClientes").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Cliente");
    $("#modalCRUD").modal("show");
    id = null;
    opcion = 1;
});

//botón EDITAR    
$(document).on("click", ".btnEditar", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    nombre = fila.find('td:eq(1)').text();
    pais = fila.find('td:eq(2)').text();
    edad = parseInt(fila.find('td:eq(3)').text());

    $("#nombre").val(nombre);
    $("#pais").val(pais);
    $("#edad").val(edad);
    opcion = 2; //editar

    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Persona");
    $("#modalCRUD").modal("show");

});
fetch('http://localhost:8080/clientes')
    .then(response => response.json())
    .then(data => {
        // Crear filas con los datos obtenidos y añadirlos a la tabla
        let filas = '';
        data.forEach(cliente => {
            filas += `<tr>
                                <td><div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Baja</button></div></div></td>
                                <td>${cliente.id}</td>
                                <td>${cliente.dni}</td>
                                <td>${cliente.apellidoYNombre}</td>
                                <td>${cliente.domicilio}</td>
                                <td>${cliente.telefono}</td>
                                <td>${cliente.zona}</td>
                                <td>${cliente.estado}</td>
                                <td>${cliente.email}</td>
                                <td>${cliente.descripcion}</td>
                            </tr>`;
        });
        document.getElementById('tablaClientes').innerHTML = filas;
    })
    .catch(error => console.error(error));

// Obtener el formulario
const form = document.querySelector('#formClientes');

// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
   // event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Crear el objeto JSON
    const cliente = {
        apellidoYNombre: document.querySelector('#nombre').value,
        dni: document.querySelector('#dni').value,
        domicilio: document.querySelector('#domicilio').value,
        telefono: document.querySelector('#telefono').value,
        zona: document.querySelector('#zona').value,
        estado: document.querySelector('#estado').value,
        email: document.querySelector('#e-mail').value,
        descripcion: document.querySelector('#observaciones').value
    };

    // Mostrar el objeto JSON en la consola
    console.log(cliente);
    //enviar el JSON a la API
    fetch('http://localhost:8080/savecliente', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
})
    .then(response => {
        if (response.ok) {
            console.log('Cliente guardado exitosamente');
            // Hacer algo después de que el cliente se haya guardado correctamente
        } else {
            console.error('Error al guardar el cliente');
            // Hacer algo en caso de que ocurra un error al guardar el cliente
        }
    })
    .catch(error => {
        console.error('Error al guardar el cliente', error);
        // Hacer algo en caso de que ocurra un error al enviar la solicitud
    });
});


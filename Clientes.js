//alta con jquery
$("#btnNuevo").click(function () {
    $("#formClientes").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Cliente");
    $("#btnSubmit").text("Guardar");
    $("#formClientes").attr("data-action", "guardar");
    $("#modalCRUD").modal("show");
    id = null;
});

var idcliente;
//botón EDITAR    
$(document).on("click", ".btnEditar", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    dni = fila.find('td:eq(1)').text();
    apellido = fila.find('td:eq(2)').text();
    nombre = fila.find('td:eq(3)').text();
    domicilio = fila.find('td:eq(4)').text();
    telefono = fila.find('td:eq(5)').text();
    zona = fila.find('td:eq(6)').text();
    estado = fila.find('td:eq(7)').text();
    email = fila.find('td:eq(8)').text();
    observaciones = fila.find('td:eq(9)').text();

    $("#dni").val(dni);
    $("#apellido").val(apellido);
    $("#nombre").val(nombre);
    $("#domicilio").val(domicilio);
    $("#telefono").val(telefono);
    $("#zona").val(zona);
    $("#estado").val(estado);
    $("#e-mail").val(email);
    $("#observaciones").val(observaciones);
    idcliente = id;

    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Cliente");
    $("#btnSubmit").text("Editar");
    $("#formClientes").attr("data-action", "editar");
    $("#modalCRUD").modal("show");
});

fetch('http://localhost:8080/clientes')
    .then(response => response.json())
    .then(data => {
        // Crear filas con los datos obtenidos y añadirlos a la tabla
        let filas = '';
        data.forEach(cliente => {
            filas += `<tr>
                                <td>${cliente.id}</td>
                                <td>${cliente.dni}</td>
                                <td>${cliente.apellido}</td>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.domicilio}</td>
                                <td>${cliente.telefono}</td>
                                <td>${cliente.zona}</td>
                                <td>${cliente.estado}</td>
                                <td>${cliente.email}</td>
                                <td>${cliente.descripcion}</td>
                                <td><div class='text-center'><div><button class='btnEditar'>Editar</button><button id='btnBorrar' class='btn btn-danger btnBorrar'>Baja</button></div></div></td>
                            </tr>`;
        });
        document.getElementById('tablaClientes').innerHTML = filas;

        $(document).ready(function () {
            tablaClientes = $('#Clientes').DataTable({
                scrollX: true,
                //botones editar y eliminar en la tabla
                "columnDefs": [{
                    "targets": 10,
                    "data": null,
                    "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button id='btnBorrar' class='btn btn-danger btnBorrar'>Baja</button></div></div>"
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
    })
    .catch(error => console.error(error));




// Obtener el formulario
const form = document.querySelector('#formClientes');
let url = "";

// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Crear el objeto JSON
    const cliente = {
        apellido: document.querySelector('#apellido').value,
        nombre: document.querySelector('#nombre').value,
        dni: document.querySelector('#dni').value,
        domicilio: document.querySelector('#domicilio').value,
        telefono: document.querySelector('#telefono').value,
        zona: document.querySelector('#zona').value,
        estado: "A",
        email: document.querySelector('#e-mail').value,
        descripcion: document.querySelector('#observaciones').value
    };
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const action = $("#formClientes").attr("data-action");
    // Mostrar el objeto JSON en la consola
    console.log(cliente);
    //enviar el JSON a la API
    if (action === "guardar") {
        // Lógica para la acción "Guardar"
        url = "http://localhost:8080/savecliente";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
            .then(response => {
                if (response.ok) {
                    swal('Cliente guardado exitosamente', '', 'success').then(() => {
                        setTimeout(() => {
                            location.reload();
                        }, 2000); // recarga la página después de 2 segundos
                    });
                    $("#modalCRUD").modal("hide");
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
    } else if (action === "editar") {
        // Lógica para la acción "Editar"
        const idCliente = id; // Obtén el ID del cliente que se está editando
        url = `http://localhost:8080/editarcliente/${idCliente}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
        .then(response => {
            if (response.ok) {
                console.log('Cliente guardado exitosamente');
                //alert("Cliente guardado correctamente");
                swal('Cliente editado exitosamente', '', 'success').then(() => {
                    setTimeout(() => {
                        location.reload();
                    }, 2000); // recarga la página después de 2 segundos
                });
                $("#modalCRUD").modal("hide");
                //location.reload();
                // Hacer algo después de que el cliente se haya guardado correctamente
            } else {
                console.error('Error al guardar el cliente');
                // Hacer algo en caso de que ocurra un error al guardar el cliente
            }
        })
    }
});



$(document).on("click", ".btnBorrar", function () {
    var fila = $(this).closest("tr");
    var idCliente = parseInt(fila.find('td:eq(0)').text());
    // Realizar la solicitud de actualización del estado del cliente
    var url = `http://localhost:8080/bajaCliente/${idCliente}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'B' })
    })
    .then(response => {
        if (response.ok) {
            console.log('Estado del cliente actualizado exitosamente');
            // Realizar alguna acción adicional después de la actualización exitosa del estado
            location.reload();
        } else {
            console.error('Error al actualizar el estado del cliente');
            // Realizar alguna acción en caso de que ocurra un error al actualizar el estado
        }
    })
    .catch(error => {
        console.error('Error al actualizar el estado del cliente', error);
        // Realizar alguna acción en caso de que ocurra un error al enviar la solicitud
    });
});

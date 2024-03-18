/* 
function obtenerFechaActualFormateada() {
    // Obtener la fecha actual
    var fechaActual = new Date();

    // Obtener los componentes de la fecha
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    var anio = fechaActual.getFullYear();

    // Formatear la fecha
    var fechaFormateada = dia + '/' + mes + '/' + anio;

    return fechaFormateada;
}

// Llamar a la función para actualizar el contenido de la etiqueta h4 con id "fecha"
document.getElementById('fecha').textContent = obtenerFechaActualFormateada(); */

// Crear el Menu
function cargar(id, nombre) {
    // console.log("ID: " + id + ", Nombre: " + nombre);
    $("#codigo").val(id);
    $("#nombre").val(nombre);
    $("#modificar").show();
    $("#guardar").hide();
}

function eliminar(id, nombre) {
    console.log("ID: " + id + ", Nombre: " + nombre);
    Swal.fire({
        title: "Ojo?",
        html: `Esta seguro de Eliminar el Registro: <h3>${id} - ${nombre} !</h3>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: 'http://localhost:8000/proveedores/' + id, 
                method: 'DELETE',
                success: function(response) {
                    cargarTabla();
                    Swal.fire({
                        title: "Borrado!",
                        html: response.message,
                        icon: "success"
                      });
                },
                error: function(xhr, status, error) {
                    console.error('Error al borrar el registro:', error);
                }
            });

          
        }
      });
}

function Limpiar() {
    $("#codigo").val("");
    $("#nombre").val("");
    $("#modificar").hide();
    $("#guardar").show();
}

$("#limpiar").click(function () {
    Limpiar();
});

$("#guardar").click(function () {
    let codigo = $("#codigo").val();
    let nombre = $("#nombre").val();
    console.log("codigo: " + codigo + ", Nombre: " + nombre);

    let datos = {
        'codigo': codigo,
        'nombre': nombre
    };

    $.ajax({
        url: 'http://localhost:8000/proveedores', // URL para guardar el registro
        method: 'POST',
        data: datos,
        success: function (response) {
            Swal.fire({
                title: "Bien!",
                text: response.message,
                icon: "success"
            });

            $('#tablaProveedores').DataTable().row.add({
                "id": response.data.id,
                "nombre": response.data.nombre,
                "created_at": response.data.created_at,
                "updated_at": response.data.updated_at
            }).draw();
            Limpiar();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Mal!",
                text: response.message,
                icon: "error"
            });
            console.error('Error al guardar el registro:', error);
        }
    });

});


$("#modificar").click(function () {
    let codigo = $("#codigo").val();
    let nombre = $("#nombre").val();
    console.log("codigo: " + codigo + ", Nombre: " + nombre);

    let datos = {
        'codigo': codigo,
        'nombre': nombre
    };

    $.ajax({
        url: 'http://localhost:8000/proveedores/' + codigo, // URL para guardar el registro
        method: 'PUT',
        data: datos,
        success: function (response) {
            Swal.fire({
                title: "Bien!",
                text: response.message,
                icon: "success"
            });

            cargarTabla();
            Limpiar();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: "Mal!",
                text: response.message,
                icon: "error"
            });
            console.error('Error al Actualizar el registro:', error);
        }
    });

});


function cargarTabla() {
    $('#tablaProveedores').DataTable().ajax.reload();
}

$(document).ready(function () {
    $("#modificar").hide();
    $('#tablaProveedores').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json',
        },
        "ajax": "http://localhost:8000/proveedores", 
        "buttons": [
            'copy', 'excel', 'pdf', 'print'
        ],
        "pageLength": 5,
        "columns": [
            { "data": "id" },
            { "data": "nombre" },
            {
                "data": null,
                "render": function (data, type, full, meta) {
                    return '<button class ="btn btn-info" onclick="cargar(' + data.id + ', \'' + data.nombre + '\')"><i class="mdi mdi-magnify mdi-size-lg" style="font-size: 20px;"></i></button>'+
                    '<button class ="btn btn-danger" onclick="eliminar(' + data.id + ', \'' + data.nombre + '\')"><i class="mdi mdi-delete mdi-size-lg" style="font-size: 20px;"></i></button>'
                    ;
                }
            }
        ]
    });
});



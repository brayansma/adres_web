
const api = "http://localhost/apiadres/public/"
const ruta =  "tipos"
const host = api+ruta

function cargar(id, nombre,tipo) {
    
  $("#codigo").val(id);
  $("#nombre").val(nombre);
  $("#tipo").val(tipo);
  $("#modificar").show();
  $("#guardar").hide();
}

function eliminar(id, nombre) {
  Swal.fire({
    title: "Ojo?",
    html: `Esta seguro de Eliminar el Registro: <h3>${id} - ${nombre} !</h3>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borrar!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: host+"/" + id,
        method: "DELETE",
        success: function (response) {
          cargarTabla();
          Swal.fire({
            title: "Borrado!",
            html: response.message,
            icon: "success",
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al borrar el registro:", error);
        },
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
  let tipo = $("#tipo").val();

  if (nombre.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Nombre</b> esta vacio",
      icon: "info",
    });
  } else {
    console.log("codigo: " + codigo + ", Nombre: " + nombre+ ", Tipo: " + tipo);

    let datos = {
      codigo: codigo,
      nombre: nombre,
      categoria:tipo
    };

    $.ajax({
      url: host, 
      method: "POST",
      data: datos,
      success: function (response) {
        Swal.fire({
          title: "Bien!",
          text: response.message,
          icon: "success",
        });

        $("#tablaTipos")
          .DataTable()
          .row.add({
            id: response.data.id,
            nombre: response.data.nombre,
            categoria: response.data.categoria,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
          })
          .draw();
        Limpiar();
      },
      error: function (xhr, status, error) {
        try {
          if (xhr.status == 400) {
            console.error(xhr.responseJSON.error.nombre[0]);
            Swal.fire({
              title: "Mal!",
              text: xhr.responseJSON.error.nombre[0],
              icon: "error",
            });
          } else {
            console.error("Error:", error);
          }

          Swal.fire({
            title: "Mal!",
            text: response.message,
            icon: "error",
          });
          console.error("Error al guardar el registro:", error);
        } catch (error) {}
      },
    });
  }
});

$("#modificar").click(function () {
  let codigo = $("#codigo").val();
  let nombre = $("#nombre").val();
  let tipo = $("#tipo").val();

  if (codigo.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Codigo</b> esta vacio",
      icon: "info",
    });
}else if (nombre.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Nombre</b> esta vacio",
      icon: "info",
    });
  } else {
    let datos = {
      codigo: codigo,
      nombre: nombre,
      categoria: tipo,
    };

    $.ajax({
      url: host+"/" + codigo, 
      method: "PUT",
      data: datos,
      success: function (response) {
        Swal.fire({
          title: "Bien!",
          text: response.message,
          icon: "success",
        });

        cargarTabla();
        Limpiar();
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: "Mal!",
          text: response.message,
          icon: "error",
        });
        console.error("Error al Actualizar el registro:", error);
      },
    });
  }
});

function cargarTabla() {
  $("#tablaTipos").DataTable().ajax.reload();
}

$(document).ready(function () {
  $("#modificar").hide();
  $("#tablaTipos").DataTable({
    dom: "Bfrtip",
    responsive: true,
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
    ajax: host,
    buttons: ["copy", "excel", "pdf", "print"],
    pageLength: 5,
    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "categoria" },
      {
        data: null,
        render: function (data, type, full, meta) {
          return (
            '<button class ="btn btn-info" onclick="cargar(\'' +
            data.id +
            "', '" +
            data.nombre +
            "', '" +
            data.categoria +
            '\')"><i class="mdi mdi-magnify mdi-size-lg" style="font-size: 20px;"></i></button>' +
            '<button class ="btn btn-danger" onclick="eliminar(\'' +
            data.id +
            "', '" +
            data.nombre +
            "', '" +
            data.categoria +
            '\')"><i class="mdi mdi-delete mdi-size-lg" style="font-size: 20px;"></i></button>'
          );
        },
      },
    ],
  });
});

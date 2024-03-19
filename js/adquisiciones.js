
const api = "http://localhost/apiadres/public/"
const ruta = "adquisiciones"
const host = api + ruta

function cargar(id, presupuesto, fecha, valorUnitario, cantidad, valortotal, unidad, tipo, documentacion, proveedor) {

  $("#codigo").val(id);
  $("#presupuesto").val(presupuesto);
  $("#unidad").val(unidad);
  $("#tipo").val(tipo);
  $("#cantidad").val(cantidad);
  $("#valor_unitario").val(valorUnitario);
  $("#valor_total").val(valortotal);
  $("#fecha").val(fecha);
  $("#proveedor").val(proveedor);
  $("#documentacion").val(documentacion);





  $("#modificar").show();
  $("#guardar").hide();
}

function eliminar(id, presupuesto, fecha, valorUnitario, cantidad, valortotal, unidad, tipo, documentacion, proveedor) {
  Swal.fire({
    title: "Ojo?",
    html: `Esta seguro de Eliminar el Registro: <h3>${id} - ${fecha} - ${documentacion}!</h3>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borrar!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: host + "/" + id,
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
  $("#presupuesto").val("");
  $("#cantidad").val("");
  $("#valor_unitario").val("");
  $("#valor_total").val("");
  $("#fecha").val("");
  $("#documentacion").val("");
  $("#modificar").hide();
  $("#guardar").show();
}

$("#limpiar").click(function () {
  Limpiar();
});

$("#guardar").click(function () {
  let codigo = $("#codigo").val();
  let presupuesto = $("#presupuesto").val();
  let unidad = $("#unidad").val();
  let tipo = $("#tipo").val();
  let cantidad = $("#cantidad").val();
  let valor_unitario = $("#valor_unitario").val();
  let valor_total = $("#valor_total").val();
  let fecha = $("#fecha").val();
  let proveedor = $("#proveedor").val();
  let documentacion = $("#documentacion").val();

  if (presupuesto.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Presupuesto</b> esta vacio",
      icon: "info",
    });
  }
  else if (cantidad.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Cantidad</b> esta vacio",
      icon: "info",
    });

  }
  else if (valor_unitario.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Valor Unitario</b> esta vacio",
      icon: "info",
    });

  }
  else if (valor_total.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Valor Total</b> esta vacio",
      icon: "info",
    });

  }
  else if (fecha.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Fecha Adquisición</b> esta vacio",
      icon: "info",
    });

  }
  else if (documentacion.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Documentación</b> esta vacio",
      icon: "info",
    });

  }
  else {


    let datos = {
      "presupuesto": parseFloat(presupuesto),
      "valor_unitario": parseFloat(valor_unitario),
      "valor_total": parseFloat(valor_total),
      "fecha_adquisicion": fecha,
      "cantidad": parseInt(cantidad),
      "unidad_id": parseInt(unidad),
      "tipo_id": parseInt(tipo),
      "documentacion": documentacion,
      "proveedor_id": parseInt(proveedor)
    };

    //console.log(datos);
    $.ajax({
      url: host,
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify(datos),
      success: function (response) {
        Swal.fire({
          title: "Bien!",
          text: response.message,
          icon: "success",
        });
        cargarTabla();
        // $("#tablaAdquisiciones")
        //   .DataTable()
        //   .row.add({
        //     id: response.data.id,
        //     nombre: response.data.nombre,
        //     categoria: response.data.categoria,
        //     created_at: response.data.created_at,
        //     updated_at: response.data.updated_at,
        //   })
        //   .draw();
        Limpiar();
      },
      error: function (xhr, status, error) {
        try {
          if (xhr.status == 400) {
            console.error(xhr.responseJSON.error.nombre[0]);
            Swal.fire({
              title: "Mal!",
              text: xhr.responseJSON.error,
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
        } catch (error) { }
      },
    });
  }
});

$("#modificar").click(function () {
  let codigo = $("#codigo").val();
  let presupuesto = $("#presupuesto").val();
  let unidad = $("#unidad").val();
  let tipo = $("#tipo").val();
  let cantidad = $("#cantidad").val();
  let valor_unitario = $("#valor_unitario").val();
  let valor_total = $("#valor_total").val();
  let fecha = $("#fecha").val();
  let proveedor = $("#proveedor").val();
  let documentacion = $("#documentacion").val();

  if (presupuesto.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Presupuesto</b> esta vacio",
      icon: "info",
    });
  }
  else if (cantidad.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Cantidad</b> esta vacio",
      icon: "info",
    });

  }
  else if (valor_unitario.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Valor Unitario</b> esta vacio",
      icon: "info",
    });

  }
  else if (valor_total.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Valor Total</b> esta vacio",
      icon: "info",
    });

  }
  else if (fecha.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Fecha Adquisición</b> esta vacio",
      icon: "info",
    });

  }
  else if (documentacion.trim() == "") {
    Swal.fire({
      title: "Ojo!",
      html: "El campo <b>Documentación</b> esta vacio",
      icon: "info",
    });

  }
  else {


    let datos = {
      "presupuesto": parseFloat(presupuesto),
      "valor_unitario": parseFloat(valor_unitario),
      "valor_total": parseFloat(valor_total),
      "fecha_adquisicion": fecha,
      "cantidad": parseInt(cantidad),
      "unidad_id": parseInt(unidad),
      "tipo_id": parseInt(tipo),
      "documentacion": documentacion,
      "proveedor_id": parseInt(proveedor)
    };
    $.ajax({
      url: host + "/" + codigo,
      method: "PUT",
      contentType: 'application/json',
      data: JSON.stringify(datos),
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
        console.error("Error al Actualizar el registro:", error);
        Swal.fire({
          title: "Mal!",
          text: response.message,
          icon: "error",
        });
      },
    });
  }
});

function cargarTabla() {
  $("#tablaAdquisiciones").DataTable().ajax.reload();
}

$(document).ready(function () {

  const unidad = "http://localhost/apiadres/public/unidades";
  $.ajax({
    url: unidad,
    method: "GET",
    success: function (resultado) {
      // console.log(resultado['data']);
      $.each(resultado['data'], function (index, unidad) {
        $("#unidad").append(
          `<option value="${unidad.id}">${unidad.nombre}</option>`
        );
      });
    },
  });

  const tipos = "http://localhost/apiadres/public/tipos";
  $.ajax({
    url: tipos,
    method: "GET",
    success: function (resultado) {
      // console.log(resultado['data']);
      $.each(resultado['data'], function (index, tipo) {
        $("#tipo").append(
          `<option value="${tipo.id}">${tipo.nombre} - ${tipo.categoria}</option>`
        );
      });
    },
  });

  const proveedores = "http://localhost/apiadres/public/proveedores";
  $.ajax({
    url: proveedores,
    method: "GET",
    success: function (resultado) {
      // console.log(resultado['data']);
      $.each(resultado['data'], function (index, proveedor) {
        $("#proveedor").append(
          `<option value="${proveedor.id}">${proveedor.nombre}</option>`
        );
      });
    },
  });

  $('#cantidad, #valor_unitario').on('input', function () {
    let cantidad = parseFloat($('#cantidad').val());
    let valorUnitario = parseFloat($('#valor_unitario').val());
    if (!isNaN(cantidad) && !isNaN(valorUnitario)) {
      let valorTotal = cantidad * valorUnitario;
      $('#valor_total').val(valorTotal);
    } else {
      $('#valor_total').val('');
    }
  });

  $("#modificar").hide();
  $("#tablaAdquisiciones").DataTable({
    dom: "Bfrtip",
    responsive: true,
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
    ajax: host,
    buttons: ["copy", "excel", "pdf", "print"],
    pageLength: 5,
    "columnDefs": [
      {
        "targets": [1, 3, 5],
        "render": function (data, type, row) {
          return parseInt(data).toString();
        }
      }
    ],
    columns: [
      { data: "id" },
      { data: "presupuesto" },
      { data: "fecha_adquisicion" },
      { data: "valor_unitario" },
      { data: "cantidad" },
      { data: "valor_total" },
      { data: "unidad_id" },
      { data: "tipo_id" },
      { data: "documentacion" },
      { data: "proveedor_id" },
      {
        data: null,
        render: function (data, type, full, meta) {
          return (
            '<button class ="btn btn-info" onclick="cargar(\'' +
            data.id +
            "', '" +
            parseFloat(data.presupuesto).toFixed(0) +
            "', '" +
            data.fecha_adquisicion +
            "', '" +
            parseFloat(data.valor_unitario).toFixed(0) +
            "', '" +
            data.cantidad +
            "', '" +
            parseFloat(data.valor_total).toFixed(0) +
            "', '" +
            data.unidad_id +
            "', '" +
            data.tipo_id +
            "', '" +
            data.documentacion +
            "', '" +
            data.proveedor_id
            +
            '\')"><i class="mdi mdi-magnify mdi-size-lg" style="font-size: 20px;"></i></button>' +
            '<button class ="btn btn-danger" onclick="eliminar(\'' +
            data.id +
            "', '" +
            parseFloat(data.presupuesto).toFixed(0) +
            "', '" +
            data.fecha_adquisicion +
            "', '" +
            parseFloat(data.valor_unitario).toFixed(0) +
            "', '" +
            data.cantidad +
            "', '" +
            parseFloat(data.valor_total).toFixed(0) +
            "', '" +
            data.unidad_id +
            "', '" +
            data.tipo_id +
            "', '" +
            data.documentacion +
            "', '" +
            data.proveedor_id
            +
            '\')"><i class="mdi mdi-delete mdi-size-lg" style="font-size: 20px;"></i></button>'
          );
        },
      },
    ],
  });
});

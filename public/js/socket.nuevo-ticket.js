// Establecer conexion con servidor
let socket = io();

socket.on('connect', function() {
  console.log('conectado al servidor');
});

socket.on('disconnect', function() {
  console.log('desconecatado del servidor');
});

var label = $('#lblNuevoTicket');

socket.on('estadoActual', function(data) {
  label.text(data.actual);
})

$('button').on('click', function() {

  socket.emit('siguienteTicket', null, function(siguienteTicket) {
    label.text(siguienteTicket);
  });

});

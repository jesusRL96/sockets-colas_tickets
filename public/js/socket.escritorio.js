let socket = io();

socket.on('connect', function() {
  console.log('conectado al servidor');
});

socket.on('disconnect', function() {
  console.log('desconecatado del servidor');
});

let searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario')
}

let escritorio = searchParams.get('escritorio');

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function() {
  socket.emit('atenderTicket', {escritorio: escritorio}, function(resp) {
    console.log(resp);
    if(resp === "No hay tickets") {
      alert(resp);
    }
    $('small').text(`Ticket numero ${resp.numero}`);
  });

});

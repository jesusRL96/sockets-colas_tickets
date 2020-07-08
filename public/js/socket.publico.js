let socket = io();

socket.on('connect', function() {
  console.log('conectado al servidor');
});

socket.on('disconnect', function() {
  console.log('desconecatado del servidor');
});

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
  // console.log(data.actual);
  // console.log(data.ultimos4);
  if(data.ultimos4.length <= 0) return;
  ActualizaHTML(data.ultimos4);
  var audio = new Audio('../audio/new-ticket.mp3');
  audio.play();
});

function ActualizaHTML(ultimos4) {
  for (var i = 0; i <= ultimos4.length - 1; i++) {
    lblTickets[i].text('Ticket ' + ultimos4[i].numero);
    lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
  }
}

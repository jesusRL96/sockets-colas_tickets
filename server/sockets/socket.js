const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control.js');

let ticketControl = new TicketControl();


io.on('connection', (client) => {
  // Evento de nuevo ticket
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });

  // Evento para mostrar ticket actual
  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  // Atender un Ticket
  client.on('atenderTicket', (data, callback) => {
    if(!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario'
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    // Actualizar cambios en los ultimos 4
    client.broadcast.emit('estadoActual', {
      actual: ticketControl.getUltimoTicket(),
      ultimos4: ticketControl.getUltimos4()
    });

  });

});

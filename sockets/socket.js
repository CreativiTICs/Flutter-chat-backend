const {io} = require('../index');
const {comprobarJWT}= require('../helpers/jwt');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


//Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente Conectado');

    //Como saber si el cliente tiene el JWT
    const [valido, uid]= comprobarJWT(client.handshake.headers['x-token']);
    //Verificart Auth
    if(!valido){return client.disconnect();}
    //Cliente Auth
    usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    //Sala global, client.id, sala con uid
    client.join(uid);

    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload)=>{
        //Grabar Mensaje en DB
        await grabarMensaje(payload);
        //Enviar mensaje a la persona indicada
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    //client.on('mensaje', (payload)=>{
    //    console.log('Mensaje!!', payload);
    //    io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    //});

});
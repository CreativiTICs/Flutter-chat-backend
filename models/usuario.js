const {Schema, model}= require('mongoose');


// Campos para crear el usuario
const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }

});
//Para no recibir datos como el password en la base de datos
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object}= this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);
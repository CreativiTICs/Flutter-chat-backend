const {Schema, model}= require('mongoose');


// Campos para crear el usuario
const MensajeSchema = Schema({

    de:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje:{
        type: String,
        require: true
    }
},{
    timestamps : true
});
//Para no recibir datos como el password en la base de datos
MensajeSchema.method('toJSON', function(){
    const {__v, _id,...object}= this.toObject();
    return object;
})

module.exports = model('Mensaje', MensajeSchema);
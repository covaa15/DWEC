import mongoose from 'mongoose';

const esquemaAutor = new mongoose.Schema({
    referencia: { type: String, unique: true, required: true },
    nombre: { type: String, required: true },
    nacionalidad:String,
    fechaNacimiento: Date,
    imagenUrl: String
});

export default mongoose.model('Autor', esquemaAutor, 'autores');
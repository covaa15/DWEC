import mongoose from 'mongoose';

const esquemaLibro = new mongoose.Schema({
    referencia: { type: String, unique: true, required: true },
    titulo: { type: String, required: true },
    genero:String,
    anyoPublicacion:Number,
    autor:{type:String, required:true},
    imagenUrl:String
});

export default mongoose.model('Libro', esquemaLibro, 'libros');
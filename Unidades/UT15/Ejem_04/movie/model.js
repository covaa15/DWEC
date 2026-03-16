import mongoose from 'mongoose';
 
// mongoose.connect('mongodb://localhost:27017/moviedb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
const uri = "mongodb+srv://alumno2:alumno2026@cluster0.igbcsjv.mongodb.net/moviedb?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
await mongoose.connect(uri, clientOptions);
const movieSchema = new mongoose.Schema(
  { id: Number,
    title: String,
    year: Number
  },
  { collection: 'Movies' },
  // {versionKey: false}
);
delete mongoose.models.Movie;
const Movie = mongoose.model('Movie', movieSchema);

//la colección se crea automáticamente al insertar el primer documento
//en la colección movies sino la expecificaos
 
export function getAll() {
  return Movie.find();
}
 
export function get(id) {
  return Movie.findOne({ id: id });

}
 
export async function remove(id) {
  return Movie.deleteOne({ id: id })
}
 
export async function save(movie) {
  if (!movie.id) {
    const newMovie = new Movie(movie);
    newMovie.id = Date.now();
    return newMovie.save();
  } else {
    const existingMovie = await get(parseInt(movie.id, 10));
    existingMovie.title = movie.title;
    existingMovie.year = movie.year;
    return existingMovie.save();
  }
}

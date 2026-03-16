import { MongoClient,ServerApiVersion } from 'mongodb';

let collection = null;

async function connect() {
  const uri = "mongodb+srv://alumno2:alumno2026@cluster0.igbcsjv.mongodb.net/?appName=Cluster0";
  if (collection) {
    return collection;
  }
  const client = new MongoClient(uri,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  const db = client.db('moviedb');
  collection = db.collection('Movies');
  return collection;
}

export async function getAll() {
  const collection = await connect();
  const docs = await collection.find({});
  return docs.toArray();
  // return Promise.resolve([]);
}

export async function get(id) {
  const collection = await connect();
  const doc = await collection.findOne({ id });
  return doc;
}

export async function remove(id) {
  const collection = await connect();
  return collection.deleteOne({ id });
}


async function insert(movie) {
  movie.id = Date.now();
  const collection = await connect();
  const data = collection.insertOne(movie);
  return data;
}

async function update(movie) {
  movie.id = parseInt(movie.id, 10);
  const collection = await connect();
  await collection.updateOne({ id: movie.id }, { $set: movie });
  return movie;
}

export async function save(movie) {
 if (!movie.id) {
return insert(movie);
}
  else {
return update(movie);
}

}
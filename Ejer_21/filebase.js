import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Cargo las variables del .env
dotenv.config();

// Creo el cliente S3 apuntando a Filebase
export const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  forcePathStyle: true
});

export const BUCKET = process.env.AWS_BUCKET_MANE;

// Subo una imagen al bucket de Filebase
export async function subirImagen(nombreArchivo, buffer, mimetype) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read'
  }));
}

// Elimino una imagen del bucket de Filebase
export async function eliminarImagen(nombreArchivo) {
  await s3.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  }));
}

// Obtengo una imagen del bucket de Filebase y la mando al navegador
export async function obtenerImagen(nombreArchivo) {
  return await s3.send(new GetObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  }));
}
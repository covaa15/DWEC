/**
 * Script de utilidad para listar todos los buckets de S3 disponibles para las credenciales actuales.
 */
import 'dotenv/config';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

/**
 * Se conecta al servicio y recupera la lista de buckets.
 */
async function listBuckets() {
  // Inicializa el cliente S3
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  console.log(`Listando buckets en ${process.env.AWS_ENDPOINT}...`);

  try {
    // Envía la petición ListBuckets al servidor
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("¡Éxito! Tus buckets son:");
    
    // Itera a través de la lista de buckets devuelta y muestra los nombres y fechas de creación
    if (data.Buckets && data.Buckets.length > 0) {
      data.Buckets.forEach((bucket) => {
        console.log(` - ${bucket.Name} (Creado: ${bucket.CreationDate})`);
      });
    } else {
      console.log("No se encontraron buckets en esta cuenta.");
    }
  } catch (err) {
    // Registro detallado de errores, incluyendo el código de estado HTTP si está disponible
    console.error("Error al listar los buckets:", err.name, err.message);
    if (err.$metadata) {
      console.log("Código de estado HTTP:", err.$metadata.httpStatusCode);
    }
  }
}

// Ejecuta la tarea de listado
listBuckets();

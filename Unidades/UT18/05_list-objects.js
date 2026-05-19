/**
 * Script de utilidad para listar el contenido de un bucket específico de S3.
 * Siguiendo el esquema de las aplicaciones existentes en el proyecto.
 */
import 'dotenv/config';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

/**
 * Se conecta al servicio y recupera la lista de objetos en el bucket especificado.
 */
async function listObjects(bucketName) {
  // Inicializa el cliente S3 con la configuración de las variables de entorno
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: true, // Requerido para servicios compatibles como Filebase o MinIO
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  console.log(`Listando contenido del bucket "${bucketName}" en ${process.env.AWS_ENDPOINT}...`);

  try {
    // Crea el comando ListObjectsV2Command para el bucket específico
    const command = new ListObjectsV2Command({
      Bucket: bucketName
    });

    // Envía la petición al servidor
    const data = await s3Client.send(command);

    console.log(`¡Éxito! El contenido de "${bucketName}" es:`);
    
    // Verifica si el bucket tiene contenido
    if (data.Contents && data.Contents.length > 0) {
      console.log("------------------------------------------------------------------");
      console.log(`${'Nombre del Archivo'.padEnd(40)} | ${'Tamaño (KB)'.padEnd(12)} | ${'Última Modificación'}`);
      console.log("------------------------------------------------------------------");
      
      data.Contents.forEach((object) => {
        const sizeKB = (object.Size / 1024).toFixed(2);
        const lastModified = object.LastModified.toLocaleString();
        console.log(`${object.Key.padEnd(40)} | ${sizeKB.toString().padStart(11)} | ${lastModified}`);
      });
      
      console.log("------------------------------------------------------------------");
      console.log(`Total: ${data.KeyCount} objeto(s).`);
    } else {
      console.log(`El bucket "${bucketName}" está vacío o no se encontraron objetos.`);
    }
  } catch (err) {
    // Manejo de errores detallado
    console.error(`Error al listar los objetos del bucket "${bucketName}":`, err.name, err.message);
    if (err.$metadata) {
      console.log("Código de estado HTTP:", err.$metadata.httpStatusCode);
    }
  }
}

// Ejecuta la tarea de listado para el bucket solicitado
const targetBucket = "mpb-pruebas";
listObjects(targetBucket);

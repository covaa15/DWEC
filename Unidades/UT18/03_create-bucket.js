/**
 * Script de utilidad para crear un nuevo bucket de S3.
 * Por defecto intenta crear un bucket llamado 'pruebas'.
 */
import 'dotenv/config';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';

/**
 * Se conecta al proveedor de S3 e intenta crear un nuevo bucket.
 */
async function createBucket() {
  const bucketName = 'pruebas';
  
  // Inicializa el cliente S3 con la configuración basada en el entorno
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  console.log(`Creando el bucket "${bucketName}" en ${process.env.AWS_ENDPOINT}...`);

  try {
    // Envía el comando CreateBucketCommand al servicio S3
    await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
    console.log(`¡Éxito! El bucket "${bucketName}" se creó correctamente.`);
  } catch (err) {
    // Maneja con elegancia los casos en los que el bucket ya existe
    if (err.name === 'BucketAlreadyOwnedByYou' || err.name === 'BucketAlreadyExists') {
      console.log(`El bucket "${bucketName}" ya existe.`);
    } else {
      console.error("Error al crear el bucket:", err.name, err.message);
    }
  }
}

// Ejecuta la tarea de creación del bucket
createBucket();

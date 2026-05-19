/**
 * Script de utilidad para eliminar un objeto específico de un bucket de S3.
 * Sigue el esquema de las aplicaciones existentes en el proyecto utilizando AWS SDK v3.
 */
import 'dotenv/config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

/**
 * Función para eliminar un objeto del bucket.
 * @param {string} bucketName - Nombre del bucket.
 * @param {string} objectKey - Clave (nombre/ruta) del objeto a eliminar.
 */
async function deleteObject(bucketName, objectKey) {
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

  console.log(`Intentando eliminar el objeto "${objectKey}" del bucket "${bucketName}"...`);

  try {
    // Crea el comando DeleteObjectCommand para el objeto específico
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey
    });

    // Envía la petición de eliminación al servidor
    const response = await s3Client.send(command);

    // Nota: S3 suele responder con éxito (204 No Content) incluso si el objeto no existía,
    // a menos que se use versionado o existan restricciones de permisos específicas.
    console.log(`¡Éxito! El comando de eliminación para "${objectKey}" se ha completado.`);
    console.log("Código de estado HTTP:", response.$metadata.httpStatusCode);

  } catch (err) {
    // Manejo de errores detallado
    console.error(`Error al intentar eliminar el objeto "${objectKey}":`, err.name, err.message);
    if (err.$metadata) {
      console.log("Código de estado HTTP:", err.$metadata.httpStatusCode);
    }
  }
}

// Configuración del bucket y el nombre del archivo a borrar (guardado en una variable)
const targetBucket = process.env.AWS_BUCKET_NAME || "mpb-pruebas";
const targetObject = "info.md"; 

// Ejecutar la función de eliminación
deleteObject(targetBucket, targetObject);

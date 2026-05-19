/**
 * Script principal de subida utilizando el SDK oficial de AWS v3.
 * Maneja la lectura de archivos, subida multipart y generación de URLs pre-firmadas.
 * 
  @aws-sdk/client-s3: Cliente oficial del AWS SDK para JavaScript v3 que permite interactuar
  con el servicio Amazon S3. Se usa para operaciones básicas como subir,
  descargar, listar y eliminar objetos en buckets de S3.

  @aws-sdk/lib-storage: Biblioteca complementaria del AWS SDK que facilita la subida
  de archivos grandes a S3 mediante uploads multipart.
  Proporciona la clase Upload para manejar archivos de gran tamaño de manera eficiente.

  @aws-sdk/s3-request-presigner: Utilidad para generar URLs pre-firmadas (pre-signed URLs)
  para operaciones en S3, permitiendo acceso temporal a recursos de S3 
  sin necesidad de credenciales AWS permanentes.
 */
import 'dotenv/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import path from 'path';

// Inicializa el cliente S3 con las credenciales y configuración de las variables de entorno
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: true, // Requerido para la mayoría de servicios compatibles con S3 como MinIO o Filebase
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

/**
 * Sube un archivo al bucket S3 configurado y genera una URL pre-firmada para su acceso.
 * @param {string} filePath - La ruta local del archivo a subir.
 */
async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  // Utiliza la clase Upload de @aws-sdk/lib-storage para una subida multipart eficiente
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
    },
  });

  // Muestra el progreso de la subida en la consola
  upload.on("httpUploadProgress", (progress) => {
    console.log(`Progreso: ${progress.loaded} / ${progress.total}`);
  });

  try {
    await upload.done();
    console.log(`Archivo subido con éxito: ${fileName}`);

    // Genera una URL pre-firmada para permitir el acceso público temporal al objeto privado
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });
    
    // La URL expirará en 3600 segundos (1 hora)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log(`URL pre-firmada (expira en 1 hora):`);
    console.log(url);
  } catch (err) {
    console.error("Error al subir el archivo:", err);
  }
}

// Extrae la ruta del archivo de los argumentos de la línea de comandos
const filePath = process.argv[2];
if (!filePath) {
  console.log("Por favor, proporciona la ruta de un archivo para subir.");
  console.log("Uso: node index.js <ruta-del-archivo>");
  process.exit(1);
}

// Verifica que el archivo especificado exista antes de intentar subirlo
if (!fs.existsSync(filePath)) {
  console.error("El archivo no existe:", filePath);
  process.exit(1);
}

// Ejecuta el proceso de subida
uploadFile(filePath);

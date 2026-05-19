/**
 * Versión avanzada de fetch-upload.js que renombra el archivo utilizando UUID.
 * Esto asegura que cada archivo subido tenga un nombre único y no sobrescriba otros.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import aws4 from 'aws4';
import { v4 as uuidv4 } from 'uuid'; // Importamos la función para generar UUID v4

/**
 * Sube un archivo con un nombre único generado aleatoriamente.
 * @param {string} filePath - Ruta local del archivo a subir.
 */
async function uploadFileWithUuid(filePath) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const originalFileName = path.basename(filePath);
  const fileExtension = path.extname(originalFileName);
  
  // Generamos un nuevo nombre único manteniendo la extensión original
  const fileName = `${uuidv4()}${fileExtension}`;
  
  const endpoint = process.env.AWS_ENDPOINT;
  const endpointUrl = new URL(endpoint);
  
  // Configuración de estilo de ruta para compatibilidad
  const usePathStyle = process.env.AWS_S3_PATH_STYLE !== 'false';
  
  let requestUrl;
  let requestPath;
  
  if (usePathStyle) {
    requestUrl = `${endpoint}/${bucketName}/${fileName}`;
    requestPath = `/${bucketName}/${fileName}`;
  } else {
    const protocol = endpointUrl.protocol;
    const host = endpointUrl.host;
    requestUrl = `${protocol}//${bucketName}.${host}/${fileName}`;
    requestPath = `/${fileName}`;
  }

  // Lectura del contenido del archivo
  const fileBuffer = fs.readFileSync(filePath);

  // Configuración de la petición para la firma SigV4
  const opts = {
    host: usePathStyle ? endpointUrl.host : `${bucketName}.${endpointUrl.host}`,
    path: requestPath,
    method: 'PUT',
    service: 's3',
    region: process.env.AWS_REGION || 'us-east-1',
    body: fileBuffer,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  };

  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };

  // Firmamos la petición manualmente
  aws4.sign(opts, credentials);

  console.log(`Subiendo ${originalFileName} como ${fileName} usando fetch a ${endpoint}...`);

  try {
    const response = await fetch(requestUrl, {
      method: opts.method,
      headers: opts.headers,
      body: fileBuffer
    });

    if (response.ok) {
      console.log('¡Archivo subido con éxito con nuevo nombre UUID!');
      console.log(`Nombre en S3: ${fileName}`);
    } else {
      const errorText = await response.text();
      console.error(`La subida falló (HTTP ${response.status}):`, errorText);
    }
  } catch (err) {
    console.error('Error durante la subida con UUID:', err);
  }
}

// Validación de argumentos
const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
  console.log("Por favor, proporciona una ruta de archivo válida.");
  process.exit(1);
}

// Iniciamos la subida con renombrado UUID
uploadFileWithUuid(filePath);

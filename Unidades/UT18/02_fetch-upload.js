/**
 * Script de subida avanzado que evita el SDK de AWS y utiliza llamadas fetch manuales.
 * Esto demuestra cómo firmar peticiones utilizando AWS Signature V4 de forma manual.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import aws4 from 'aws4';

/**
 * Sube un archivo construyendo manualmente una petición HTTP PUT firmada.
 * @param {string} filePath - Ruta local del archivo a subir.
 */
async function uploadFileWithFetch(filePath) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileName = path.basename(filePath);
  const endpoint = process.env.AWS_ENDPOINT;
  const endpointUrl = new URL(endpoint);
  
  // S3 soporta URLs de estilo de ruta (endpoint/bucket/key) y de estilo virtual (bucket.endpoint/key).
  // La mayoría de los proveedores compatibles con S3 prefieren el estilo de ruta.
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

  // Carga el contenido del archivo en memoria como un buffer para el cuerpo de la petición
  const fileBuffer = fs.readFileSync(filePath);

  // Objeto de configuración para el proceso de firma
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

  // Credenciales de usuario necesarias para el cálculo de SigV4
  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };

  // Firma el objeto de opciones. Esto añade las cabeceras 'Authorization' y 'X-Amz-*' a opts.headers.
  aws4.sign(opts, credentials);

  console.log(`Subiendo ${fileName} usando fetch a ${endpoint}...`);

  try {
    // Realiza la petición de red real utilizando la API nativa fetch
    const response = await fetch(requestUrl, {
      method: opts.method,
      headers: opts.headers,
      body: fileBuffer
    });

    if (response.ok) {
      console.log('¡Archivo subido con éxito usando fetch!');
    } else {
      // Muestra el cuerpo de la respuesta de error si la subida falla (ej. Acceso denegado, Bucket no encontrado)
      const errorText = await response.text();
      console.error(`La subida falló (HTTP ${response.status}):`, errorText);
    }
  } catch (err) {
    console.error('Error durante la subida con fetch:', err);
  }
}

// Validación de CLI
const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
  console.log("Por favor, proporciona una ruta de archivo válida.");
  process.exit(1);
}

// Inicia la subida manual basada en fetch
uploadFileWithFetch(filePath);

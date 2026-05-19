/**
 * Programa minimalista para mostrar una imagen específica del bucket en una web.
 * Archivo: a9e37068-a4f9-4fbc-b995-eb0c615a3380.jpg
 */
import 'dotenv/config';
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();
const port = 5001; 

// Inicializar cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

app.get('/', async (req, res) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileKey = 'bd639918-6002-4034-842b-cf6f3347a457.jpg';


  try {
    // Generar URL pre-firmada para el archivo específico
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Enviar una página HTML simple con la imagen
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <title>Visualizador de Imagen S3</title>
          <style>
              body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f0f2f5; margin: 0; }
              .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 90%; }
              img { max-width: 100%; border-radius: 5px; border: 1px solid #ddd; }
              h1 { color: #333; font-size: 1.2rem; }
              p { font-size: 0.8rem; color: #666; word-break: break-all; }
          </style>
      </head>
      <body>
          <div class="card">
              <h1>Imagen desde S3</h1>
              <img src="${url}" alt="Imagen del bucket">
              <p>Archivo: ${fileKey}</p>
              <p><a href="${url}" target="_blank">Abrir URL directa</a></p>
          </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`Error al obtener la imagen: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Visualizador iniciado en http://localhost:${port}`);
 
});

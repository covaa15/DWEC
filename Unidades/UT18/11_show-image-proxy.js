/**
 * Programa que muestra una imagen específica usando un Proxy de Node.js.
 * En lugar de generar una URL pre-firmada, el servidor descarga la imagen
 * de S3 y se la entrega al navegador.
 */
import 'dotenv/config';
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const app = express();
const port = 5002;

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

/**
 * 1. Endpoint que actúa como Proxy:
 * Descarga el flujo de datos (stream) de S3 y lo envía al navegador.
 */
app.get('/image-proxy/:key', async (req, res) => {
  const fileKey = req.params.key;
  
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    const response = await s3Client.send(command);

    // Configurar las cabeceras para que el navegador sepa que es una imagen
    res.setHeader('Content-Type', response.ContentType || 'image/jpeg');
    
    // El cuerpo de la respuesta de S3 v3 es un stream (ReadableStream)
    // Usamos pipe para enviarlo directamente al objeto 'res' de express
    response.Body.pipe(res);
  } catch (err) {
    console.error(`Error al servir la imagen ${fileKey}:`, err.message);
    res.status(404).send('No se pudo encontrar o cargar la imagen.');
  }
});

/**
 * 2. Página principal:
 * Muestra la imagen usando el endpoint del proxy en lugar de una URL externa.
 */
app.get('/', (req, res) => {
  const targetImage = 'bd639918-6002-4034-842b-cf6f3347a457.jpg';
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Visualizador Proxy S3</title>
        <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #eef2f3; margin: 0; }
            .container { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; }
            img { max-width: 100%; height: auto; border-radius: 8px; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            h2 { color: #2c3e50; margin-bottom: 20px; }
            .info { margin-top: 15px; color: #7f8c8d; font-size: 0.9rem; }
            code { background: #f8f9fa; padding: 2px 5px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Imagen servida vía Proxy</h2>
            <!-- La fuente de la imagen es nuestra propia ruta local -->
            <img src="/image-proxy/${targetImage}" alt="Imagen desde S3">
            <div class="info">
                <p>Archivo: <code>${targetImage}</code></p>
                <p>Cargada directamente por el servidor Node.js desde S3.</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Servidor Proxy iniciado en http://localhost:${port}`);
  console.log(`Sirviendo imagen: a9e37068-a4f9-4fbc-b995-eb0c615a3380.jpg`);
});

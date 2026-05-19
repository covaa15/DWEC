/**
 * Servidor Express v2 - Separación de UI y Lógica.
 * Sirve archivos estáticos desde la carpeta /public.
 */
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import aws4 from 'aws4';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5001;

// Configuración para obtener rutas en módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir la carpeta 'public' (aquí vive nuestro index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Multer
const upload = multer({ dest: 'uploads/' });

/**
 * Lógica de subida a S3 (idéntica a la v1)
 */
async function uploadToS3(tempFilePath, originalFileName) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileExtension = path.extname(originalFileName);
  const fileName = `${uuidv4()}${fileExtension}`;
  
  const endpoint = process.env.AWS_ENDPOINT;
  const endpointUrl = new URL(endpoint);
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

  const fileBuffer = fs.readFileSync(tempFilePath);

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

  aws4.sign(opts, credentials);

  try {
    const response = await fetch(requestUrl, {
      method: opts.method,
      headers: opts.headers,
      body: fileBuffer
    });

    if (response.ok) {
      return { success: true, fileName };
    } else {
      const errorText = await response.text();
      return { success: false, error: errorText };
    }
  } catch (err) {
    return { success: false, error: err.message };
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

// Endpoint de subida
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No se recibió ningún archivo' });
  }

  const result = await uploadToS3(req.file.path, req.file.originalname);
  res.json(result);
});

// Crear directorio de subidas si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(port, () => {
  console.log(`Servidor v2 iniciado en http://localhost:${port}`);
  console.log(`La interfaz se carga desde: ${path.join(__dirname, 'public', 'index.html')}`);
});

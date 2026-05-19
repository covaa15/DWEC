/**
 * Servidor Express con interfaz web para subida de archivos a S3.
 * Genera nombres únicos con UUID y firma las peticiones manualmente con SigV4.
 */
import 'dotenv/config';
import express from 'express';
import multer from 'multer'; // Para manejar la subida de archivos al servidor
import fs from 'fs';
import path from 'path';
import aws4 from 'aws4';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5001;

// Configuración de Multer para almacenamiento temporal
const upload = multer({ dest: 'uploads/' });

/**
 * Lógica de subida a S3 (basada en fetch-upload-uuid.js)
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
    // Limpiar el archivo temporal del servidor
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

// Ruta principal con la interfaz HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>S3 Web Uploader</title>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; margin: 0; }
            .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
            h1 { font-size: 1.5rem; color: #333; margin-bottom: 1.5rem; text-align: center; }
            input[type="file"] { width: 100%; margin-bottom: 1rem; }
            button { width: 100%; padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
            button:hover { background-color: #0056b3; }
            #status { margin-top: 1rem; text-align: center; font-size: 0.9rem; }
            .success { color: green; }
            .error { color: red; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Subir Archivo a S3</h1>
            <form id="uploadForm">
                <input type="file" name="file" id="fileInput" required>
                <button type="submit" id="submitBtn">Subir a S3</button>
            </form>
            <div id="status"></div>
        </div>

        <script>
            const form = document.getElementById('uploadForm');
            const statusDiv = document.getElementById('status');
            const submitBtn = document.getElementById('submitBtn');

            form.onsubmit = async (e) => {
                e.preventDefault();
                statusDiv.innerText = 'Subiendo...';
                submitBtn.disabled = true;

                const formData = new FormData(form);
                try {
                    const res = await fetch('/upload', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    
                    if (data.success) {
                        statusDiv.innerHTML = \`<p class="success">¡Éxito! Subido como:<br><strong>\${data.fileName}</strong></p>\`;
                    } else {
                        statusDiv.innerHTML = \`<p class="error">Error: \${data.error}</p>\`;
                    }
                } catch (err) {
                    statusDiv.innerHTML = '<p class="error">Error de conexión</p>';
                } finally {
                    submitBtn.disabled = false;
                }
            };
        </script>
    </body>
    </html>
  `);
});

// Endpoint para procesar la subida
// `upload.single('file')` usa multer para recibir un único archivo enviado con el campo "file"
app.post('/upload', upload.single('file'), async (req, res) => {
  // Si no existe req.file, significa que el cliente no envió un archivo válido
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No se seleccionó ningún archivo' });
  }

  // Subir el archivo temporal a S3. `req.file.path` es la ruta local y `req.file.originalname` conserva la extensión.
  const result = await uploadToS3(req.file.path, req.file.originalname);

  // Enviar al cliente el resultado de la subida en formato JSON
  res.json(result);
});

// Crear directorio de subidas si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(port, () => {
  console.log(`Servidor web iniciado en http://localhost:${port}`);
});

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const appDir = dirname(__dirname);

// Ruta para servir archivos estáticos
router.use('/uploads', express.static(join(appDir, 'uploads')));

// Ruta para obtener un archivo específico
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(join(appDir, 'uploads', filename));
});

// Función para cargar y normalizar el JSON en un array de objetos con clave y valor
export const loadAndNormalizeJson = (jsonData: any) => {
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
  const normalizedData = jsonData.map((item: any) => {
    return {
      agrupadoPor: capitalizeWords(item.headerName),
      tipo: capitalizeWords(item.attributeName),
      valor: capitalizeFirstLetter(item.attributeValue)
    };
  });
  return normalizedData;
};

export default router;

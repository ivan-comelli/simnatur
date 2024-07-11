// generateHashes.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const directory = './static'; // Directorio donde se encuentran los archivos estáticos
const hashMapFile = path.join(directory, 'hashMap.json'); // Archivo para guardar el mapeo de hashes

// Función para generar hash
function generateHash(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(fileContent).digest('hex').slice(0, 8); // Utiliza sha256 para generar un hash
  return hash;
}

// Función para obtener todos los archivos dentro de un directorio recursivamente
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file !== 'hashMap.json') {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Función para eliminar el hash antiguo de un nombre de archivo
function removeOldHash(fileName) {
  const regex = /\.[a-f0-9]{8}/; // Busca un hash de 8 caracteres antes de la extensión
  return fileName.replace(regex, ''); // Reemplaza el hash y la extensión por solo la extensión
}

// Función para asegurarse de que la ruta comience con '/'
function ensureLeadingSlash(filePath) {
    if (!filePath.startsWith('/')) {
      return `/${filePath}`;
    }
    return filePath;
}

// Obtener todos los archivos dentro de la carpeta 'static'
const filesToHash = getAllFiles(directory);

// Leer el mapeo existente, si existe
let hashMap = {};
if (fs.existsSync(hashMapFile)) {
  hashMap = JSON.parse(fs.readFileSync(hashMapFile, 'utf-8'));
}

filesToHash.forEach(filePath => {
  const relativePath = path.relative(directory, filePath);
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(relativePath);
  let baseName = path.basename(relativePath, ext);

  // Eliminar el hash antiguo del nombre del archivo
  baseName = removeOldHash(baseName);

  let hashedName;
  fileHash = generateHash(filePath);
  hashedName = `${baseName}.${fileHash}${ext}`;
  const newFilePath = path.join(path.dirname(filePath), hashedName);
  fs.renameSync(filePath, newFilePath);

  // Actualizar el mapeo de hashes
  const cleanRelativePath = removeOldHash(relativePath).replace(/\\/g, '/');
  hashMap[ensureLeadingSlash(cleanRelativePath)] = `/${path.relative(directory, newFilePath).replace(/\\/g, '/')}`;
});

// Guardar el mapeo de hashes actualizado en un archivo JSON
fs.writeFileSync(hashMapFile, JSON.stringify(hashMap, null, 2), 'utf-8');
console.log(`Hash map generated and saved to ${hashMapFile}`);

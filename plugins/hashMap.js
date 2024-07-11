import hashMap from '~/static/hashMap.json';

export default (context, inject) => {
  // Función para obtener la URL hashada de un archivo estático
  const getHashedUrl = (relativePath) => {
    return hashMap[relativePath] || relativePath;
  };

  // Inyectar la función en el contexto y como un método global en Vue
  inject('getHashedUrl', getHashedUrl);
};
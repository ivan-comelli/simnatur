export default function (req, res, next) {
    if (req.url.startsWith('/')) {
      // Logica para manejar las rutas estáticas
      // Puedes hacer redirecciones, controles de acceso, etc.
      res.end('Rutas estáticas controladas por middleware');
      console.log("ENTROOOO")
    } else {
      next();
    }
}
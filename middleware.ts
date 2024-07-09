import { VercelRequest, VercelResponse } from '@vercel/node';

export default function middleware(req: VercelRequest, res: VercelResponse) {
  console.log('Middleware ejecutado');
  console.log('Método de la solicitud:', req.method);
  console.log('URL de la solicitud:', req.url);

  // Lógica del middleware
  res.setHeader('X-Custom-Header', 'my-custom-header-value');

  // Continuar con la solicitud
  res.status(200).json({ message: 'Middleware en funcionamiento' });
}

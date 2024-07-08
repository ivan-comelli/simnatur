// middleware.ts (Ejemplo en TypeScript para Vercel)
import { NowRequest, NowResponse } from '@vercel/node';


export default async function handler(req: NowRequest, res: NowResponse) {
  // Aplicar headers para controlar la caché
  res.setHeader('Cache-Control', 'public, max-age=3600');
  // Manejar la respuesta según la lógica del middleware
  res.end('Hello from middleware!');
}

// middleware.ts (Ejemplo en TypeScript para Vercel)
import { NowRequest, NowResponse } from '@vercel/node';


export default async function handler(req: NowRequest, res: NowResponse) {
  console.log('Request received:', req.url);
  
  // Aplicar headers para controlar la caché
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  // Manejar la respuesta según la lógica del middleware
  res.end('Hello from middleware!');

  console.log('Response sent:', res.statusCode);
  console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  
}

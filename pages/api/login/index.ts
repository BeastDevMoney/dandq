import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
const{connectDB_MVP} = require("../db/db") // Asegúrate de que la ruta sea correcta
const{User} =require("../schemas/userSchema") // Asegúrate de que la ruta sea correcta
const {Session} = require("../schemas/sessionCollection")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username } = req.body;
    console.log("Este es el nombre de usuario recibido: ",username)

    try {
       await connectDB_MVP();
      
      // Buscar o crear el usuario
      let user = await User.findOne({ username });

      if (!user) {
        // Si el usuario no existe, lo creamos
        const result = await new User({ 
          username: username
        });
        
        user = { _id: result._id, username };
        
        await result.save();
      }

      // Crear sesión
      const token = Math.random().toString(36).substring(7);
      
      // Guardar el token en la base de datos
      const session = await new Session({
        token,
        userId: user._id,
        createdAt: new Date()
      });

      await session.save();

      // Establecer la cookie
      res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      }));

      res.status(200).json({ message: 'Login successful', isNewUser: !user });
    } catch (error) {
      console.error('Error during login/registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
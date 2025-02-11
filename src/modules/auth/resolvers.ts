import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const generateToken = (user: any) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const authResolvers = {
  Mutation: {
    login: async (_parent: any, { email, password }: { email: string, password: string }) => {
      console.log('email: ', email);
      console.log('password: ', password);
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        console.log('user: ', user);
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'INVALID_CREDENTIALS',
          },
        });
      }
      const token = generateToken(user);
      console.log('token: ', token);
      return { token, user };
    },
    oauthLogin: async (_parent: any, { accessToken }: { accessToken: string }) => {
      // Aquí puedes verificar el token de acceso y obtener el perfil del usuario
      // Luego, buscar o crear el usuario en tu base de datos y devolver el token JWT
      const user = await User.findOne({ email: 'user@example.com' }); // Reemplaza con la lógica adecuada
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
          },
        });
      }
      const token = generateToken(user);
      return { token, user };
    },
  },
};

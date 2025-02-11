import User, { IUser } from '../../models/User.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const usersResolvers = {
  Query: {
    users: async () => {
      const users = await User.find().select('-password'); // 👈 Excluir contraseña
      console.log(`Recuperados ${users.length} usuarios.`);
      return users;
    },
    user: async (_parent: any, args: { id: string }) => {
      return await User.findById(args.id).select('-password'); // 👈 Excluir contraseña
    },
    userByEmail: async (_parent: any, args: { email: string }) => {
      return await User.findOne({ email: args.email }).select('-password'); // 👈 Excluir contraseña
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: IUser) => {
      // 🔹 Encriptar la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(args.password, SALT_ROUNDS);
      const user = new User({ ...args, password: hashedPassword });
      return await user.save();
    },
    updateUser: async (_parent: any, args: { id: string } & Partial<IUser>) => {
      if (args.password) {
        args.password = await bcrypt.hash(args.password, SALT_ROUNDS); // 🔹 Encripta si la envían
      }
      return await User.findByIdAndUpdate(args.id, args, { new: true }).select('-password'); // 👈 Excluir contraseña
    },
    deleteUser: async (_parent: any, args: { id: string }) => {
      await User.findByIdAndDelete(args.id);
      return true;
    },
    activateUser: async (_parent: any, args: { id: string }) => {
      return await User.findByIdAndUpdate(args.id, { active: true }, { new: true }).select('-password');
    },
    deactivateUser: async (_parent: any, args: { id: string }) => {
      return await User.findByIdAndUpdate(args.id, { active: false }, { new: true }).select('-password');
    },
  },
};

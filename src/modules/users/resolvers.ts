import User, { IUser } from '../../models/User.js';

export const usersResolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      console.log(`Recuperados ${users.length} usuarios.`);
      console.log(users);
      return users;
    },
    user: async (_parent: any, args: { id: string }) => {
      return await User.findById(args.id);
    },
    userByEmail: async (_parent: any, args: { email: string }) => {
      return await User.findOne({ email: args.email });
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: IUser) => {
      const user = new User(args);
      return await user.save();
    },
    updateUser: async (_parent: any, args: { id: string } & Partial<IUser>) => {
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteUser: async (_parent: any, args: { id: string }) => {
      await User.findByIdAndDelete(args.id);
      return true;
    },
    activateUser: async (_parent: any, args: { id: string }) => {
      return await User.findByIdAndUpdate(args.id, { active: true }, { new: true });
    },
    deactivateUser: async (_parent: any, args: { id: string }) => {
      return await User.findByIdAndUpdate(args.id, { active: false }, { new: true });
    },
  },
};

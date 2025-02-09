import Class, { IClass } from '../../models/Class.js';

export const classesResolvers = {
  Query: {
    classes: async () => {
      const classes = await Class.find().populate('teacher');
      console.log(`Recuperadas ${classes.length} clases.`);
      console.log(classes);
      return classes;
    },
    class: async (_parent: any, args: { id: string }) => {
      return await Class.findById(args.id).populate('teacher');
    },
  },
  Mutation: {
    createClass: async (_parent: any, args: IClass) => {
      const newClass = new Class(args);
      return await newClass.save();
    },
    updateClass: async (_parent: any, args: { id: string } & Partial<IClass>) => {
      return await Class.findByIdAndUpdate(args.id, args, { new: true }).populate('teacher');
    },
    deleteClass: async (_parent: any, args: { id: string }) => {
      await Class.findByIdAndDelete(args.id);
      return true;
    },
    activateClass: async (_parent: any, args: { id: string }) => {
      return await Class.findByIdAndUpdate(args.id, { active: true }, { new: true }).populate('teacher');
    },
    deactivateClass: async (_parent: any, args: { id: string }) => {
      return await Class.findByIdAndUpdate(args.id, { active: false }, { new: true }).populate('teacher');
    },
  },
};

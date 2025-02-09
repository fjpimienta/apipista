import Teacher, { ITeacher } from '../../models/Teacher.js';

export const teachersResolvers = {
  Query: {
    teachers: async () => {
      const teachers = await Teacher.find();
      console.log(`Recuperados ${teachers.length} profesores.`);
      console.log(teachers);
      return teachers;
    },
    teacher: async (_parent: any, args: { id: string }) => {
      return await Teacher.findById(args.id);
    },
    teacherByName: async (_parent: any, args: { name: string }) => {
      return await Teacher.find({ name: new RegExp(args.name, 'i') });
    },
  },
  Mutation: {
    createTeacher: async (_parent: any, args: ITeacher) => {
      const teacher = new Teacher(args);
      return await teacher.save();
    },
    updateTeacher: async (_parent: any, args: { id: string } & Partial<ITeacher>) => {
      return await Teacher.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteTeacher: async (_parent: any, args: { id: string }) => {
      await Teacher.findByIdAndDelete(args.id);
      return true;
    },
    activateTeacher: async (_parent: any, args: { id: string }) => {
      return await Teacher.findByIdAndUpdate(args.id, { active: true }, { new: true });
    },
    deactivateTeacher: async (_parent: any, args: { id: string }) => {
      return await Teacher.findByIdAndUpdate(args.id, { active: false }, { new: true });
    },
  },
};

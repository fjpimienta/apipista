import Student, { IStudent } from '../../models/Student.js';

export const studentsResolvers = {
  Query: {
    students: async () => {
      const students = await Student.find();
      console.log(`Recuperados ${students.length} estudiantes.`);
      console.log(students);
      return students;
    },
    student: async (_parent: any, args: { id: string }) => {
      return await Student.findById(args.id);
    },
    studentByName: async (_parent: any, args: { name: string }) => {
      return await Student.find({ name: new RegExp(args.name, 'i') });
    },
  },
  Mutation: {
    createStudent: async (_parent: any, args: IStudent) => {
      const student = new Student(args);
      return await student.save();
    },
    updateStudent: async (_parent: any, args: { id: string } & Partial<IStudent>) => {
      return await Student.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteStudent: async (_parent: any, args: { id: string }) => {
      await Student.findByIdAndDelete(args.id);
      return true;
    },
    activateStudent: async (_parent: any, args: { id: string }) => {
      return await Student.findByIdAndUpdate(args.id, { active: true }, { new: true });
    },
    deactivateStudent: async (_parent: any, args: { id: string }) => {
      return await Student.findByIdAndUpdate(args.id, { active: false }, { new: true });
    },
  },
};

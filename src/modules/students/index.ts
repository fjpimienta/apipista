import gql from 'graphql-tag';
import Student, { IStudent } from '../../models/Student.js';

export const studentsTypeDefs = gql`
  type Student {
    id: ID!
    name: String!
    lastName: String!
    tutor: String!
    phone: String!
    email: String!
    order: Int!
    active: Boolean!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
    studentByName(name: String!): [Student]
  }

  type Mutation {
    createStudent(
      name: String!,
      lastName: String!,
      tutor: String!,
      phone: String!,
      email: String!,
      order: Int!,
      active: Boolean!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): Student
    updateStudent(
      id: ID!,
      name: String,
      lastName: String,
      tutor: String,
      phone: String,
      email: String,
      order: Int,
      active: Boolean,
      updateUser: String,
      updateDate: String
    ): Student
    deleteStudent(id: ID!): Boolean
    activateStudent(id: ID!): Student
    deactivateStudent(id: ID!): Student
  }
`;

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

import gql from 'graphql-tag';
import bookType from '../types/book.js';
import StudentSchema from './StudentSchema.js';

const typeDefs = gql`
  ${bookType}
  ${StudentSchema}

  type Query {
    books: [Book]
    students: [Student]
    student(id: String): Student
  }
`;

export default typeDefs;

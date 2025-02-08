import books from '../models/books.js';
import StudentResolver from './StudentResolver.js';

const resolvers = {
    Query: {
        ...StudentResolver.Query,
        books: () => books,
    },
};

export default resolvers;

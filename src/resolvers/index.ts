import books from '../models/books.js';

const resolvers = {
    Query: {
        books: () => books,
    },
};

export default resolvers;

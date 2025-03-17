import { authTypeDefs } from './auth';
import { usersTypeDefs } from './users';

const typeDefs = {
    ...authTypeDefs,
    ...usersTypeDefs,
};

export default typeDefs;
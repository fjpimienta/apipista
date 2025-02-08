import gql from 'graphql-tag';

const StudentSchema = gql`
    type Student {
        id: String
        name: String
        lastName: String
        tutor: String
        phone: String
        email: String
        order: Int
        active: Boolean
        registerUser: String
        updateUser: String
        registerDate: String
        updateDate: String
    }

    type Query {
        students: [Student]
        student(id: String): Student
    }
`;

export default StudentSchema;

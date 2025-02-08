import { Student } from '../types/Student';
import students from '../models/Student.js';

const StudentResolver = {
    Query: {
        students: (): Student[] => students,
        student: (_: any, { id }: { id: string }): Student | undefined => students.find(student => student.id === id),
    },
};

export default StudentResolver;

import { Types } from "mongoose";


export type TAcademicDept = {
    name : string;
    academicFaculty: Types.ObjectId
}
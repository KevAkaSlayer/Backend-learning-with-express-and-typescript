import { model, Schema } from "mongoose";
import { TAcademicDept } from "./academicDept.interface";



const academicDeptSchema = new Schema<TAcademicDept>({
    name : {
        type : String,
        required : true,
        unique : true
    },

    academicFaculty : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicFaculty'
    }
},{
    timestamps: true,
})


export const AcademicDept = model<TAcademicDept>('AcademicDept',academicDeptSchema)
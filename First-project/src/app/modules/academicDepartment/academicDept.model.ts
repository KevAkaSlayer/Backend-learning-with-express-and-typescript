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


academicDeptSchema.pre('save',async function(next){
    const deptIsExist = await AcademicDept.findOne({name : this.name});

    if(deptIsExist) {
        throw new Error ('This dept is already Exist');
    }
    next();
})

academicDeptSchema.pre('findOneAndUpdate',async function(next){
    const query = this.getQuery();
    const isDeptExist = await AcademicDept.findOne(query);

    if(!isDeptExist){
        throw new Error("this department doesn't exist")
    }
    next();
})

export const AcademicDept = model<TAcademicDept>('AcademicDept',academicDeptSchema)
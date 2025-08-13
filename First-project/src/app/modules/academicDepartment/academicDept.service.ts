import { TAcademicDept } from "./academicDept.interface";
import { AcademicDept } from "./academicDept.model";


const createAcademicDeptIntoDB = async(payload:TAcademicDept)=>{

    const result = await AcademicDept.create(payload);
    return result;
}

const getAllAcademicDeptFromDB = async()=>{
    const result = await AcademicDept.find();

    return result;
}


const getSingleAcademicDeptFromDB = async(id : string)=>{
    const result = await AcademicDept.findById(id);
    return result;
}


const updateAcademicDeptIntoDB = async(id : string,payload : Partial<TAcademicDept>)=>{
    const result = await AcademicDept.findOneAndUpdate({_id:id},payload,{new:true});

    return result;
}


export const AcademicDeptServices = {
    createAcademicDeptIntoDB,
    getAllAcademicDeptFromDB,
    getSingleAcademicDeptFromDB,
    updateAcademicDeptIntoDB
}
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req, res) => {


    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created Successfully',
        data: result,

    });

})


const getAllAcademicSemester = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message : "Academic semesters are retrieved successfully",
        data: result,
    })
})


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    
};
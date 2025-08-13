import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDeptServices } from "./academicDept.service";
import httpStatus from 'http-status'


const createAcademyDept = catchAsync(async (req, res) => {
    const result = await AcademicDeptServices.createAcademicDeptIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is created successfully',
        data: result,
    });
})


const getAllAcademyDept = catchAsync(async (req, res) => {
    const result = await AcademicDeptServices.getAllAcademicDeptFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic departments are retrieved successfully',
        data: result,
    });
})

const getSingleAcademyDept = catchAsync(async (req, res) => {
    const { deptId } = req.params

    const result = await AcademicDeptServices.getSingleAcademicDeptFromDB(deptId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is retrieved successfully',
        data: result,
    });
})


const updateAcademicDept = catchAsync(async (req, res) => {
    const { deptId } = req.params

    const result = await AcademicDeptServices.updateAcademicDeptIntoDB(deptId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is updated successfully',
        data: result,
    });
})


export const AcademicDeptControllers = {
    createAcademyDept,
    getAllAcademyDept,
    getSingleAcademyDept,
    updateAcademicDept
}
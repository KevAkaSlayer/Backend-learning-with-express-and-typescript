import { RequestHandler } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";




const createStudent = catchAsync(
  async (req, res): Promise<void> => {
    const { password, student } = req.body;
    if (!student) {
      res.status(400).json({
        success: false,
        message: 'Student data is required',
        error: 'Missing student data in request body',
      });
      return;
    }

    const result = await UserService.createStudentIntoDB(password, student);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  }
)



export const UserController = {
  createStudent,
}
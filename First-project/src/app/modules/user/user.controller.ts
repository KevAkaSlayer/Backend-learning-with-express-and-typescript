import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response , next : NextFunction ): Promise<void> => {
  try {
    const { password, student } = req.body;

    // Validate required fields
    if (!student) {
      res.status(400).json({
        success: false,
        message: 'Student data is required',
        error: 'Missing student data in request body',
      });
      return;
    }

    const result = await UserService.createStudentIntoDB(password, student);

    res.status(201).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};



export const UserController = {
  createStudent,
}
import { Request, Response } from 'express'
import { StudentServices } from './student.service'

import {z} from 'zod';

// import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {

    const student  = req.body.student

    //creating schema validation using zod
    const studentValidationSchema = z.object({
      
    })

    

    //creating a schema validation using joi
    // const {error,value} = studentValidationSchema.validate(student)
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(student)
    
    // if(error){
    //     res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error:error.details,
    //   })
    // }


    // send response

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAStudent = async (req: Request, res: Response) => {
  try {
    const { studentId: id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
}

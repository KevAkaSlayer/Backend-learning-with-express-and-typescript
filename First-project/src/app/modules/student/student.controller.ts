import { Request, Response } from 'express'
import { StudentServices } from './student.service'

import {z} from 'zod';
import { studentSchema  } from './student.validation';

// import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {

    const student  = req.body

    //creating schema validation using zod
    const zodParsedData = studentSchema.parse(student);

    

    //creating a schema validation using joi
    // const {error,value} = studentValidationSchema.validate(student)
    // will call service function to send this data
    // Ensure dateOfBirth is always a string
    if (typeof zodParsedData.dateOfBirth === 'undefined') {
      throw new Error('dateOfBirth is required');
    }
    // Ensure dateOfBirth is always a string
    const studentData = {
      ...zodParsedData,
      dateOfBirth: String(zodParsedData.dateOfBirth),
    };
    const result = await StudentServices.createStudentIntoDB(studentData)
    
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
    if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: err.errors });
  }
  throw err;
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


const deleteStudent = async (req : Request , res : Response) =>{
  try{
    const {studentId : id} = req.params

    const result = await StudentServices.deleteStudentFromDB(id)

    res.status(200).json({
      success: true,
      message : "Student deleted successfully",
      data : result,
    })




  }catch(err){

  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
  deleteStudent
}

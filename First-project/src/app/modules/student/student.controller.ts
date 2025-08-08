import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'


// import studentValidationSchema from './student.validation'


const getAllStudents = async (req: Request, res: Response ,next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getAStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId: id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}


const deleteStudent = async (req : Request , res : Response , next: NextFunction) =>{
  try{
    const {studentId : id} = req.params

    const result = await StudentServices.deleteStudentFromDB(id)

    res.status(200).json({
      success: true,
      message : "Student deleted successfully",
      data : result,
    })




  }catch(err){
    next(err)
  }
}

export const StudentControllers = {
  getAllStudents,
  getAStudent,
  deleteStudent
}

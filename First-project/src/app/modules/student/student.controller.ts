import { Request, Response } from 'express'
import { StudentServices } from './student.service'


// import studentValidationSchema from './student.validation'


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
  getAllStudents,
  getAStudent,
  deleteStudent
}

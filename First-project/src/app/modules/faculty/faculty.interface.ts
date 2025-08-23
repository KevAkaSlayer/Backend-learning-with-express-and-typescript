import { Model, Types } from "mongoose"
import { TUserName } from "../student/student.interface"


export type TFaculty = {
  id: string
  user: Types.ObjectId
  name: TUserName
  designation: string
  gender: 'male' | 'female'
  email: string
  dateOfBirth?: Date
  contactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  academicDept: Types.ObjectId
  isDeleted: boolean
}


export interface FacultyModel extends Model<TFaculty> {
  isUserExist(id: string): Promise<TFaculty | null>
}
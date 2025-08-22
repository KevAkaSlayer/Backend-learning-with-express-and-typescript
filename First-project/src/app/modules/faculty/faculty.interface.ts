import { Types } from "mongoose"
import { TUserName } from "../student/student.interface"


export type TFaculty = {
  id: string
  user: Types.ObjectId
  password?: string
  name: TUserName
  gender: 'male' | 'female'
  email: string
  dateOfBirth?: Date
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  academicDept: Types.ObjectId
  isDeleted: boolean
}

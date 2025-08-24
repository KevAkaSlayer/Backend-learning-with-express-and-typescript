import { Model, Types } from "mongoose"
import { TUserName } from "../student/student.interface"


export type TAdmin = {
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
  isDeleted: boolean
}


export interface AdminModel extends Model<TAdmin> {
  isUserExist(id: string): Promise<TAdmin | null>
}
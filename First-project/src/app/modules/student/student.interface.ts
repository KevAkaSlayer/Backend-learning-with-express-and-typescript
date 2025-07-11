import { Schema, model, connect, Model } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TUserName = {
  firstName: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password : string
  name: TUserName
  gender: 'male' | 'female'
  email: string
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
  isDeleted:boolean
}



//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExist(id : string) : Promise<TStudent | null>
} 





//for creating custom instance 

// export type  StudentMethods = {
//   isUserExist(id : string) : Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent,Record<string,never>,StudentMethods>;
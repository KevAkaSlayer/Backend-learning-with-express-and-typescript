import { Schema, model, connect } from 'mongoose'
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student/student.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    validate : {
      validator : function(value : string){
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;  
      },
      message : "{VALUE} is not in capitalize format",
    }
  },
  lastName: {
    type: String,
    trim : true,
    required: [true, "Last name is required"],
    validate: {
      validator : (value : string)=>validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
}, { _id: false })

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"]
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"]
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"]
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"]
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required"]
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"]
  },
}, { _id: false })

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"]
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"]
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"]
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"]
  },
}, { _id: false })

const StudentSchema = new Schema<TStudent,StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"]
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, "Gender is required"]
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate:{
      validator : (value : string)=> validator.isEmail(value),
      message : "{value} is not valid"
    }
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"]
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"]
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"]
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"]
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"]
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"]
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  },
}, { timestamps: true })



// creating a custom instance method
// StudentSchema.methods.isUserExist = async function(id : string) {
//   const existingUser = await Student.findOne({id})
//   return existingUser;
// } 

export const Student = model<TStudent,StudentModel>('Student', StudentSchema)

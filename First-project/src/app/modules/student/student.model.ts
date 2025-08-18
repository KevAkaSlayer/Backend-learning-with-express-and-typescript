import { Schema, model } from 'mongoose'
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface'


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength : [20,'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim : true,
    required: [true, "Last name is required"],
  },
})

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
})

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
})

export const StudentSchema = new Schema<TStudent,StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true
  },
  user:{
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique : true,
    ref : 'User',
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
    type: Date,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    
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
  admissionSemester :{
    type : Schema.Types.ObjectId,
    ref:'AcademicSemester'
  },
  academicDept :{
    type : Schema.Types.ObjectId,
    ref : 'AcademicDept'
  },
  isDeleted:{
    type: Boolean,
    default : false
  },
}, { timestamps: true ,toJSON:{virtuals : true} })

//virtual 

StudentSchema.virtual('fullname').get(function(){
  return this?.name?.firstName +" "+this?.name?.lastName
})

//pre save middleware/ hook : will work on create () , save()



//query middleware

StudentSchema.pre('find',function(next){
  this.find({isDeleted: {$ne : true}});
  next();
})
StudentSchema.pre('findOne',function(next){
  this.find({isDeleted: {$ne : true}});
  next();
})


StudentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match : {isDeleted : {$ne : true}}})
  next();
})
//creating a custom static method

StudentSchema.statics.isUserExist = async function(id : string){
  const existingUser = await Student.findOne({id})

  return existingUser;
}



export const Student = model<TStudent,StudentModel>('Student', StudentSchema)

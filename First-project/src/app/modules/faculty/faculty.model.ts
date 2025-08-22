import { model, Schema } from "mongoose";
import { TUserName } from "../student/student.interface";
import { TFaculty } from "./faculty.interface";


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
})

const FacultySchema = new Schema<TFaculty>({
      id: {
        type: String,
        required: [true, "Student ID is required"],
        unique: true
      },
      user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
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

      profileImage: {
        type: String,
      },
      academicDept: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDept'
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
    }, { timestamps: true, toJSON: { virtuals: true }
})


FacultySchema.virtual('fullname').get(function () {
  return this?.name?.firstName + " " + this?.name?.lastName
})

export const Faculty = model<TFaculty>('Faculty',FacultySchema);
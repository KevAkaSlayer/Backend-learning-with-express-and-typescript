import { model, Schema } from "mongoose";
import { TUserName } from "../student/student.interface";
import { AdminModel, TAdmin } from "./admin.interface";



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

const AdminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: [true, "Admin ID is required"],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  designation: {
    type: String,
    required: [true, "Admin designation is required"]
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
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"]
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
  isDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true, toJSON: { virtuals: true }
})


AdminSchema.virtual('fullname').get(function () {
  return this?.name?.firstName + " " + this?.name?.lastName
})



AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
})
AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
})


AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next();
})
//creating a custom static method

AdminSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Admin.findOne({ id })

  return existingUser;
}




export const Admin = model<TAdmin,AdminModel>('Admin', AdminSchema);
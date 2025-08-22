import z from "zod";
import { updateUserNameValidationSchema, userNameValidationSchema } from "../student/student.validation";


export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: "Gender must be either 'male' or 'female'" })
      }),
      dateOfBirth: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
          message: "Date of birth must be a valid date string",
        }),
      email: z.string().email({ message: "Email must be valid" }),
      contactNo: z.string().trim().nonempty({ message: "Contact number is required" }),
      emergencyContactNo: z.string().trim().nonempty({ message: "Emergency contact number is required" }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().nonempty({ message: "Present address is required" }),
      permanentAddress: z.string().trim().nonempty({ message: "Permanent address is required" }),
      academicDept: z.string(),
      profileImage: z
        .string()
        .url({ message: "Profile image must be a valid URL" })
        .optional(),
    })
  })

})


export const updateFacultyValidationSchema = z.object({
  body: z
    .object({
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          gender: z
            .enum(['male', 'female'], {
              errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
            })
            .optional(),
          dateOfBirth: z
            .string()
            .optional()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
              message: "Date of birth must be a valid date string",
            }),
          email: z.string().email({ message: "Email must be valid" }).optional(),
          contactNo: z.string().trim().nonempty({ message: "Contact number is required" }).optional(),
          emergencyContactNo: z
            .string()
            .trim()
            .nonempty({ message: "Emergency contact number is required" })
            .optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAddress: z.string().trim().nonempty({ message: "Present address is required" }).optional(),
          permanentAddress: z.string().trim().nonempty({ message: "Permanent address is required" }).optional(),
          academicDept: z.string().optional(),
          profileImage: z.string().url({ message: "Profile image must be a valid URL" }).optional(),
        })
        .optional(),
    })
    .optional(),
});



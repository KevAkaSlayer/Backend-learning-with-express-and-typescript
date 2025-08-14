import { z } from 'zod';

// 1) UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20)
    .nonempty({ message: "First name is required" })
    .refine((val) => /^[A-Z][a-z]*$/.test(val), {
      message: "First name must start with a capital letter and contain only letters",
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: "Last name is required" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" }),
});

// 2) Guardian schema
const guardianSchema = z.object({
  fatherName: z.string().trim().nonempty({ message: "Father name is required" }),
  fatherContactNo: z.string().trim().nonempty({ message: "Father contact number is required" }),
  fatherOccupation: z.string().trim().nonempty({ message: "Father occupation is required" }),
  motherName: z.string().trim().nonempty({ message: "Mother name is required" }),
  motherContactNo: z.string().trim().nonempty({ message: "Mother contact number is required" }),
  motherOccupation: z.string().trim().nonempty({ message: "Mother occupation is required" }),
});

// 3) LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty({ message: "Local guardian name is required" }),
  occupation: z.string().trim().nonempty({ message: "Local guardian occupation is required" }),
  contactNo: z.string().trim().nonempty({ message: "Local guardian contact number is required" }),
  address: z.string().trim().nonempty({ message: "Local guardian address is required" }),
});

// 4) Main Student schema
export const createStudentValidationSchema = z.object({
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
      guardian: guardianSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester:z.string(),
      academicDept : z.string(),
      profileImage: z
        .string()
        .url({ message: "Profile image must be a valid URL" })
        .optional(),
    })
  })

})

// 5) Infer TypeScript type if needed
// export type StudentDto = z.infer<typeof studentSchema>;

export const studentValidations = {
  createStudentValidationSchema,
};

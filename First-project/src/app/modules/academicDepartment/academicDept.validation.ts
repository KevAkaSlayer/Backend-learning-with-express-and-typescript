import { z } from 'zod'


export const createAcademicDeptValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department must be string",
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic faculty must be string",
            required_error: "Faculty must be required"
        })
    })
})


export const updateAcademicDeptValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department must be string",
            required_error: "Name is required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic faculty must be string",
            required_error: "Faculty must be required"
        }).optional()
    })
})


export const  AcademicDeptValidation = {
    createAcademicDeptValidationSchema,
    updateAcademicDeptValidationSchema
}
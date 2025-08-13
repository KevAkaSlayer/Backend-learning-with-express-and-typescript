import { z } from "zod"

export const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string()
    }),
});

export const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string()
    }),
});


export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}
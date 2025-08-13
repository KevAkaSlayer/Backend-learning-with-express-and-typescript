import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import {  createAcademicFacultyValidationSchema, updateAcademicFacultyValidationSchema } from "./academicFaculty.validation"
import { AcademicFacultyControllers } from "./academicFaculty.controller"


const router = express.Router()


router.post('/create-academic-faculty', validateRequest(createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty);

router.get('/',AcademicFacultyControllers.getAllAcademicFaculty);

router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch('/:facultyId',validateRequest(updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty);



export const AcademicFacultyRoutes = router
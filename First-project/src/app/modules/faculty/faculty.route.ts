import express from 'express'
import { FacultyControllers } from './faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'


const router = express.Router()

// will call controller function

router.get('/', FacultyControllers.getAllFaculty)

router.get('/:facultyId', FacultyControllers.getSingleFaculty)

router.delete('/:facultyId', FacultyControllers.deleteFaculty)

router.patch('/:facultyId',validateRequest(updateFacultyValidationSchema),FacultyControllers.updateFaculty)

export const FacultyRoutes = router
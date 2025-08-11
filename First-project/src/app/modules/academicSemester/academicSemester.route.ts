import express from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAcademicSemesterValidationSchema, updateAcademicSemesterValidationSchema } from "./academicSemester.validation";


const router = express.Router()

router.post('/create-academic-semester',validateRequest(createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/',AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:academicSemesterId',AcademicSemesterControllers.getAcademicSemester)
router.patch('/:semesterId',validateRequest(updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester)



export const AcademicSemesterRoutes = router;
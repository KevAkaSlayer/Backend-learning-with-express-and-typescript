import express from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAcademicSemesterValidationSchema } from "./academicSemester.validation";


const router = express.Router()

router.post('/create-academic-semester',validateRequest(createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/',AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:academicSemesterId',AcademicSemesterControllers.getAcademicSemester)



export const AcademicSemesterRoutes = router;
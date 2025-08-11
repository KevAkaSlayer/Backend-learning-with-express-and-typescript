import express from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAcademicSemesterValidationSchema } from "./academicSemester.validation";


const router = express.Router()

router.post('/create-academic-semester',validateRequest(createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/get-all-academic-semester',AcademicSemesterControllers.getAllAcademicSemester)




export const AcademicSemesterRoutes = router;